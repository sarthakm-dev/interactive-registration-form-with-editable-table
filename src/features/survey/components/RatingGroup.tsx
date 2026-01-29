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
    <div className={`p-0 mb-0 ${hasError ? 'error-field' : ''}`}>
      <p>
        {label} <span className="text-(--danger)">*</span>
      </p>

      <div className="flex gap-1.25 h-17.5  w-[90%] justify-between items-center pl-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= displayValue ? 'w-6.25 h-6.25 rounded-[1px] flex items-center font-[4.5rem] justify-center flex-col p-px cursor-pointer transition-[0.2] select-none text-(--primary-500)' : 'w-6.25 h-6.25 rounded-[1px] flex items-center font-[4.5rem] justify-center flex-col p-px cursor-pointer transition-[0.2] select-none text-(--star-color)'}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(0)}
            onClick={() => handleClick(star)}
          >
            ★
          </span>
        ))}
      </div>

      {hasError && <small className="error show">{errors[category]}</small>}
    </div>
  );
};

export default RatingGroup;
