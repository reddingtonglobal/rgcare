import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useDispatch, useSelector } from 'react-redux';
import { submitContactForm } from '../../store/actions/userActions';
import { Spinner } from 'reactstrap';
import SuccessModal from '../SuccessModal';
const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forms, setForms] = useState({ name: '', email: '', subject: '', phone: '', message: '' });
  const [validator] = useState(
    new SimpleReactValidator({
      className: 'errorMessage',
      messages: {
        required: 'Please fill this field its required',
        email: 'Please enter a valid email address',
        alpha_space: 'Please enter only letters and spaces',
      },
    })
  );

  const dispatch = useDispatch();
  const { isSubmitting } = useSelector(state => state.contact);

  const changeHandler = e => {
    setForms({ ...forms, [e.target.name]: e.target.value });
    if (validator.allValid()) {
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (validator.allValid()) {
      validator.hideMessages();
      try {
        await dispatch(submitContactForm(forms));
        setIsModalOpen(true);
        setForms({
          name: '',
          email: '',
          subject: '',
          phone: '',
          message: '',
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      validator.showMessages();
    }
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <form onSubmit={e => submitHandler(e)} id="contactForm" className="contact-form">
        <div className="input-item">
          <input
            value={forms.name}
            type="text"
            name="name"
            className="fild"
            onBlur={e => changeHandler(e)}
            onChange={e => changeHandler(e)}
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
            onBlur={e => changeHandler(e)}
            onChange={e => changeHandler(e)}
            placeholder="Your Email"
          />
          <label>
            <i className="flaticon-email"></i>
          </label>
          {validator.message('email', forms.email, 'required|email')}
        </div>
        <div className="input-item">
          <textarea
            onBlur={e => changeHandler(e)}
            onChange={e => changeHandler(e)}
            value={forms.message}
            type="text"
            className="fild textarea"
            name="message"
            placeholder="Message"
          ></textarea>
          <label>
            <i className="flaticon-edit"></i>
          </label>
          {validator.message('message', forms.message, 'required')}
        </div>
        {/* <div className="input-item submitbtn">
        <input className="fild" type="submit" value="Get In Touch" />
      </div> */}
        <div className="input-item submitbtn">
          <button
            className="fild"
            type="submit"
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? <Spinner color="warning" size="sm" /> : null}
            {isSubmitting ? ' Submitting...' : 'Get In Touch'}
          </button>
        </div>
      </form>
      <SuccessModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        message={'Your message has been successfully delivered. Our team will contact you shortly.'}
      />
    </>
  );
};

export default ContactForm;
