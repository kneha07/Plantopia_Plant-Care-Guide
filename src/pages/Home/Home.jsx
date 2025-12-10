import PlantCard from '../../components/PlantCard/PlantCard';
import Carousel from '../../components/Carousel/Carousel';
import plants from '../../data/plants';
import './Home.css';

function Home({ onNavigate, userSettings }) {
  const featuredPlants = plants.filter(p =>
    ['Snake Plant', 'Pothos', 'Spider Plant'].includes(p.name)
  );

  const carouselPlants = plants.slice(0, 5).map(plant => ({
    ...plant,
    lightLabel: plant.light === 'low' ? 'Low Light' : plant.light === 'medium' ? 'Medium Light' : 'Bright Light',
    waterLabel: plant.water === 'low' ? 'Low Water' : plant.water === 'moderate' ? 'Moderate Water' : 'Frequent Water',
    difficultyLabel: plant.difficulty === 'easy' ? 'Easy' : plant.difficulty === 'moderate' ? 'Moderate' : 'Expert',
  }));

  const experienceMessages = {
    beginner: "New to plants? We've got easy-care options perfect for you!",
    intermediate: "Ready to expand your collection? Check out our diverse selection.",
    expert: "Looking for a challenge? We have some rare beauties waiting.",
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content container">
          <h1 className="hero-title">
            {userSettings.displayName
              ? `Welcome back, ${userSettings.displayName}!`
              : 'Grow Your Indoor Jungle'}
          </h1>
          <p className="hero-subtitle">
            {userSettings.displayName
              ? experienceMessages[userSettings.experienceLevel]
              : 'Discover the perfect plants for your space and lifestyle. From low-maintenance favorites to rare tropical beauties.'}
          </p>
          <div className="hero-actions">
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('plants')}
            >
              Browse Plants
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('finder')}
            >
              Find Your Plant
            </button>
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Why Choose Plantopia?</h2>
            <p className="section-subtitle">Your one-stop guide to thriving houseplants</p>
          </header>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">🌱</span>
              <h3 className="feature-title">Curated Selection</h3>
              <p className="feature-description">
                Hand-picked plants suited for indoor environments, from beginners to experts.
              </p>
            </div>
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">📖</span>
              <h3 className="feature-title">Care Guides</h3>
              <p className="feature-description">
                Detailed care instructions so you can keep your plants happy and healthy.
              </p>
            </div>
            <div className="feature-item">
              <span className="feature-icon" aria-hidden="true">🔍</span>
              <h3 className="feature-title">Plant Finder</h3>
              <p className="feature-description">
                Answer a few questions and discover plants that match your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt carousel-section">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Explore Our Plants</h2>
            <p className="section-subtitle">Browse through our popular picks</p>
          </header>
          <Carousel items={carouselPlants} title="Popular plants carousel" />
        </div>
      </section>

      <section className="section featured">
        <div className="container">
          <header className="section-header">
            <h2 className="section-title">Beginner Favorites</h2>
            <p className="section-subtitle">Start your plant journey with these hard-to-kill classics</p>
          </header>
          <div className="featured-grid">
            {featuredPlants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
          <div className="featured-cta">
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('plants')}
            >
              View All Plants
            </button>
          </div>
        </div>
      </section>

      <section className="section section-alt cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Not Sure Where to Start?</h2>
            <p className="cta-description">
              Take our quick plant finder to discover the perfect plants for your home,
              light conditions, and care preferences.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('finder')}
            >
              Find Your Plant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;