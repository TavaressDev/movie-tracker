import { useEffect, useState, type FormEvent, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import { TMDB_BASE_URL, TMDB_ACCESS_TOKEN } from "../../api/tmdbConfig";
import { addDoc, collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { 
  DetailsContainer,
  Title,
  GenresContainer,
  GenreTag,
  Description,
  SectionTitle,
  RatingContainer,
  SeasonsContainer,
  SeasonItem,
  EpisodesContainer,
  EpisodeItem,
  TrailerContainer,
  PosterImage,
  BannerTitle,
  HorizontalBanner,
  PosterWrapper,
  BannerInfo,
  BannerDetails,
  DetailItem,
  CommentsList,
  CommentsSection,
  CommentsTitle,
  CommentForm,
  CommentTextarea,
  CommentButton,
  CommentItem,
  CommentAuthor,
  CommentText,
  RatingErrorMessage
} from "./styles";
import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";
import { StarRating } from "../StarRating";

interface Video {
  key: string;
  type: string;
  site: string;
  name: string;
} 

interface MediaDetails {
  first_air_date: string | null;  
  release_date: string | null;
  episode_run_time: number[]; 
  runtime: number | null;  
  id: number;
  title?: string;
  name?: string;
  overview: string;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  backdrop_path: string | null;
  poster_path: string | null;
  number_of_seasons?: number;
  media_type?: 'movie' | 'tv';
  videos?: {
    results: Video[];
  };
}

interface Season {
  season_number: number;
  name: string;
  episode_count: number;
}

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  overview: string;
  still_path: string | null;
}

interface Comment {
  id: string;
  author: string;
  userId?: string;
  text: string;
  timestamp: string;
  rating: number; 
}

export function MediaDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { id, mediaType } = useParams<{ id: string; mediaType: 'movie' | 'tv' }>();
  const [media, setMedia] = useState<MediaDetails | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(() => {
    const savedComments = localStorage.getItem(`comments-${mediaType}-${id}`);
    return savedComments ? JSON.parse(savedComments) : [];
  });
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  const fetchComments = useCallback(async () => {
    try {
      if (!id || !mediaType) return; 
  
      const q = query(
        collection(db, "reviews"),
        where("mediaId", "==", id),
        where("mediaType", "==", mediaType),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const firestoreComments = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Garante que todos os campos obrigatórios existam
        return {
          id: doc.id,
          author: data.userName || data.userId || "Anônimo",
          userId: data.userId,
          text: data.text || "",
          rating: data.rating || 0,
          timestamp: data.createdAt?.toDate()?.toISOString() || new Date().toISOString()
        };
      });
      
      setComments(firestoreComments);
      localStorage.setItem(`comments-${mediaType}-${id}`, JSON.stringify(firestoreComments));
    } catch (error) {
      console.error("Error fetching comments:", error);
      const savedComments = localStorage.getItem(`comments-${mediaType}-${id}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    } finally {
      setLoadingComments(false);
    }
  }, [id, mediaType]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const fetchEpisodes = useCallback(async (seasonNumber: number) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}?language=pt-BR`,
        {
          headers: {
            'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.json();
      setEpisodes(data.episodes);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchMediaDetails = async () => {
      try {
        const mediaResponse = await fetch(
          `${TMDB_BASE_URL}/${mediaType}/${id}?language=pt-BR&append_to_response=videos`,
          {
            headers: {
              'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );
        const mediaData = await mediaResponse.json();
        setMedia(mediaData);

        const trailer = mediaData.videos?.results.find(
          (video: Video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer?.key || null);

        if (mediaType === 'tv') {
          const seasonsResponse = await fetch(
            `${TMDB_BASE_URL}/tv/${id}?language=pt-BR`,
            {
              headers: {
                'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
              }
            }
          );
          const seasonsData = await seasonsResponse.json();
          setSeasons(
            seasonsData.seasons.filter((s: Season) => s.season_number > 0)
          );
          await fetchEpisodes(1);
        }
      } catch (error) {
        console.error("Error fetching media details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMediaDetails();
  }, [id, mediaType, fetchEpisodes]);

  const handleSeasonSelect = (seasonNumber: number) => {
    setSelectedSeason(seasonNumber);
    if (mediaType === 'tv') {
      fetchEpisodes(seasonNumber);
    }
  };

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (newRating === 0) {
      setRatingError(true);
      return;
    }
    
    if (!newComment.trim() || !user || !id || !mediaType) return;
  
    try {
      const mediaTitle = media?.title || media?.name || 'Mídia sem título';
      const mediaPoster = media?.poster_path 
        ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
        : null;
  
      const reviewData = {
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || "Usuário",
        mediaId: id,
        mediaType: mediaType,
        mediaTitle,
        mediaPoster,
        rating: newRating,
        text: newComment,
        createdAt: new Date(),
      };
  
      await addDoc(collection(db, "reviews"), reviewData);
      
      await fetchComments();
      
      setNewComment('');
      setNewRating(0);
      setRatingError(false);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!media) return <div>Não foi possível carregar os detalhes</div>;

  return (
    <DetailsContainer>
      {media.backdrop_path && (
        <HorizontalBanner>
          <PosterWrapper>
            {media.poster_path && (
              <PosterImage
                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                alt={`Poster de ${media.title || media.name}`}
              />
            )}
          </PosterWrapper>
          
          <BannerInfo>
            <BannerTitle>{media.title || media.name}</BannerTitle>
            
            <BannerDetails>
              <DetailItem>
                <FaStar />
                <span>{media.vote_average.toFixed(1)}</span>
              </DetailItem>
              
              <DetailItem>
                <FaCalendarAlt />
                <span>{media.release_date?.split('-')[0] || media.first_air_date?.split('-')[0]}</span>
              </DetailItem>
              
              <DetailItem>
                <FaClock />
                <span>{media.runtime || media.episode_run_time?.[0]} min</span>
              </DetailItem>
            </BannerDetails>
            
            <GenresContainer>
              {media.genres.map(genre => (
                <GenreTag key={genre.id}>{genre.name}</GenreTag>
              ))}
            </GenresContainer>
          </BannerInfo>
        </HorizontalBanner>
      )}

      {trailerKey && (
        <TrailerContainer>
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0`}
            title={`Trailer de ${media.title || media.name}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </TrailerContainer>
      )}

      <Title>{media.title || media.name}</Title>
      
      <GenresContainer>
        {media.genres.map(genre => (
          <GenreTag key={genre.id}>{genre.name}</GenreTag>
        ))}
      </GenresContainer>

      <Description>{media.overview}</Description>

      <SectionTitle>Avaliação</SectionTitle>
      <RatingContainer>
        <span>{media.vote_average.toFixed(1)}/10</span>
        <small>{media.vote_count} avaliações</small>
      </RatingContainer>

      {mediaType === 'tv' && (
        <>
          <SectionTitle>Temporadas</SectionTitle>
          <SeasonsContainer>
            {seasons.map(season => (
              <SeasonItem
                key={season.season_number}
                $isSelected={season.season_number === selectedSeason}
                onClick={() => handleSeasonSelect(season.season_number)}
              >
                {season.season_number}
              </SeasonItem>
            ))}
          </SeasonsContainer>

          <SectionTitle>Episódios - Temporada {selectedSeason}</SectionTitle>
          <EpisodesContainer>
            {episodes.map(episode => (
              <EpisodeItem key={episode.id}>
                <div className="episode-number">{episode.episode_number}</div>
                <div className="episode-info">
                  <h3>{episode.name}</h3>
                  {episode.still_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                      alt={episode.name}
                    />
                  )}
                  <p>{episode.overview}</p>
                </div>
              </EpisodeItem>
            ))}
          </EpisodesContainer>
        </>
      )}

      <CommentsSection>
        <CommentsTitle>Comentários</CommentsTitle>
        
        {user ? (
          <CommentForm onSubmit={handleCommentSubmit}>
            <div>
              <StarRating 
                rating={newRating} 
                onRate={(rate) => {
                  setNewRating(rate);
                  setRatingError(false); 
                }}
              />
              {ratingError && (
                <RatingErrorMessage>
                  Por favor, selecione uma avaliação com as estrelas 
                </RatingErrorMessage>
              )}
            </div>
            <CommentTextarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deixe seu comentário..."
              required
            />
            <CommentButton type="submit">Enviar Comentário</CommentButton>
          </CommentForm>
        ) : (
          <p>Faça login para deixar um comentário</p>
        )}
        
        {loadingComments ? (
          <div>Carregando comentários...</div>
        ) : (
          <CommentsList>
            {comments.length > 0 ? (
              comments.map(comment => (
                <CommentItem key={comment.id}>
                  <CommentAuthor onClick={() => navigate(`/profile/${comment.userId}`)}>
                    {comment.author}
                    <StarRating rating={comment.rating} />
                  </CommentAuthor>
                  <CommentText>{comment.text}</CommentText>
                  <small>{new Date(comment.timestamp).toLocaleDateString()}</small>
                </CommentItem>
              ))
            ) : (
              <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
            )}
          </CommentsList>
        )}
      </CommentsSection>
    </DetailsContainer>
  );
}