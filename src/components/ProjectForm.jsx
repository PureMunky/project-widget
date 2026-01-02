import { useState, useEffect } from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from '../constants/projectConstants';
import { validateProject } from '../utils/projectUtils';
import './ProjectForm.css';

export default function ProjectForm({ isOpen, project, onSave, onCancel, onDelete }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    deadline: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || '',
        description: project.description || '',
        status: project.status || 'Planning',
        priority: project.priority || 'Medium',
        deadline: project.deadline || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'Planning',
        priority: 'Medium',
        deadline: ''
      });
    }
    setErrors({});
  }, [project, isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateProject(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="important-projects-form-overlay" onClick={onCancel}>
      <div className="important-projects-form-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="important-projects-form-title">
          {project ? 'Edit Project' : 'Add New Project'}
        </h2>

        <form onSubmit={handleSubmit} className="important-projects-form">
          <div className="important-projects-form-group">
            <label htmlFor="name">Project Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="important-projects-form-error">{errors.name}</span>}
          </div>

          <div className="important-projects-form-group">
            <label htmlFor="description">
              Description
              <span className="important-projects-form-hint">Markdown supported</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Supports **bold**, *italic*, [links](url), lists, and more..."
            />
          </div>

          <div className="important-projects-form-row">
            <div className="important-projects-form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={errors.status ? 'error' : ''}
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {errors.status && <span className="important-projects-form-error">{errors.status}</span>}
            </div>

            <div className="important-projects-form-group">
              <label htmlFor="priority">Priority *</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={errors.priority ? 'error' : ''}
              >
                {PRIORITY_OPTIONS.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
              {errors.priority && <span className="important-projects-form-error">{errors.priority}</span>}
            </div>
          </div>

          <div className="important-projects-form-group">
            <label htmlFor="deadline">Deadline *</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={errors.deadline ? 'error' : ''}
            />
            {errors.deadline && <span className="important-projects-form-error">{errors.deadline}</span>}
          </div>

          <div className="important-projects-form-buttons">
            {project && (
              <button
                type="button"
                onClick={() => onDelete(project.id)}
                className="important-projects-btn important-projects-btn-delete-form"
              >
                Delete Project
              </button>
            )}
            <div className="important-projects-form-buttons-right">
              <button
                type="button"
                onClick={onCancel}
                className="important-projects-btn important-projects-btn-cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="important-projects-btn important-projects-btn-submit"
              >
                {project ? 'Update' : 'Add'} Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
