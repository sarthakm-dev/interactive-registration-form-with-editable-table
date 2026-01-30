import { useEffect } from 'react';
import InputField from '../../../shared/components/Input';
import RadioGroup from '../../../shared/components/RadioInput';
import RatingGroup from './RatingGroup';
import RatingStepper from './RatingStepper';
import { RATING_CONFIG } from '../constants/rating-config';
import { validateStep } from '../utils/validate-step';
import { nameToFieldName } from '../utils/name-to-field';
import type { TableRow } from '../types/table';
import { Button } from 'antd';
import { useFormStore } from '../../../store/useFormStore';
import { useTableStore } from '../../../store/useTableStore';
import { useUIStore } from '../../../store/useUiStore';
import { validators } from '../utils/field-validator';

const Form = () => {
  const {
    formData,
    rating,
    errors,
    currentStep,
    setField,
    clearError,
    setErrors,
    nextStep,
    prevStep,
    resetForm,
    hydrateFromRow,
  } = useFormStore();
  const openSuccess = useUIStore((s) => s.openSuccess);
  const closeForm = useUIStore((s) => s.closeForm);
  const stepConfig = RATING_CONFIG[currentStep];

  const { addOrUpdateRow, editingRow } = useTableStore();

  const handleNext = () => {
    const result = validateStep(currentStep, formData, rating);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    nextStep();
  };
  const validateField = (name: string, value: string) => {
    let fieldName = name;
    if(name=='purchaseDate'){
      fieldName = 'date';
    }
    const validator = validators[fieldName as keyof typeof validators];
    
    if (!validator) return;
    const error = validator(value);
    if (error) {
      setErrors({ ...errors, [name]: error });
    } else {
      clearError(name);
    }
  };
  const handleSubmit = () => {
    const isEdit = Boolean(editingRow);
    const result = validateStep(currentStep, formData, rating);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    const row: TableRow = {
      id: editingRow?.id ?? crypto.randomUUID(),
      ...formData,
      ratings: rating,
    };
    const success = addOrUpdateRow(row);
    if (!success) {
      return;
    }
    addOrUpdateRow(row);
    openSuccess(isEdit ? 'update' : 'create');
    closeForm(); 
    resetForm();
  };
  useEffect(() => {
    if (editingRow) {
      hydrateFromRow(editingRow);
    }
  }, [editingRow, hydrateFromRow]);

  return (
    <div className="form-container">
      <div className="product-details">
        <div className="personal-details">
          <div className="order-details">
            <InputField
              type="text"
              value={formData.orderNumber}
              placeholder="eg. ORD-XXXXXX"
              label="Order Number:"
              name="orderNumber"
              onChange={(e) => setField('orderNumber', e.target.value)}
              onBlur={(e) => validateField('orderNumber', e.target.value)}
              error={errors.orderNumber}
            />
          </div>

          <div className="email">
            <InputField
              type="text"
              value={formData.email}
              placeholder="Enter email"
              label="Email:"
              name="email"
              onChange={(e) => setField('email', e.target.value)}
              onBlur={(e) => validateField('email', e.target.value)}
              error={errors.email}
            />
          </div>
        </div>

        <div className="date-details">
          <InputField
            type="date"
            value={formData.purchaseDate}
            label="Purchase Date:"
            name="purchaseDate"
            onChange={(e) => setField('purchaseDate', e.target.value)}
            onBlur={(e) => validateField('purchaseDate', e.target.value)}
            error={errors.purchaseDate}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <RadioGroup
          label="Shopping Method"
          name="shoppingMethod"
          options={[
            { id: '1', label: 'Online', value: 'Online' },
            { id: '2', label: 'Offline', value: 'Offline' },
          ]}
        />
      </div>

      <RatingStepper currentStep={currentStep} />

      {stepConfig.ratings?.map((rate) => (
        <RatingGroup key={rate.category} category={rate.category} label={rate.label} />
      ))}

      {stepConfig.radio && (
        <RadioGroup
          name={stepConfig.radio.name}
          label={stepConfig.radio.label}
          options={stepConfig.radio.options}
        />
      )}

      {stepConfig.conditionalRatings &&
        formData.supportContacted === 'yes' &&
        stepConfig.conditionalRatings.map((r) => (
          <RatingGroup key={r.category} category={r.category} label={r.label} />
        ))}

      {stepConfig.radios && (
        <RadioGroup
          name={stepConfig.radios.name}
          label={stepConfig.radios.label}
          options={stepConfig.radios.options}
        />
      )}
      <div className="optional-text">
        {stepConfig.textareas?.map((ta) => {
          const fieldName = nameToFieldName(ta.name);

          return (
            <div key={ta.name} className="textbox">
              <label htmlFor={fieldName}>{ta.label}</label>
              <textarea
                key={ta.name}
                placeholder={ta.label}
                maxLength={ta.maxlength}
                value={formData[fieldName] || ''}
                onChange={(e) => setField(fieldName, e.target.value)}
              />
            </div>
          );
        })}
      </div>

      <div className="navigation">
        {currentStep > 0 && <Button onClick={prevStep}>Prev</Button>}

        {currentStep < RATING_CONFIG.length - 1 && <Button onClick={handleNext}>Next</Button>}

        {currentStep === RATING_CONFIG.length - 1 && <Button onClick={handleSubmit}>Submit</Button>}
      </div>
    </div>
  );
};

export default Form;
