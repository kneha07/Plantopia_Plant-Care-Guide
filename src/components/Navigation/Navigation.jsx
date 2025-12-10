import { useState, useEffect, useRef } from 'react';
import './Navigation.css';

function Navigation({ currentPage, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const navRef = useRef(null);
  const buttonRef = useRef(null);

  const mainNavItems = [
    { id: 'home', label: 'Home', hash: '#/' },
    { id: 'plants', label: 'Plants', hash: '#/plants' },
  ];

  const submenuItems = [
    { id: 'finder', label: 'Plant Finder', hash: '#/finder' },
    { id: 'about', label: 'About & FAQ', hash: '#/about' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navRef.current && 
        !navRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setIsSubmenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsSubmenuOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (isMenuOpen || isSubmenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen, isSubmenuOpen]);

  function handleToggleMenu() {
    setIsMenuOpen(prev => !prev);
    if (isMenuOpen) {
      setIsSubmenuOpen(false);
    }
  }

  function handleToggleSubmenu() {
    setIsSubmenuOpen(prev => !prev);
  }

  function handleNavClick(e, pageId) {
    e.preventDefault();
    onNavigate(pageId);
    setIsMenuOpen(false);
    setIsSubmenuOpen(false);
  }

  function handleSubmenuKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleSubmenu();
    }
  }

  const isResourcesActive = currentPage === 'finder' || currentPage === 'about';

  return (
    <nav className="navigation" aria-label="Main navigation">
      <button
        ref={buttonRef}
        className={`nav-toggle ${isMenuOpen ? 'is-open' : ''}`}
        onClick={handleToggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="nav-menu"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <ul
        ref={navRef}
        id="nav-menu"
        className={`nav-menu ${isMenuOpen ? 'is-open' : ''}`}
      >
        {mainNavItems.map(item => (
          <li key={item.id}>
            <a
              href={item.hash}
              className={`nav-link ${currentPage === item.id ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, item.id)}
              aria-current={currentPage === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}

        <li className="nav-item-dropdown">
          <button
            className={`nav-link nav-dropdown-trigger ${isResourcesActive ? 'is-active' : ''}`}
            onClick={handleToggleSubmenu}
            onKeyDown={handleSubmenuKeyDown}
            aria-expanded={isSubmenuOpen}
          >
            Resources
            <svg 
              className={`dropdown-arrow ${isSubmenuOpen ? 'is-open' : ''}`}
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

          <ul className={`nav-submenu ${isSubmenuOpen ? 'is-open' : ''}`}>
            {submenuItems.map(item => (
              <li key={item.id}>
                <a
                  href={item.hash}
                  className={`nav-submenu-link ${currentPage === item.id ? 'is-active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;