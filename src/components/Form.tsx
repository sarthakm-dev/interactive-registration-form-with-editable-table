import React from "react";
import InputField from "./Input";
import RadioGroup from "./RadioInput";
import RatingStepper from "./RatingStepper";
import { RATING_CONFIG } from "../constants/rating-config";
import RatingGroup from "./RatingGroup";
import { useFormContext } from "../context/FormContext";
import { nameToFieldName } from "../utils/name-to-field";

const Form = () => {
  const { formData, rating, currentStep, setFormData, nextStep, prevStep } =
    useFormContext();
  const stepConfig = RATING_CONFIG[currentStep];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, " ", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
              onChange={handleInputChange}
            />
            <small className="error">Enter in ORD-XXXXXX format</small>
          </div>
          <div className="order-details">
            <InputField
              type="text"
              value={formData.email}
              placeholder=""
              label="Email:"
              name="email"
              onChange={handleInputChange}
            />
            <small className="error">Enter a valid email id</small>
          </div>
        </div>
        <div className="date-details">
          <InputField
            type="date"
            value={formData.date}
            label="Purchase Date:"
            name="date"
            onChange={handleInputChange}
          />
          <small className="error">This is a required field</small>
        </div>
        <div className="radio-container">
          <RadioGroup
            label="Shopping Method"
            name="method"
            options={[
              { id: "1", label: "Online", value: "Online" },
              { id: "2", label: "Offline", value: "Offline" },
            ]}
          />
        </div>
      </div>
      <RatingStepper currentStep={currentStep} />

      {stepConfig.ratings?.map((rate) => (
        <RatingGroup category={rate.category} label={rate.label} />
      ))}
      {stepConfig.radio && (
        <RadioGroup
          label={stepConfig.radio.label}
          name={stepConfig.radio.name}
          options={stepConfig.radio.options}
        />
      )}
      {stepConfig.conditionalRatings &&
        formData.supportContacted === "yes" &&
        stepConfig.conditionalRatings.map((rating) => (
          <RatingGroup
            key={rating.category}
            category={rating.category}
            label={rating.label}
          />
        ))}
      <div className="optional-text">
        {stepConfig.textareas?.map((ta) => (
          <textarea
            key={ta.name}
            placeholder={ta.label}
            maxLength={ta.maxlength}
            value={formData[nameToFieldName(ta.name)] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [ta.name]: e.target.value,
              }))
            }
          />
        ))}
      </div>

      <div className="navigation">
        {currentStep > 0 && <button onClick={prevStep}>Prev</button>}
        {currentStep < RATING_CONFIG.length - 1 && (
          <button onClick={nextStep}>Next</button>
        )}
        {currentStep === RATING_CONFIG.length - 1 && (
          <button onClick={() => console.log({ formData, rating })}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
