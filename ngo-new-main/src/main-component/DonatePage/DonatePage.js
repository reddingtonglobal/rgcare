import React, { Fragment, useState, useRef, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useSearchParams } from 'react-router-dom';
import NavbarS3 from '../../components/NavbarS3/NavbarS3';
import PageTitle from '../../components/pagetitle/PageTitle';
import FooterS3 from '../../components/footerS3/FooterS3';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/logo.png';
import BannerImg from '../../images/banners/img-16.jpg';

// Load Razorpay script dynamically
const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) return resolve(true);
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const API_URL = process.env.REACT_APP_API_URL;

const DonatePage = () => {
  const [formData, setFormData] = useState({
    donationAmount: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    note: '',
  });

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [searchParams] = useSearchParams();

  // Pre-fill amount if passed via URL ?amount=500
  useEffect(() => {
    const urlAmount = searchParams.get('amount');
    if (urlAmount && !isNaN(urlAmount) && Number(urlAmount) > 0) {
      setFormData(prev => ({ ...prev, donationAmount: urlAmount }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validator.current.showMessages();
    forceUpdate({});
  };

  const handleAmountSelect = (amount) => {
    setFormData({ ...formData, donationAmount: String(amount) });
    forceUpdate({});
  };

  // Main payment handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validator.current.allValid()) {
      validator.current.showMessages();
      forceUpdate({});
      return;
    }

    setLoading(true);
    setPaymentStatus(null);

    // 1. Load Razorpay script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Failed to load Razorpay. Please check your internet connection and try again.');
      setLoading(false);
      return;
    }

    // 2. Create order via backend
    let orderData;
    try {
      const response = await fetch(`${API_URL}/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: formData.donationAmount }),
      });
      orderData = await response.json();
      if (!response.ok) throw new Error(orderData.error || 'Order creation failed');
    } catch (err) {
      alert('Could not initiate payment: ' + err.message);
      setLoading(false);
      return;
    }

    // 3. Open Razorpay checkout
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'RG Care Foundation',
      description: 'Donation for Underprivileged Children',
      image: '/logo192.png',
      order_id: orderData.orderId,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: '',
      },
      theme: { color: '#2e26b2' },
      handler: async (response) => {
        // 4. Verify payment on backend and send emails
        try {
          const verifyRes = await fetch(`${API_URL}/verify-razorpay-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donorDetails: formData,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            setPaymentStatus('success');
            setFormData({ donationAmount: '', firstName: '', lastName: '', email: '', address: '', note: '' });
            validator.current.hideMessages();
          } else {
            setPaymentStatus('failed');
          }
        } catch {
          setPaymentStatus('failed');
        }
        setLoading(false);
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => {
      setPaymentStatus('failed');
      setLoading(false);
    });
    rzp.open();
  };

  const pageTitleStyle = {
    backgroundImage: `url(${BannerImg})`,
    zIndex: 'auto',
    marginTop: '30px',
  };
  const breadcrumbStyle = { textAlign: 'left', padding: '5px' };

  const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

  return (
    <Fragment>
      <NavbarS3 hclass={'wpo-site-header'} Logo={Logo} />
      <PageTitle
        pagesub={
          <div className="row">
            <div className="col-6">
              <p className="page-heading-title" style={{ color: '#2e26b2', padding: '0px 8px' }}>
                Make a Difference Today!
              </p>
            </div>
          </div>
        }
        pageDesc={
          <div className="row">
            <div className="col-6">
              <p className="desc" style={{ color: '#FBAD17', padding: '0px 8px' }}>
                Donate to help underprivileged <br />
                children access education. <br />
                Every contribution counts!
              </p>
            </div>
          </div>
        }
        breadcrumbStyle={breadcrumbStyle}
        pageTitleStyle={pageTitleStyle}
      />

      <div className="donation-page-area section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="donate-header">
                <h2>Make a Donation</h2>
              </div>

              {paymentStatus === 'success' && (
                <div
                  role="alert"
                  style={{
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    background: '#d4edda',
                    border: '1px solid #c3e6cb',
                    color: '#155724',
                    textAlign: 'center',
                  }}
                >
                  <strong>Thank you for your donation!</strong> A confirmation email has been sent to you.
                </div>
              )}
              {paymentStatus === 'failed' && (
                <div
                  role="alert"
                  style={{
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '20px',
                    background: '#f8d7da',
                    border: '1px solid #f5c6cb',
                    color: '#721c24',
                    textAlign: 'center',
                  }}
                >
                  <strong>Payment failed or was cancelled.</strong> Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Donation Amount */}
                <div className="donations-amount">
                  <h2>Your Donation (Rs.)</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '6px',
                          border: formData.donationAmount === String(amt) ? '2px solid #2e26b2' : '2px solid #ccc',
                          background: formData.donationAmount === String(amt) ? '#2e26b2' : '#fff',
                          color: formData.donationAmount === String(amt) ? '#fff' : '#333',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        Rs. {amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    name="donationAmount"
                    value={formData.donationAmount}
                    onChange={handleInputChange}
                    placeholder="Or enter a custom amount (Rs.)"
                    min="1"
                  />
                  {validator.current.message('donationAmount', formData.donationAmount, 'required|numeric|min:1,num')}
                </div>

                {/* Donor Details */}
                <div className="donations-details">
                  <h2>Your Details</h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                      />
                      {validator.current.message('firstName', formData.firstName, 'required|alpha')}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                      />
                      {validator.current.message('lastName', formData.lastName, 'required|alpha')}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                      />
                      {validator.current.message('email', formData.email, 'required|email')}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-12 form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                      />
                      {validator.current.message('address', formData.address, 'required')}
                    </div>
                    <div className="col-lg-12 col-12 form-group">
                      <textarea
                        className="form-control"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Message (optional)"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Secure Payment */}
                <div className="donation-payment">
                  <h2>Secure Payment via Razorpay</h2>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                    You will be redirected to Razorpay secure checkout to complete your donation.
                    We accept UPI, Net Banking, Credit/Debit Cards, and Wallets.
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <img src="https://razorpay.com/favicon.ico" alt="Razorpay" style={{ width: '20px', height: '20px' }} />
                    <span style={{ fontSize: '13px', color: '#888' }}>Powered by Razorpay - 100% Secure Payments</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="submit-area">
                  <button
                    type="submit"
                    className="theme-btn submit-btn"
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                          style={{ marginRight: '8px' }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>Donate Now - Rs. {formData.donationAmount || '---'}</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <FooterS3 />
      <Scrollbar />
    </Fragment>
  );
};

export default DonatePage;
