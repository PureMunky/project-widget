import { STATUS_OPTIONS, SORT_OPTIONS } from '../constants/projectConstants';
import './FilterBar.css';

export default function FilterBar({ sortBy, onSortChange, filterStatus, onFilterChange, projectCount }) {
  return (
    <div className="important-projects-filters">
      <div className="important-projects-filters-controls">
        <div className="important-projects-filter-group">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="important-projects-select"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="important-projects-filter-group">
          <label htmlFor="filter">Filter by status:</label>
          <select
            id="filter"
            value={filterStatus || ''}
            onChange={(e) => onFilterChange(e.target.value || null)}
            className="important-projects-select"
          >
            <option value="">All</option>
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="important-projects-count">
        {projectCount} {projectCount === 1 ? 'project' : 'projects'}
      </div>
    </div>
  );
}
