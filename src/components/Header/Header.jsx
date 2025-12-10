import Navigation from '../Navigation/Navigation';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

function Header({ currentPage, onNavigate, theme, onToggleTheme, onOpenSettings, userSettings }) {
  const greeting = userSettings.displayName
    ? `Hello, ${userSettings.displayName}!`
    : '';

  return (
    <header className="header">
      <div className="header-container container">
        <a
          href="#/"
          className="header-logo"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          aria-label="Plantopia - Go to homepage"
        >
          <span className="logo-icon" aria-hidden="true">🌿</span>
          <span className="logo-text">Plantopia</span>
        </a>

        {greeting && (
          <span className="header-greeting">{greeting}</span>
        )}

        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            className="settings-btn"
            onClick={onOpenSettings}
            aria-label="Open user settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <Navigation currentPage={currentPage} onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}

export default Header;