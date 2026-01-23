import { getState, setState } from '../../app.state';
import { RATING_CONFIG } from '../../config/ratings.config';
import { addClass } from '../../ui/addClass';
import { createElement } from '../../ui/createElement';
import { createInput } from '../../ui/createInput';
import { renderRadioGroup } from './rating.radio';
import { renderRatingGroup } from './rating.star';

export function renderRatingSections(): HTMLElement {
  const container = createElement('div');

  const sections = RATING_CONFIG;

  sections.forEach((section, index) => {
    const sectionEl = createElement('div', {
      className:
        getState.currentStep === index ? ['rating-section', 'active'] : ['rating-section'],
      attributes: { 'data-section': String(index) },
    });

    // Render ratings
    section.ratings?.forEach(({ category, label }) => {
      const ratingGroup = renderRatingGroup(category, label);
      sectionEl.appendChild(ratingGroup);
    });

    // Render radio
    if (section.radio) {
      const radioGroup = renderRadioGroup(section.radio.name, section.radio.label, section.radio.options);
      sectionEl.appendChild(radioGroup);
    }

    // Render conditional ratings
    section.conditionalRatings?.forEach(({ category, label }) => {
      const ratingGroup = renderRatingGroup(category, label);
      const supported = getState.formData.supportContacted === 'yes';
      if (!supported) {
        addClass(ratingGroup, 'hidden-conditional');
      }
      sectionEl.appendChild(ratingGroup);
    });

    // Render additional radios
    section.radios?.forEach((radio) => {
      const radioGroup = renderRadioGroup(radio.name, radio.label, radio.options);
      sectionEl.appendChild(radioGroup);
    });

    // Render textareas
    if (section.textareas) {
      const optionalDiv = createElement('div', { className: 'optional-text' });
      section.textareas.forEach(({ name, label, maxlength = 300 }) => {
        // Convert kebab-case to camelCase
        const formDataKey = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as keyof typeof getState.formData;
        
        optionalDiv.appendChild(createElement('label', { className: 'textarea-label', text: label }));
        const textarea = createElement('textarea', {
          attributes: {
            name,
            placeholder: 'Enter your text here..',
            maxlength: String(maxlength),
          },
          className: 'textarea',
        }) as HTMLTextAreaElement;
        textarea.value = (getState.formData[formDataKey] as string) || '';
        textarea.addEventListener('input', (e) => {
          const ta = e.target as HTMLTextAreaElement;
          setState({
            formData: { ...getState.formData, [formDataKey]: ta.value },
          });
        });
        optionalDiv.appendChild(textarea);
      });

      if (section.checkbox) {
        const checkboxDiv = createElement('div', { className: 'checkbox-container' });
        checkboxDiv.appendChild(
          createElement('label', {
            className: 'textarea-label',
            text: section.checkbox.label,
          }),
        );
        const checkbox = createInput('checkbox', {
          name: section.checkbox.name,
          id: 'participate-in-monthly-review',
          value: 'Yes',
          onChange: (e) => {
            const input = e.target as HTMLInputElement;
            setState({
              formData: {
                ...getState.formData,
                participateInMonthlyReview: input.checked ? 'Yes' : 'No',
              },
            });
          },
        });
        checkboxDiv.appendChild(checkbox);
        optionalDiv.appendChild(checkboxDiv);
      }

      sectionEl.appendChild(optionalDiv);
    }

    container.appendChild(sectionEl);
  });

  return container;
}