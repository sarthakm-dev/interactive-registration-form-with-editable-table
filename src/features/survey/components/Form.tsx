import React, { useEffect } from 'react';
import InputField from '../../../shared/components/Input';
import RadioGroup from '../../../shared/components/RadioInput';
import RatingGroup from './RatingGroup';
import RatingStepper from './RatingStepper';
import { RATING_CONFIG } from '../constants/rating-config';
import { validateStep } from '../utils/validate-step';
import { useFormContext } from '../context/FormContext';
import { nameToFieldName } from '../utils/name-to-field';
import { validators } from '../utils/field-validator';
import type { TableRow } from '../types/table';

type FormProps = {
  onSubmit: (row: TableRow) => void;
  editingRow: TableRow | null;
};

const Form: React.FC<FormProps> = ({ onSubmit, editingRow }) => {
  const {
    formData,
    rating,
    errors,
    currentStep,
    setFormData,
    resetStep,
    setErrors,
    nextStep,
    prevStep,
    setRating,
    resetForm,
  } = useFormContext();

  const stepConfig = RATING_CONFIG[currentStep];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev: typeof formData) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev: typeof errors) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validate = validators[name as keyof typeof validators];
    if (!validate) return;

    const message = validate(value);
    if (message) {
      setErrors((prev: typeof errors) => ({ ...prev, [name]: message }));
    }
  };

  const handleNext = () => {
    const result = validateStep(currentStep, formData, rating);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    nextStep();
  };

  const handleSubmit = () => {
    const result = validateStep(currentStep, formData, rating);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    const row: TableRow = {
      id: editingRow?.id ?? crypto.randomUUID(),
      orderNumber: formData.orderNumber,
      email: formData.email,
      purchaseDate: formData.purchaseDate,
      shoppingMethod: formData.shoppingMethod,
      supportContacted: formData.supportContacted,
      packageContentExperience: formData.packageContentExperience,
      recommendationExperience: formData.recommendationExperience,
      whatDidYouLike: formData.whatDidYouLike,
      whatToImprove: formData.whatToImprove,
      additionalComment: formData.additionalComment,
      review: formData.review,
      ratings: rating,
    };

    onSubmit(row);
    resetForm();
    resetStep();
  };

  useEffect(() => {
    if (!editingRow) return;

    setFormData({
      orderNumber: editingRow.orderNumber,
      email: editingRow.email,
      purchaseDate: editingRow.purchaseDate,
      shoppingMethod: editingRow.shoppingMethod,
      supportContacted: editingRow.supportContacted === 'yes' ? 'yes' : 'no',
      packageContentExperience: editingRow.packageContentExperience,
      recommendationExperience: editingRow.recommendationExperience,
      whatDidYouLike: editingRow.whatDidYouLike,
      whatToImprove: editingRow.whatToImprove,
      additionalComment: editingRow.additionalComment,
      review: editingRow.review,
    });

    setRating(editingRow.ratings);
    setErrors({});
    resetStep();
  }, [editingRow]);

  return (
    <div className="w-full p-3 box-sizing:border-box">
      <div className="gap-3 p-0 grid">
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className=" gap-0 w-full flex-col">
            <InputField
              type="text"
              value={formData.orderNumber}
              placeholder="eg. ORD-XXXXXX"
              label="Order Number:"
              name="orderNumber"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.orderNumber}
            />
          </div>

          <div className="gap-0 w-full flex-col">
            <InputField
              type="text"
              value={formData.email}
              placeholder="Enter email"
              label="Email:"
              name="email"
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={errors.email}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <InputField
            type="date"
            value={formData.purchaseDate}
            label="Purchase Date:"
            name="purchaseDate"
            onChange={handleInputChange}
            onBlur={handleBlur}
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
      <div className="flex flex-col mt-2">
        {stepConfig.textareas?.map((ta) => {
          const fieldName = nameToFieldName(ta.name);

          return (
            <div key={ta.name} className="flex flex-col">
              <label htmlFor={fieldName}>{ta.label}</label>
              <textarea
                key={ta.name}
                placeholder={ta.label}
                maxLength={ta.maxlength}
                value={formData[fieldName] || ''}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    [fieldName]: e.target.value,
                  }));

                  if (errors[fieldName]) {
                    setErrors((prev) => {
                      const updated = { ...prev };
                      delete updated[fieldName];
                      return updated;
                    });
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex mt-6 justify-between">
        {currentStep > 0 && <button onClick={prevStep}>Prev</button>}

        {currentStep < RATING_CONFIG.length - 1 && <button onClick={handleNext}>Next</button>}

        {currentStep === RATING_CONFIG.length - 1 && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
};

export default Form;
