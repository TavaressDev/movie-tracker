import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../hooks/useAuth";
import { 
  ProfileContainer,
  ProfileHeader,
  UserInfo,
  ReviewsList,
  ReviewItem,
  SectionTitle,
  StatsContainer,
  StatItem,
  EmptyReviews
} from "./styles";
import { StarRating } from "../../components/StarRating";

interface Review {
  id: string;
  userId: string;
  mediaId: string;
  mediaType: 'movie' | 'tv';
  rating: number;
  text: string;
  createdAt: { seconds: number, nanoseconds: number };
  mediaTitle?: string;
  mediaPoster?: string;
}

interface UserData {
    uid: string;
    displayName?: string;
    photoURL?: string;
    email?: string;
    joinedAt?: { seconds: number, nanoseconds: number } | Date;
    bio?: string;
  }

export function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId!));
        if (!userDoc.exists()) {
          navigate("/");
          return;
        }
        setUser({ uid: userDoc.id, ...userDoc.data() } as UserData);
        
        const reviewsQuery = query(
          collection(db, "reviews"),
          where("userId", "==", userId)
        );
        
        const reviewsSnapshot = await getDocs(reviewsQuery);
        const reviewsData = reviewsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchUserData();
    }
  }, [userId, navigate]);

  const averageRating = reviews.length > 0 
  ? (reviews.reduce((sum, review) => sum + review.rating, 0)) / reviews.length
  : 0;
  const uniqueMediaCount = new Set(
    reviews.map(review => `${review.mediaType}-${review.mediaId}`)
  ).size;

  if (loading) return <div>Carregando...</div>;
  if (!user) return <div>Usuário não encontrado</div>;

  return (
    <ProfileContainer>
      <ProfileHeader>
      <UserInfo>
        <h1>{user.displayName || 'Usuário'}</h1>
        {user.joinedAt && (
          <p>Membro desde {new Date(
            typeof user.joinedAt === 'object' && 'seconds' in user.joinedAt 
              ? user.joinedAt.seconds * 1000 
              : user.joinedAt
          ).toLocaleDateString()}</p>
        )}
        {user.bio && <p>{user.bio}</p>}
      </UserInfo>
    </ProfileHeader>
      <StatsContainer>
        <StatItem>
          <h3>{reviews.length}</h3>
          <p>Avaliações</p>
        </StatItem>
        <StatItem>
          <h3>{averageRating.toFixed(1)}</h3>
          <p>Média de notas</p>
        </StatItem>
        <StatItem>
          <h3>{uniqueMediaCount}</h3>
          <p>Mídias diferentes</p>
        </StatItem>
      </StatsContainer>
  
      <SectionTitle>Avaliações</SectionTitle>
      
      {reviews.length === 0 ? (
        <EmptyReviews>
          <p>Nenhuma avaliação ainda</p>
          <small>Quando este usuário avaliar mídias, elas aparecerão aqui</small>
        </EmptyReviews>
      ) : (
        <ReviewsList>
          {reviews.map(review => (
            <ReviewItem key={review.id} onClick={() => navigate(`/media/${review.mediaType}/${review.mediaId}`)}>
              <div className="media-info">
                {review.mediaPoster && (
                  <img 
                    src={review.mediaPoster} 
                    alt={review.mediaTitle} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-movie.png';
                    }}
                  />
                )}
                <h3>{review.mediaTitle || 'Mídia sem título'}</h3>
              </div>
              <StarRating rating={review.rating} />
              <p>{review.text}</p>
              <small>
                Avaliado em {new Date(review.createdAt.seconds * 1000).toLocaleDateString()}
              </small>
            </ReviewItem>
          ))}
        </ReviewsList>
      )}
    </ProfileContainer>
  );
}