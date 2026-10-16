import { useId, useState } from 'react';
import './LeadForm.css';

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

export default function LeadForm({ formId = 15, submitLabel = "Let's Talk" }) {
  // Unique per-instance prefix so ids don't collide when the form renders more than once per page
  const uid = useId();
  // 1. React state to match Form ID 15 fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    multipleChoice: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    // Strict WPGraphQL Gravity Forms payload formatting with empty string fallbacks
    const fieldValues = [
      { id: 12, value: formData.firstName || '' },
      { id: 13, value: formData.lastName || '' },
      {
        id: 5,
        emailValues: { value: formData.email || '' }, // Strict email schema wrapper
      },
      { id: 6, value: formData.phone || '' },
      { id: 4, value: formData.company || '' },
      { id: 7, value: formData.multipleChoice || '' },
      { id: 9, value: formData.message || '' },
    ];

    const input = {
      id: formId, // Consultation Form ID (15)
      fieldValues,
    };

    try {
      const res = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
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
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        multipleChoice: '',
        message: '',
      });
    } catch (err) {
      console.error('Submission Error:', err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="lead-form-confirmation">
        <div dangerouslySetInnerHTML={{ __html: confirmationMessage }} />
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

      <div className="lead-form-field">
        <label htmlFor={`${uid}-firstName`}>First Name</label>
        <input
          id={`${uid}-firstName`}
          type="text"
          name="firstName"
          autoComplete="given-name"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          disabled={status === 'submitting'}
          required
        />
      </div>

      <div className="lead-form-field">
        <label htmlFor={`${uid}-lastName`}>Last Name</label>
        <input
          id={`${uid}-lastName`}
          type="text"
          name="lastName"
          autoComplete="family-name"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          disabled={status === 'submitting'}
          required
        />
      </div>

      <div className="lead-form-field">
        <label htmlFor={`${uid}-email`}>Email</label>
        <input
          id={`${uid}-email`}
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          disabled={status === 'submitting'}
          required
        />
      </div>

      <div className="lead-form-field">
        <label htmlFor={`${uid}-phone`}>Phone</label>
        <input
          id={`${uid}-phone`}
          type="tel"
          name="phone"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(555) 000-0000"
          disabled={status === 'submitting'}
        />
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

      <div className="lead-form-field lead-form-field--full">
        <label htmlFor={`${uid}-multipleChoice`}>What do you need help with?</label>
        <select
          id={`${uid}-multipleChoice`}
          name="multipleChoice"
          value={formData.multipleChoice}
          onChange={handleChange}
          disabled={status === 'submitting'}
        >
          <option value="">Select an option...</option>
          <option value="Web Development">Web Development</option>
          <option value="SEO">SEO</option>
          <option value="PPC">PPC</option>
        </select>
      </div>

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
