import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-brand">
          <span className="footer-logo" aria-hidden="true">🌿</span>
          <span className="footer-name">Plantopia</span>
        </div>

        <div className="footer-links">
          <a 
            href="https://twitter.com" 
            className="footer-social-link"
            aria-label="Follow Plantopia on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a 
            href="https://instagram.com" 
            className="footer-social-link"
            aria-label="Follow Plantopia on Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a 
            href="https://pinterest.com" 
            className="footer-social-link"
            aria-label="Follow Plantopia on Pinterest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 4.99 3.657 9.128 8.438 9.879-.117-.949-.223-2.405.046-3.441.243-.937 1.568-6.646 1.568-6.646s-.401-.802-.401-1.986c0-1.86 1.078-3.25 2.421-3.25 1.142 0 1.694.858 1.694 1.886 0 1.149-.731 2.867-1.107 4.461-.315 1.331.667 2.417 1.979 2.417 2.375 0 4.199-2.504 4.199-6.117 0-3.199-2.299-5.435-5.583-5.435-3.802 0-6.033 2.852-6.033 5.8 0 1.149.443 2.381 1.034 3.051.113.137.13.257.096.396-.106.441-.341 1.386-.387 1.58-.061.256-.2.31-.462.186-1.72-.8-2.795-3.313-2.795-5.333 0-4.341 3.154-8.329 9.092-8.329 4.774 0 8.484 3.4 8.484 7.947 0 4.742-2.99 8.56-7.14 8.56-1.394 0-2.705-.725-3.154-1.582 0 0-.69 2.631-.858 3.277-.31 1.194-1.148 2.689-1.708 3.601C9.614 23.811 10.785 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </a>
        </div>

        <p className="footer-copyright">
          © {currentYear} Plantopia. Made with 💚 for plant lovers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;