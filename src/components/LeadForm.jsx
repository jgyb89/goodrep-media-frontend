import { useId, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import './LeadForm.css';

export const GF_FIELD_IDS = Object.freeze({
  COMPANY: 4,
  EMAIL: 5,
  PHONE: 6,
  SERVICES_NEEDED: 7,
  MESSAGE: 9,
  FIRST_NAME: 12,
  LAST_NAME: 13,
});

export const SPA_ESTHETICIAN_FORM_ID = 17;
export const SPA_ESTHETICIAN_FIELD_IDS = Object.freeze({
  COMPANY: 4,
  EMAIL: 5,
  PHONE: 6,
  SERVICES_NEEDED: 7,
  MESSAGE: 9,
  FIRST_NAME: 12,
  LAST_NAME: 13,
});

const INITIAL_FORM_STATE = Object.freeze({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  multipleChoice: [],
  message: '',
});

const getGraphQLEndpoint = () => {
  if (typeof import.meta !== 'undefined') {
    if (import.meta.env?.PUBLIC_WORDPRESS_GRAPHQL_URL) {
      return import.meta.env.PUBLIC_WORDPRESS_GRAPHQL_URL;
    }
    if (import.meta.env?.PUBLIC_WORDPRESS_API_URL) {
      const url = import.meta.env.PUBLIC_WORDPRESS_API_URL;
      if (url.endsWith('/graphql')) return url;
      return `${url.replace(/\/wp-json\/.*$/, '')}/graphql`;
    }
  }
  return 'https://wp.goodrep.media/graphql';
};

const SUBMIT_GF_FORM_MUTATION = `
  mutation SubmitLeadForm($input: SubmitGfFormInput!) {
    submitGfForm(input: $input) {
      confirmation {
        type
        message
        url
      }
      errors {
        id
        message
      }
    }
  }
`;

// Phone formatter: locks to US area code & phone number template: (XXX) XXX-XXXX
export const formatPhoneNumber = (value = '') => {
  let digits = value.replace(/\D/g, '');
  // Strip leading 1 if pasted with country code
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, 10);

  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export const validateField = (name, value) => {
  switch (name) {
    case 'firstName': {
      const val = typeof value === 'string' ? value.trim() : (value || '');
      if (!val) return 'First name is required.';
      if (val.length < 2) return 'First name must be at least 2 characters.';
      return '';
    }
    case 'lastName': {
      const val = typeof value === 'string' ? value.trim() : (value || '');
      if (!val) return 'Last name is required.';
      if (val.length < 2) return 'Last name must be at least 2 characters.';
      return '';
    }
    case 'email': {
      const val = typeof value === 'string' ? value.trim() : (value || '');
      if (!val) return 'Email address is required.';
      if (!EMAIL_REGEX.test(val)) return 'Please enter a valid email address (e.g. you@company.com).';
      return '';
    }
    case 'phone': {
      const digits = (value || '').replace(/\D/g, '');
      if (!digits) return 'Phone number is required.';
      if (digits.length < 10) return 'Please enter a complete 10-digit phone number.';
      return '';
    }
    case 'multipleChoice': {
      const selected = Array.isArray(value) ? value : (value ? [value] : []);
      if (selected.length === 0) return 'Please select what you need help with.';
      return '';
    }
    default:
      return '';
  }
};

const CHOICES_COL_1 = [
  'Website Design',
  'Paid Digital Ads',
  'Search Engine Optimization',
];

const CHOICES_COL_2 = [
  'Social Media Management',
  'Marketing Strategy',
  'Branding',
];

export default function LeadForm({
  formId = 15,
  submitLabel = "Let's Talk",
  fieldIds = GF_FIELD_IDS,
}) {
  // Unique per-instance prefix so ids don't collide when the form renders more than once per page
  const uid = useId();

  // Form state
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  // Validation errors & touched state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === 'phone') {
      nextValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    // If the field has already been touched or flagged with an error, validate live
    if (touched[name] || errors[name]) {
      const fieldError = validateField(name, nextValue);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };

  const handleCheckboxToggle = (option) => {
    const current = Array.isArray(formData.multipleChoice) ? formData.multipleChoice : [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    setFormData((prev) => ({
      ...prev,
      multipleChoice: updated,
    }));

    // Re-validate if touched (pure callback, no side effect in state updater)
    if (touched.multipleChoice || errors.multipleChoice) {
      const fieldError = validateField('multipleChoice', updated);
      setErrors((prevErr) => ({
        ...prevErr,
        multipleChoice: fieldError,
      }));
    }
  };

  const handleChoiceBlur = () => {
    setTouched((prev) => ({
      ...prev,
      multipleChoice: true,
    }));
    const fieldError = validateField('multipleChoice', formData.multipleChoice);
    setErrors((prev) => ({
      ...prev,
      multipleChoice: fieldError,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all required fields
    const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'multipleChoice'];
    const newErrors = {};
    const newTouched = {};

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus the first invalid field for clean accessibility
      const firstErrorField = fieldsToValidate.find((field) => newErrors[field]);
      if (firstErrorField) {
        if (firstErrorField === 'multipleChoice') {
          const firstChoice = document.getElementById(`${uid}-choice-website-design`);
          firstChoice?.focus();
        } else {
          const el = document.getElementById(`${uid}-${firstErrorField}`);
          el?.focus();
        }
      }
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Strict WPGraphQL Gravity Forms payload formatting with empty string fallbacks
    const multipleChoiceValue = Array.isArray(formData.multipleChoice)
      ? formData.multipleChoice.join(', ')
      : (formData.multipleChoice || '');

    const activeFieldIds = {
      ...GF_FIELD_IDS,
      ...fieldIds,
    };

    const fieldValues = [
      { id: activeFieldIds.FIRST_NAME, value: formData.firstName || '' },
      { id: activeFieldIds.LAST_NAME, value: formData.lastName || '' },
      {
        id: activeFieldIds.EMAIL,
        emailValues: { value: formData.email || '' }, // Strict email schema wrapper
      },
      { id: activeFieldIds.PHONE, value: formData.phone || '' },
      { id: activeFieldIds.COMPANY, value: formData.company || '' },
      { id: activeFieldIds.SERVICES_NEEDED, value: multipleChoiceValue },
      { id: activeFieldIds.MESSAGE, value: formData.message || '' },
    ];

    const input = {
      id: formId, // Gravity Forms Form ID (e.g. 15 for standard consultation, 17 for Spa & Esthetician)
      fieldValues,
    };

    try {
      const endpoint = getGraphQLEndpoint();
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: SUBMIT_GF_FORM_MUTATION,
          variables: { input },
        }),
      });

      const json = await res.json();

      if (json.errors && json.errors.length > 0) {
        console.error('GraphQL API Errors:', json.errors);
        throw new Error(json.errors[0]?.message || 'GraphQL submission error');
      }

      const result = json.data?.submitGfForm;
      if (result?.errors && result.errors.length > 0) {
        const errorText = result.errors.map((err) => err.message).join(', ');
        throw new Error(errorText || 'Form submission failed');
      }

      const confirmationHtml = result?.confirmation?.message;
      setConfirmationMessage(
        confirmationHtml || 'Thank you! Your submission has been received.'
      );
      setStatus('success');
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error('Submission Error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="lead-form-confirmation">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(confirmationMessage) }} />
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="lead-form-reset-btn"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="lead-form-wrap">
      <form onSubmit={handleSubmit} className="lead-form" noValidate>
        {status === 'error' && (
          <div className="lead-form-error lead-form-field--full" role="alert">
            {errorMessage}
          </div>
        )}

        <div
          className={`lead-form-field ${
            errors.firstName && touched.firstName ? 'lead-form-field--error' : ''
          }`}
        >
          <label htmlFor={`${uid}-firstName`}>
            First Name <span className="lead-form-required" aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-firstName`}
            type="text"
            name="firstName"
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="First Name"
            disabled={status === 'submitting'}
            aria-required="true"
            aria-invalid={!!(errors.firstName && touched.firstName)}
            aria-describedby={
              errors.firstName && touched.firstName ? `${uid}-firstName-error` : undefined
            }
          />
          {errors.firstName && touched.firstName && (
            <span
              id={`${uid}-firstName-error`}
              className="lead-form-error-msg"
              role="alert"
            >
              {errors.firstName}
            </span>
          )}
        </div>

        <div
          className={`lead-form-field ${
            errors.lastName && touched.lastName ? 'lead-form-field--error' : ''
          }`}
        >
          <label htmlFor={`${uid}-lastName`}>
            Last Name <span className="lead-form-required" aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-lastName`}
            type="text"
            name="lastName"
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Last Name"
            disabled={status === 'submitting'}
            aria-required="true"
            aria-invalid={!!(errors.lastName && touched.lastName)}
            aria-describedby={
              errors.lastName && touched.lastName ? `${uid}-lastName-error` : undefined
            }
          />
          {errors.lastName && touched.lastName && (
            <span
              id={`${uid}-lastName-error`}
              className="lead-form-error-msg"
              role="alert"
            >
              {errors.lastName}
            </span>
          )}
        </div>

        <div
          className={`lead-form-field ${
            errors.email && touched.email ? 'lead-form-field--error' : ''
          }`}
        >
          <label htmlFor={`${uid}-email`}>
            Email <span className="lead-form-required" aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="you@company.com"
            disabled={status === 'submitting'}
            aria-required="true"
            aria-invalid={!!(errors.email && touched.email)}
            aria-describedby={
              errors.email && touched.email ? `${uid}-email-error` : undefined
            }
          />
          {errors.email && touched.email && (
            <span
              id={`${uid}-email-error`}
              className="lead-form-error-msg"
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>

        <div
          className={`lead-form-field ${
            errors.phone && touched.phone ? 'lead-form-field--error' : ''
          }`}
        >
          <label htmlFor={`${uid}-phone`}>
            Phone <span className="lead-form-required" aria-hidden="true">*</span>
          </label>
          <input
            id={`${uid}-phone`}
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(555) 000-0000"
            disabled={status === 'submitting'}
            aria-required="true"
            aria-invalid={!!(errors.phone && touched.phone)}
            aria-describedby={
              errors.phone && touched.phone ? `${uid}-phone-error` : undefined
            }
          />
          {errors.phone && touched.phone && (
            <span
              id={`${uid}-phone-error`}
              className="lead-form-error-msg"
              role="alert"
            >
              {errors.phone}
            </span>
          )}
        </div>

        <div className="lead-form-field lead-form-field--full">
          <label htmlFor={`${uid}-company`}>Company</label>
          <input
            id={`${uid}-company`}
            type="text"
            name="company"
            autoComplete="organization"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            disabled={status === 'submitting'}
          />
        </div>

        {/* Multiple Choice Radial Buttons - 3 on two columns */}
        <fieldset
          className={`lead-form-field lead-form-field--full lead-form-fieldset ${
            errors.multipleChoice && touched.multipleChoice ? 'lead-form-field--error' : ''
          }`}
          aria-required="true"
          aria-invalid={!!(errors.multipleChoice && touched.multipleChoice)}
          aria-describedby={
            errors.multipleChoice && touched.multipleChoice
              ? `${uid}-multipleChoice-error`
              : undefined
          }
        >
          <legend className="lead-form-legend">
            What do you need help with?{' '}
            <span className="lead-form-required" aria-hidden="true">*</span>
          </legend>

          <div className="lead-form-choices-grid">
            <div className="lead-form-choices-col">
              {CHOICES_COL_1.map((option) => {
                const optId = `${uid}-choice-${option.replace(/\s+/g, '-').toLowerCase()}`;
                const isChecked =
                  Array.isArray(formData.multipleChoice) &&
                  formData.multipleChoice.includes(option);
                return (
                  <label key={option} htmlFor={optId} className="lead-form-choice">
                    <input
                      id={optId}
                      type="checkbox"
                      name="multipleChoice"
                      value={option}
                      checked={isChecked}
                      onChange={() => handleCheckboxToggle(option)}
                      onBlur={handleChoiceBlur}
                      disabled={status === 'submitting'}
                    />
                    <span className="lead-form-choice-text">{option}</span>
                  </label>
                );
              })}
            </div>

            <div className="lead-form-choices-col">
              {CHOICES_COL_2.map((option) => {
                const optId = `${uid}-choice-${option.replace(/\s+/g, '-').toLowerCase()}`;
                const isChecked =
                  Array.isArray(formData.multipleChoice) &&
                  formData.multipleChoice.includes(option);
                return (
                  <label key={option} htmlFor={optId} className="lead-form-choice">
                    <input
                      id={optId}
                      type="checkbox"
                      name="multipleChoice"
                      value={option}
                      checked={isChecked}
                      onChange={() => handleCheckboxToggle(option)}
                      onBlur={handleChoiceBlur}
                      disabled={status === 'submitting'}
                    />
                    <span className="lead-form-choice-text">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {errors.multipleChoice && touched.multipleChoice && (
            <span
              id={`${uid}-multipleChoice-error`}
              className="lead-form-error-msg"
              role="alert"
            >
              {errors.multipleChoice}
            </span>
          )}
        </fieldset>

        <div className="lead-form-field lead-form-field--full">
          <label htmlFor={`${uid}-message`}>Message</label>
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help your business grow?"
            disabled={status === 'submitting'}
          />
        </div>

        <div className="lead-form-field--full">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="lead-form-submit-btn"
          >
            {status === 'submitting' ? 'Submitting...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
