import { useState } from 'react';
import { useFormContext } from '../context/FormContext';

type Props = {
  category: string;
  label: string;
};

const RatingGroup = ({ category, label }: Props) => {
  const { rating, setRating, errors, setErrors } = useFormContext();

  const savedValue = rating[category] || 0;
  const [hoverValue, setHoverValue] = useState(0);

  const displayValue = hoverValue || savedValue;
  const hasError = Boolean(errors[category]);

  const handleClick = (value: number) => {
    setRating((prev) => ({ ...prev, [category]: value }));

    if (hasError) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[category];
        return copy;
      });
    }
  };

  return (
    <div className={`rating-group ${hasError ? 'error-field' : ''}`}>
      <p>
        {label} <span className="required">*</span>
      </p>

      <div className="stars">
        {[{value:1,text:"Very Poor"}, {value:2,text:"Poor"}, {value:3,text:"Average"}, {value:4,text:"Good"}, {value:5,text:"Excellent"}].map((star) => (
          <div className='star-container'>
          <span
            key={star.value}
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
