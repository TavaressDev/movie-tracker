import { Star, StarRatingContainer } from "./styles";

export function StarRating({ 
    rating, 
    onRate 
}: { 
    rating: number; 
    onRate?: (rating: number) => void 
}) {
    return (
        <StarRatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                    key={star} 
                    $filled={star <= rating}
                    onClick={() => onRate && onRate(star)}
                >
                    {star <= rating ? '★' : '☆'}
                </Star>
            ))}
        </StarRatingContainer>
    );
}