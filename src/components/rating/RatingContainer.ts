import { appState, setState } from '../../app.state';
import { RATING_CONFIG } from '../../config/ratings.config';
import * as dom from '../../utils/dom';
import { renderRadioGroup } from './RadioGroup';
import { renderRatingGroup } from './RatingGroup';

export function renderRatingSections(): HTMLElement {
  const container = dom.createElement('div');

  const sections = RATING_CONFIG;

  sections.forEach((section, index) => {
    const sectionEl = dom.createElement('div', {
      className:
        appState.currentStep === index ? ['rating-section', 'active'] : ['rating-section'],
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
      const supported = appState.formData.supportContacted === 'yes';
      if (!supported) {
        dom.addClass(ratingGroup, 'hidden-conditional');
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
      const optionalDiv = dom.createElement('div', { className: 'optional-text' });
      section.textareas.forEach(({ name, label, maxlength = 300 }) => {
        // Convert kebab-case to camelCase
        const formDataKey = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) as keyof typeof appState.formData;
        
        optionalDiv.appendChild(dom.createElement('label', { className: 'textarea-label', text: label }));
        const textarea = dom.createElement('textarea', {
          attributes: {
            name,
            placeholder: 'Enter your text here..',
            maxlength: String(maxlength),
          },
          className: 'textarea',
        }) as HTMLTextAreaElement;
        textarea.value = (appState.formData[formDataKey] as string) || '';
        textarea.addEventListener('input', (e) => {
          const ta = e.target as HTMLTextAreaElement;
          setState({
            formData: { ...appState.formData, [formDataKey]: ta.value },
          });
        });
        optionalDiv.appendChild(textarea);
      });

      if (section.checkbox) {
        const checkboxDiv = dom.createElement('div', { className: 'checkbox-container' });
        checkboxDiv.appendChild(
          dom.createElement('label', {
            className: 'textarea-label',
            text: section.checkbox.label,
          }),
        );
        const checkbox = dom.createInput('checkbox', {
          name: section.checkbox.name,
          id: 'participate-in-monthly-review',
          value: 'Yes',
          onChange: (e) => {
            const input = e.target as HTMLInputElement;
            setState({
              formData: {
                ...appState.formData,
                participateInMonthlyReview: input.checked ? 'yes' : 'no',
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