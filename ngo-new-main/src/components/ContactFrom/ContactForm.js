import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import SimpleReactValidator from 'simple-react-validator';
import { Spinner } from 'reactstrap';
import SuccessModal from '../SuccessModal';

const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_USER_ID;

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [forms, setForms] = useState({ name: '', email: '', message: '' });
  const [validator] = useState(
    new SimpleReactValidator({
      className: 'errorMessage',
      messages: {
        required: 'Please fill this field, it is required',
        email: 'Please enter a valid email address',
        alpha_space: 'Please enter only letters and spaces',
      },
    })
  );

  const changeHandler = e => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    setSubmitError('');
    if (validator.allValid()) {
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (!validator.allValid()) {
      validator.showMessages();
      return;
    }

    validator.hideMessages();
    setIsSubmitting(true);
    setSubmitError('');

    const templateParams = {
      from_name: forms.name,
      from_email: forms.email,
      message: forms.message,
      reply_to: forms.email,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setIsModalOpen(true);
      setForms({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitError('Something went wrong. Please try again or email us directly at info@rgcare.in');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <form onSubmit={submitHandler} id="contactForm" className="contact-form">
        <div className="input-item">
          <input
            value={forms.name}
            type="text"
            name="name"
            className="fild"
            onBlur={changeHandler}
            onChange={changeHandler}
            placeholder="Your Name"
          />
          <label>
            <i className="flaticon-user"></i>
          </label>
          {validator.message('name', forms.name, 'required|alpha_space')}
        </div>

        <div className="input-item">
          <input
            value={forms.email}
            type="email"
            name="email"
            className="fild"
            onBlur={changeHandler}
            onChange={changeHandler}
            placeholder="Your Email"
          />
          <label>
            <i className="flaticon-email"></i>
          </label>
          {validator.message('email', forms.email, 'required|email')}
        </div>

        <div className="input-item">
          <textarea
            onBlur={changeHandler}
            onChange={changeHandler}
            value={forms.message}
            className="fild textarea"
            name="message"
            placeholder="Message"
          ></textarea>
          <label>
            <i className="flaticon-edit"></i>
          </label>
          {validator.message('message', forms.message, 'required')}
        </div>

        {submitError && (
          <div style={{ color: '#c0392b', marginBottom: '10px', fontSize: '14px' }}>
            {submitError}
          </div>
        )}

        <div className="input-item submitbtn">
          <button className="fild" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner color="warning" size="sm" /> : null}
            {isSubmitting ? ' Submitting...' : 'Get In Touch'}
          </button>
        </div>
      </form>

      <SuccessModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        message="Your message has been successfully delivered. Our team will contact you shortly."
      />
    </>
  );
};

export default ContactForm;
