import ReactMarkdown from 'react-markdown';
import { isProjectOverdue, formatDate } from '../utils/projectUtils';
import './ProjectCard.css';

export default function ProjectCard({ project, onEdit }) {
  const isOverdue = isProjectOverdue(project.deadline, project.status);

  return (
    <div
      className={`important-projects-card important-projects-status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => onEdit(project)}
    >
      <div className="important-projects-card-header">
        <h3 className="important-projects-card-name">{project.name}</h3>
        <span className={`important-projects-priority important-projects-priority-${project.priority.toLowerCase()}`}>
          {project.priority}
        </span>
      </div>

      <div className={`important-projects-status-badge important-projects-status-badge-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
        {project.status}
      </div>

      {project.description && (
        <div
          className="important-projects-card-description"
          onClick={(e) => e.stopPropagation()}
        >
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </div>
      )}

      <div className="important-projects-card-deadline">
        <strong>Deadline:</strong> {formatDate(project.deadline)}
      </div>

      {isOverdue && (
        <div className="important-projects-overdue-warning">
          Overdue
        </div>
      )}

      <button
        className="important-projects-btn-edit-subtle"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(project);
        }}
        title="Edit project"
      >
        Edit
      </button>
    </div>
  );
}
