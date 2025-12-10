import './PlantCard.css';

function PlantCard({ plant }) {
  const { name, scientificName, image, light, water, difficulty, petSafe, description } = plant;

  const difficultyLabels = {
    easy: 'Easy',
    moderate: 'Moderate',
    expert: 'Expert',
  };

  const lightLabels = {
    low: 'Low Light',
    medium: 'Medium Light',
    bright: 'Bright Light',
  };

  const waterLabels = {
    low: 'Low Water',
    moderate: 'Moderate Water',
    frequent: 'Frequent Water',
  };

  return (
    <article className="plant-card">
      <div className="plant-card-image-wrapper">
        <img 
          src={image} 
          alt={`${name} (${scientificName}) - ${description.split('.')[0]}`}
          className="plant-card-image"
          loading="lazy"
        />
        {petSafe && (
          <span className="plant-card-badge" aria-label="Pet safe plant">
            🐾 Pet Safe
          </span>
        )}
      </div>

      <div className="plant-card-content">
        <h3 className="plant-card-title">{name}</h3>
        <p className="plant-card-scientific">{scientificName}</p>
        <p className="plant-card-description">{description}</p>

        <ul className="plant-card-traits">
          <li className="plant-card-trait">
            <span className="trait-icon" aria-hidden="true">☀️</span>
            <span>{lightLabels[light]}</span>
          </li>
          <li className="plant-card-trait">
            <span className="trait-icon" aria-hidden="true">💧</span>
            <span>{waterLabels[water]}</span>
          </li>
          <li className="plant-card-trait">
            <span className={`trait-difficulty trait-difficulty-${difficulty}`}>
              {difficultyLabels[difficulty]}
            </span>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default PlantCard;