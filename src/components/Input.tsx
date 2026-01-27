import type { InputFieldProps } from "../types/input";

const InputField = ({
  label,
  name,
  value,
  type = 'text',
  placeholder,
  checked,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="form-group">
      {label && <label>{label}<span className="required">*</span></label>}
      
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        checked={type === 'radio' ? checked : undefined}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;