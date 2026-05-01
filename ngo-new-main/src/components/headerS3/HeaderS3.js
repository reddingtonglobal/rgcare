import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import MobileMenu from '../MobileMenu/MobileMenu';
import { connect } from 'react-redux';
import { removeFromCart } from '../../store/actions/action';

const HeaderS3 = props => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(true);
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  return (
    <header id="header" className="header-s3" style={props.style}>
      <div className={'' + props.hclass}>
        <nav className="navigation navbar navbar-expand-xl navbar-light">
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 15px 0 15px' }}>

            {/* LOGO — top-left */}
            <div style={{ flexShrink: 0, marginRight: '20px' }}>
              <Link onClick={ClickHandler} className="navbar-brand" to="/home" style={{ padding: 0, margin: 0, display: 'inline-block' }}>
                <img
                  src={props.Logo}
                  alt="logo"
                  className="header-logo-img"
                  style={{
                    width: '180px',
                    maxWidth: 'none',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </Link>
            </div>

            {/* MOBILE MENU */}
            <div className="d-xl-none" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Donate button always visible on mobile/tablet */}
              <Link onClick={ClickHandler} className="theme-btn" to="/donate" style={{ padding: '8px 18px', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                Donate Now
              </Link>
              <MobileMenu />
            </div>

            {/* NAV MENU — center */}
            <div id="navbar" className="collapse navbar-collapse navigation-holder d-none d-xl-flex" style={{ flex: 1 }}>
              <button className="menu-close">
                <i className="ti-close"></i>
              </button>
              <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} className="active" to="/home">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us" onClick={() => setSubMenuVisible(true)}>
                        About Us
                      </Link>
                      {isSubMenuVisible && (
                        <ul className="sub-menu">
                          <li>
                            <ScrollLink to="about-us" smooth={true} duration={500} onClick={() => setSubMenuVisible(false)} offset={-150}>
                              About Us
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink to="who-we-are" smooth={true} duration={500} onClick={() => setSubMenuVisible(false)} offset={-150}>
                              Who We Are
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink
                              to="our-mission-and-vision"
                              offset={-150}
                              smooth={true}
                              duration={500}
                              onClick={() => setSubMenuVisible(false)}
                            >
                              Our Mission and Vision
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink to="our-values" offset={-50} smooth={true} duration={500} onClick={() => setSubMenuVisible(false)}>
                              Our Values
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink
                              to="key-programs-and-initiatives"
                              offset={-150}
                              smooth={true}
                              duration={500}
                              onClick={() => setSubMenuVisible(false)}
                            >
                              Key Programs and Initiatives
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink
                              to="impact-metrics"
                              offset={-150}
                              smooth={true}
                              duration={500}
                              onClick={() => setSubMenuVisible(false)}
                            >
                              Impact Metrics
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink to="our-team" offset={-50} smooth={true} duration={500} onClick={() => setSubMenuVisible(false)}>
                              Our Team
                            </ScrollLink>
                          </li>
                          <li>
                            <ScrollLink
                              to="partners-and-sponsors"
                              offset={-150}
                              smooth={true}
                              duration={500}
                              onClick={() => setSubMenuVisible(false)}
                            >
                              Partners & Sponsors
                            </ScrollLink>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li>
                      <Link onClick={ClickHandler} to="/impact/success-stories">
                        Impact
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link onClick={ClickHandler} to="/impact/success-stories">
                            Success Stories
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/impact/gallery">
                            Photo/Video Gallery
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/get-involved/become-volunteer">
                        Get Involved
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link onClick={ClickHandler} to="/get-involved/become-volunteer">
                            Volunteer Opportunities or Join Our team
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/get-involved/fundraising-compaigns">
                            Fundraising Campaigns
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/get-involved/corporate-partnerships">
                            Corporate Partnerships
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/get-involved/events">
                            Events
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/donate">
                        Donate
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
            </div>

            {/* CTA + CONTACT — far right */}
            <div className="d-none d-xl-flex" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '18px', marginLeft: 'auto' }}>
              <div className="close-form">
                <Link onClick={ClickHandler} className="theme-btn" to="/donate" style={{ padding: '11px 26px', fontSize: '14px', fontWeight: '600' }}>
                  Donate Now
                </Link>
              </div>
              <div className="header-contact-info" style={{ 
                display: 'flex', 
                gap: '16px', 
                fontSize: '13px',
                paddingLeft: '18px',
                borderLeft: '1px solid #e0e0e0'
              }}>
                <a href="mailto:info@rgcare.in" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  whiteSpace: 'nowrap',
                  color: '#333',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2727a8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#333'}
                >
                  <i className="ti-email" style={{ color: '#2727a8', fontSize: '15px' }}></i>
                  <span className="contact-label">info@rgcare.in</span>
                </a>
                <Link to="tel:+919220815624" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  whiteSpace: 'nowrap',
                  color: '#333',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2727a8'}
                  onMouseLeave={e => e.currentTarget.style.color = '#333'}
                >
                  <i className="ti-mobile" style={{ color: '#2727a8', fontSize: '15px' }}></i>
                  <span className="contact-label">+91 9220815624</span>
                </Link>
              </div>
            </div>

          </div>
        </nav>
      </div>
    </header>
  );
};
const mapStateToProps = state => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, { removeFromCart })(HeaderS3);
