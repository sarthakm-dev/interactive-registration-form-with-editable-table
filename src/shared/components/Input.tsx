type InputFieldProps = {
  label?: string;
  name: string;
  value: string;
  type?: 'text' | 'email' | 'radio' | 'date';
  placeholder?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  max?: string;
};

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
    <div className={`flex flex-col gap-1 ${error ? 'error-field' : ''}`}>
      {label && (
        <label htmlFor={name}>
          {label} <span className="required">*</span>
        </label>
      )}
      
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        max={max}
        className="md:w-45 bg-transparent border-2 border-(--primary-500) text-center rounded-xl"
      />

      {error && <small className="text-(--danger) show">{error}</small>}
    </div>
  );
};

export default InputField;
