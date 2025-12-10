import { useState, useMemo } from 'react';
import FilterControls from '../../components/FilterControls/FilterControls';
import PlantCard from '../../components/PlantCard/PlantCard';
import plants from '../../data/plants';
import './Plants.css';

const initialFilters = {
  light: '',
  water: '',
  difficulty: '',
  petSafe: false,
  sortBy: 'name-asc',
};

function Plants() {
  const [filters, setFilters] = useState(initialFilters);

  function handleFilterChange(filterName, value) {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  }

  function handleReset() {
    setFilters(initialFilters);
  }

  const filteredPlants = useMemo(() => {
    let result = [...plants];

    if (filters.light) {
      result = result.filter(p => p.light === filters.light);
    }

    if (filters.water) {
      result = result.filter(p => p.water === filters.water);
    }

    if (filters.difficulty) {
      result = result.filter(p => p.difficulty === filters.difficulty);
    }

    if (filters.petSafe) {
      result = result.filter(p => p.petSafe === true);
    }

    const difficultyOrder = { easy: 1, moderate: 2, expert: 3 };

    switch (filters.sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'difficulty-asc':
        result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'difficulty-desc':
        result.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  const activeFilterCount = [
    filters.light,
    filters.water,
    filters.difficulty,
    filters.petSafe,
  ].filter(Boolean).length;

  return (
    <div className="plants-page">
      <section className="section plants-header-section">
        <div className="container">
          <header className="section-header">
            <h1 className="section-title">Browse Plants</h1>
            <p className="section-subtitle">
              Explore our collection and find the perfect plant for your space
            </p>
          </header>
        </div>
      </section>

      <section className="section plants-content-section">
        <div className="container">
          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          <div className="plants-results-info">
            <p className="results-count">
              Showing {filteredPlants.length} of {plants.length} plants
              {activeFilterCount > 0 && (
                <span className="filter-badge">
                  {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
                </span>
              )}
            </p>
          </div>

          {filteredPlants.length > 0 ? (
            <div className="plants-grid">
              {filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="plants-empty">
              <span className="empty-icon" aria-hidden="true">🌵</span>
              <h2 className="empty-title">No plants found</h2>
              <p className="empty-description">
                Try adjusting your filters to see more results.
              </p>
              <button className="btn btn-primary" onClick={handleReset}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Plants;