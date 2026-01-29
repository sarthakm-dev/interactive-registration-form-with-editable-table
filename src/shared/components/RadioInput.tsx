import { useFormContext } from '../../features/survey/context/FormContext';
import { nameToFieldName } from '../../features/survey/utils/name-to-field';

type Option = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  name: string;
  label: string;
  options: Option[];
};

const RadioGroup = ({ name, label, options }: Props) => {
  const { formData, setFormData, errors, setErrors } = useFormContext();

  const fieldName = nameToFieldName(name);

  const selectedValue = formData[fieldName];
  const hasError = Boolean(errors[fieldName]);
  console.log(hasError);
  const handleChange = (value: string) => {
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldName];
      return updated;
    });
  };

  return (
    <div className={`py-3 m-0 mt-2 ${hasError ? 'error-field' : ''}`}>
      <label className="radio-label">
        {label} <span className="required">*</span>
      </label>

      <div className="flex flex-col">
        {options.map((opt) => (
          <label key={opt.id} className="radio-option">
            <input
              type="radio"
              name={fieldName}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => handleChange(opt.value)}
              className='accent-(--primary-500)'
            />
            {opt.label}
          </label>
        ))}
      </div>

      {hasError && <small className="text-(--danger) show">{errors[fieldName]}</small>}
    </div>
  );
};

export default RadioGroup;
