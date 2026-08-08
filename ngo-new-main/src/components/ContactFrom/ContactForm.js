import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../store/actions/userActions';
import SuccessModal from '../SuccessModal';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { isSubmitting } = useSelector(state => state.contact);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setSubmitError('');

    try {
      await dispatch(submitContactForm(forms));
      setIsModalOpen(true);
      setForms({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError('Something went wrong. Please try again or email us directly at info@rgcare.in');
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
