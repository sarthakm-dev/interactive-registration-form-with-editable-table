import { Input } from "antd";
import type { InputFieldProps } from "../types/input-field-prop";


const InputField = ({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  onChange,
  onBlur,
  error,
  max,
}: InputFieldProps) => {
  return (
    <div className={`form-group ${error ? 'error-field' : ''}`}>
      {label && (
        <label htmlFor={name}>
          {label} <span className="required">*</span>
        </label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        max={max}
      />

      {error && <small className="error show">{error}</small>}
    </div>
  );
};

export default InputField;
