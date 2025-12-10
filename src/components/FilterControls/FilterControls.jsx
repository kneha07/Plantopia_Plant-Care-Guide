import './FilterControls.css';

function FilterControls({ filters, onFilterChange, onReset }) {
  const { light, water, difficulty, petSafe, sortBy } = filters;

  function handleChange(filterName, value) {
    onFilterChange(filterName, value);
  }

  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="filter-light" className="filter-label">Light</label>
        <select
          id="filter-light"
          className="filter-select"
          value={light}
          onChange={(e) => handleChange('light', e.target.value)}
        >
          <option value="">All Light Levels</option>
          <option value="low">Low Light</option>
          <option value="medium">Medium Light</option>
          <option value="bright">Bright Light</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-water" className="filter-label">Water</label>
        <select
          id="filter-water"
          className="filter-select"
          value={water}
          onChange={(e) => handleChange('water', e.target.value)}
        >
          <option value="">All Water Needs</option>
          <option value="low">Low Water</option>
          <option value="moderate">Moderate Water</option>
          <option value="frequent">Frequent Water</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-difficulty" className="filter-label">Difficulty</label>
        <select
          id="filter-difficulty"
          className="filter-select"
          value={difficulty}
          onChange={(e) => handleChange('difficulty', e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="moderate">Moderate</option>
          <option value="expert">Expert</option>
        </select>
      </div>

      <div className="filter-group filter-group-checkbox">
        <label className="filter-checkbox-label">
          <input
            type="checkbox"
            className="filter-checkbox"
            checked={petSafe}
            onChange={(e) => handleChange('petSafe', e.target.checked)}
          />
          <span className="checkbox-custom" aria-hidden="true"></span>
          <span>Pet Safe Only</span>
        </label>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-sort" className="filter-label">Sort By</label>
        <select
          id="filter-sort"
          className="filter-select"
          value={sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="difficulty-asc">Easiest First</option>
          <option value="difficulty-desc">Hardest First</option>
        </select>
      </div>

      <button
        className="filter-reset-btn"
        onClick={onReset}
        aria-label="Reset all filters"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterControls;