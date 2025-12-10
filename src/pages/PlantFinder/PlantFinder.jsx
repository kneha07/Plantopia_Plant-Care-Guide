import { useState } from 'react';
import PlantCard from '../../components/PlantCard/PlantCard';
import plants from '../../data/plants';
import './PlantFinder.css';

const initialAnswers = {
  experience: '',
  light: '',
  watering: '',
  hasPets: '',
  petType: '',
  space: '',
};

function PlantFinder({ userSettings }) {
  const [answers, setAnswers] = useState(() => ({
    ...initialAnswers,
    experience: userSettings.experienceLevel || '',
  }));
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  function handleChange(field, value) {
    setAnswers(prev => {
      const newAnswers = { ...prev, [field]: value };

      if (field === 'hasPets' && value === 'no') {
        newAnswers.petType = '';
      }

      return newAnswers;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    let results = [...plants];

    if (answers.experience === 'beginner') {
      results = results.filter(p => p.difficulty === 'easy');
    } else if (answers.experience === 'intermediate') {
      results = results.filter(p => ['easy', 'moderate'].includes(p.difficulty));
    }

    if (answers.light === 'low') {
      results = results.filter(p => p.light === 'low');
    } else if (answers.light === 'medium') {
      results = results.filter(p => ['low', 'medium'].includes(p.light));
    }

    if (answers.watering === 'rarely') {
      results = results.filter(p => p.water === 'low');
    } else if (answers.watering === 'sometimes') {
      results = results.filter(p => ['low', 'moderate'].includes(p.water));
    }

    if (answers.hasPets === 'yes') {
      results = results.filter(p => p.petSafe === true);
    }

    setRecommendations(results.slice(0, 4));
    setShowResults(true);
  }

  function handleStartOver() {
    setAnswers({
      ...initialAnswers,
      experience: userSettings.experienceLevel || '',
    });
    setShowResults(false);
    setRecommendations([]);
  }

  const isFormValid = answers.experience && answers.light && answers.watering && answers.hasPets && (answers.hasPets === 'no' || answers.petType);

  return (
    <div className="plant-finder">
      <section className="section finder-header-section">
        <div className="container">
          <header className="section-header">
            <h1 className="section-title">Plant Finder</h1>
            <p className="section-subtitle">
              Answer a few questions and we&apos;ll recommend the perfect plants for you
            </p>
          </header>
        </div>
      </section>

      <section className="section finder-content-section">
        <div className="container">
          {!showResults ? (
            <form className="finder-form" onSubmit={handleSubmit}>
              <div className="quiz-question">
                <h2 className="question-title">What&apos;s your experience with plants?</h2>
                <div className="question-options">
                  {[
                    { value: 'beginner', label: '🌱 Beginner', desc: 'New to plant care' },
                    { value: 'intermediate', label: '🌿 Intermediate', desc: 'Some experience' },
                    { value: 'expert', label: '🌳 Expert', desc: 'Green thumb pro' },
                  ].map(option => (
                    <label key={option.value} className={`option-card ${answers.experience === option.value ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={answers.experience === option.value}
                        onChange={(e) => handleChange('experience', e.target.value)}
                        className="option-input"
                      />
                      <span className="option-label">{option.label}</span>
                      <span className="option-desc">{option.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="quiz-question">
                <h2 className="question-title">How much natural light does your space get?</h2>
                <div className="question-options">
                  {[
                    { value: 'low', label: '🌑 Low Light', desc: 'North-facing or few windows' },
                    { value: 'medium', label: '⛅ Medium Light', desc: 'Bright but indirect' },
                    { value: 'bright', label: '☀️ Bright Light', desc: 'South-facing, lots of sun' },
                  ].map(option => (
                    <label key={option.value} className={`option-card ${answers.light === option.value ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="light"
                        value={option.value}
                        checked={answers.light === option.value}
                        onChange={(e) => handleChange('light', e.target.value)}
                        className="option-input"
                      />
                      <span className="option-label">{option.label}</span>
                      <span className="option-desc">{option.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="quiz-question">
                <h2 className="question-title">How often do you want to water?</h2>
                <div className="question-options">
                  {[
                    { value: 'rarely', label: '🏜️ Rarely', desc: 'Once every 2+ weeks' },
                    { value: 'sometimes', label: '💧 Sometimes', desc: 'About once a week' },
                    { value: 'often', label: '🌊 Often', desc: 'Multiple times a week' },
                  ].map(option => (
                    <label key={option.value} className={`option-card ${answers.watering === option.value ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="watering"
                        value={option.value}
                        checked={answers.watering === option.value}
                        onChange={(e) => handleChange('watering', e.target.value)}
                        className="option-input"
                      />
                      <span className="option-label">{option.label}</span>
                      <span className="option-desc">{option.desc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="quiz-question">
                <h2 className="question-title">Do you have pets at home?</h2>
                <div className="question-options question-options-row">
                  {[
                    { value: 'yes', label: '🐾 Yes' },
                    { value: 'no', label: '❌ No' },
                  ].map(option => (
                    <label key={option.value} className={`option-card option-card-compact ${answers.hasPets === option.value ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="hasPets"
                        value={option.value}
                        checked={answers.hasPets === option.value}
                        onChange={(e) => handleChange('hasPets', e.target.value)}
                        className="option-input"
                      />
                      <span className="option-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {answers.hasPets === 'yes' && (
                <div className="quiz-question quiz-question-conditional">
                  <h2 className="question-title">What type of pet?</h2>
                  <p className="question-hint">This helps us recommend pet-safe plants</p>
                  <div className="question-options question-options-row">
                    {[
                      { value: 'cat', label: '🐱 Cat' },
                      { value: 'dog', label: '🐕 Dog' },
                      { value: 'both', label: '🐱🐕 Both' },
                      { value: 'other', label: '🐹 Other' },
                    ].map(option => (
                      <label key={option.value} className={`option-card option-card-compact ${answers.petType === option.value ? 'is-selected' : ''}`}>
                        <input
                          type="radio"
                          name="petType"
                          value={option.value}
                          checked={answers.petType === option.value}
                          onChange={(e) => handleChange('petType', e.target.value)}
                          className="option-input"
                        />
                        <span className="option-label">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={!isFormValid}
                >
                  Get My Recommendations
                </button>
              </div>
            </form>
          ) : (
            <div className="finder-results">
              <div className="results-header">
                <h2 className="results-title">
                  {recommendations.length > 0
                    ? `We found ${recommendations.length} perfect match${recommendations.length !== 1 ? 'es' : ''} for you!`
                    : 'No exact matches found'
                  }
                </h2>
                <p className="results-subtitle">
                  {recommendations.length > 0
                    ? 'Based on your answers, these plants would thrive in your home:'
                    : 'Try adjusting your preferences or explore our full collection.'
                  }
                </p>
              </div>

              {recommendations.length > 0 ? (
                <div className="results-grid">
                  {recommendations.map(plant => (
                    <PlantCard key={plant.id} plant={plant} />
                  ))}
                </div>
              ) : (
                <div className="results-empty">
                  <span className="empty-icon" aria-hidden="true">🔍</span>
                  <p>We couldn&apos;t find plants matching all your criteria.</p>
                </div>
              )}

              <div className="results-actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleStartOver}
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PlantFinder;