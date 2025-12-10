import { useState, useEffect } from 'react';

import SkipLink from './components/SkipLink/SkipLink';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';

import Home from './pages/Home/Home';
import Plants from './pages/Plants/Plants';
import PlantFinder from './pages/PlantFinder/PlantFinder';
import About from './pages/About/About';

import './App.css';

function getPageFromHash(hash) {
  const routes = {
    '#/': 'home',
    '#/plants': 'plants',
    '#/finder': 'finder',
    '#/about': 'about',
  };
  return routes[hash] || 'home';
}

function getHashFromPage(page) {
  const hashes = {
    home: '#/',
    plants: '#/plants',
    finder: '#/finder',
    about: '#/about',
  };
  return hashes[page] || '#/';
}

function App() {
  const initialHash = window.location.hash || '#/';
  const [currentPage, setCurrentPage] = useState(getPageFromHash(initialHash));
  const [theme, setTheme] = useState('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSettings, setUserSettings] = useState({
    displayName: '',
    experienceLevel: 'beginner',
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.title = getPageTitle(currentPage);
  }, [currentPage]);

  useEffect(() => {
    function handlePopState() {
      const hash = window.location.hash || '#/';
      setCurrentPage(getPageFromHash(hash));
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  function getPageTitle(page) {
    const titles = {
      home: 'Plantopia | Your Plant Care Guide',
      plants: 'Browse Plants | Plantopia',
      finder: 'Plant Finder Quiz | Plantopia',
      about: 'About Us | Plantopia',
    };
    return titles[page] || 'Plantopia';
  }

  function handleNavigate(page) {
    const hash = getHashFromPage(page);
    window.history.pushState(null, '', hash);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function handleToggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSaveSettings(newSettings) {
    setUserSettings(newSettings);
    setIsModalOpen(false);
  }

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} userSettings={userSettings} />;
      case 'plants':
        return <Plants />;
      case 'finder':
        return <PlantFinder userSettings={userSettings} />;
      case 'about':
        return <About />;
      default:
        return <Home onNavigate={handleNavigate} userSettings={userSettings} />;
    }
  }

  return (
    <>
      <SkipLink />
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSettings={handleOpenModal}
        userSettings={userSettings}
      />
      <main id="main-content">
        {renderPage()}
      </main>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userSettings={userSettings}
        onSave={handleSaveSettings}
      />
    </>
  );
}

export default App;