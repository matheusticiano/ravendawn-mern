import './Footer.css';

const Footer = () => {
  return (
    <div>
      <div className="footer-container">
        <div className="social-icons">
          <a href="https://www.instagram.com/ticiano.matheus/">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="mailto:matheusticiano34@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <div className="footer-info">
          <p>Support and business contact: matheusticiano34@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
