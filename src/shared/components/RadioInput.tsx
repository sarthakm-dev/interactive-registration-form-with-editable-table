import { ConfigProvider, Radio } from 'antd';
import { useFormStore } from '../../store/useFormStore';
import { nameToFieldName } from '../../features/survey/utils/name-to-field';

const RadioGroup = ({
  name,
  label,
  options,
}: {
  name: string;
  label: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}) => {
  const fieldName = nameToFieldName(name);

  const selectedValue = useFormStore((s) => s.formData[fieldName]);
  const error = useFormStore((s) => s.errors[fieldName]);
  const setField = useFormStore((s) => s.setField);
  const clearError = useFormStore((s) => s.clearError);

  const handleChange = (value: string) => {
    setField(fieldName, value);
    clearError(fieldName);
  };

  return (
    <div className={`radio-container ${error ? 'error-field' : ''}`}>
      <label className="radio-label">
        {label} <span className="required">*</span>
      </label>

      <div className="radio-content">
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                colorPrimary: 'green',
              },
            },
          }}
        >
          {options.map((opt) => (
            <label key={opt.id} className="radio-option">
              <Radio
                name={fieldName}
                value={opt.value}
                checked={selectedValue === opt.value}
                onChange={() => handleChange(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </ConfigProvider>
      </div>

      {error && <small className="error show">{error}</small>}
    </div>
  );
};

export default RadioGroup;
