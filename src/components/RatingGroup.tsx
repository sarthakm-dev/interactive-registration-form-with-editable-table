import { useState } from "react";
import { useFormContext } from "../context/FormContext";

type Props = {
  category: string;
  label: string;
};

const RatingGroup = ({ category, label }: Props) => {
  const { rating, setRatings } = useFormContext();
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const savedRating = rating[category] ?? 0;
  const displayRating = hoverRating ?? savedRating;
  return (
    <div className="rating-group">
      <p>{label}</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${displayRating >= value ? "active" : ""}`}
            onMouseEnter={() => setHoverRating(value)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() =>
              setRatings((prev) => ({
                ...prev,
                [category]: value,
              }))
            }
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingGroup;
