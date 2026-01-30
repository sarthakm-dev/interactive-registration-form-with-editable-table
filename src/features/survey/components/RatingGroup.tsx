import { useState } from 'react';
import { useFormStore } from '../../../store/useFormStore';
import type { Props } from '../types/rating-prop';



const RatingGroup = ({ category, label }: Props) => {
  const rating = useFormStore((s) => s.rating);
  const errors = useFormStore((s) => s.errors);
  const setRating = useFormStore((s) => s.setRating);
  const clearError = useFormStore((s) => s.clearError);

  const savedValue = rating[category] || 0;
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || savedValue;
  const hasError = Boolean(errors[category]);

  const handleClick = (value: number) => {
    setRating(category, value); 
    clearError(category);         
  };

  return (
    <div className={`rating-group ${hasError ? 'error-field' : ''}`}>
      <p>
        {label} <span className="required">*</span>
      </p>

      <div className="stars">
        {[
          { value: 1, text: 'Very Poor' },
          { value: 2, text: 'Poor' },
          { value: 3, text: 'Average' },
          { value: 4, text: 'Good' },
          { value: 5, text: 'Excellent' },
        ].map((star) => (
          <div className="star-container" key={star.value}>
            <span
              className={star.value <= displayValue ? 'star active' : 'star'}
              onMouseEnter={() => setHoverValue(star.value)}
              onMouseLeave={() => setHoverValue(0)}
              onClick={() => handleClick(star.value)}
            >
              ★
            </span>
            <small>{star.text}</small>
          </div>
        ))}
      </div>

      {hasError && <small className="error show">{errors[category]}</small>}
    </div>
  );
};

export default RatingGroup;