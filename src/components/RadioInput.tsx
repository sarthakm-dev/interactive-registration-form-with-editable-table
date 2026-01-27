import { useFormContext } from "../context/FormContext";
import { nameToFieldName } from "../utils/name-to-field";

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
  const { formData, setFormData } =
    useFormContext();
  
  
  const fieldName = nameToFieldName(name);
  const selectedValue = formData[fieldName];

  return (
    <div className={`radio-container ${selectedValue ? "error-field" : ""}`}>
      <label className="radio-label">
        {label} <span className="required">*</span>
      </label>

      <div className="radio-content">
        {options.map((opt) => (
          <label key={opt.id}>
            <input
              type="radio"
              name={fieldName}
              value={opt.value}
              checked={selectedValue === opt.value}
              onChange={() => {
                setFormData((prev) => ({
                  ...prev,
                  [fieldName]: opt.value,
                }));
              }}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <small className={selectedValue ? "error show" : "error"}>
        This is a required field
      </small>
    </div>
  );
};

export default RadioGroup