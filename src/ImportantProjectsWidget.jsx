import { useState, useEffect, useMemo } from 'react';
import { loadProjects, saveProjects, loadSettings, saveSettings } from './utils/storageManager';
import { generateProjectId, sortProjects, filterProjects } from './utils/projectUtils';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';
import FilterBar from './components/FilterBar';
import './ImportantProjectsWidget.css';

export default function ImportantProjectsWidget() {
  const [projects, setProjects] = useState(() => loadProjects());
  const [sortBy, setSortBy] = useState(() => loadSettings('sortBy', 'priority'));
  const [filterStatus, setFilterStatus] = useState(() => loadSettings('filterStatus', null));
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  useEffect(() => {
    saveSettings('sortBy', sortBy);
  }, [sortBy]);

  useEffect(() => {
    saveSettings('filterStatus', filterStatus);
  }, [filterStatus]);

  const visibleProjects = useMemo(() => {
    const filtered = filterProjects(projects, filterStatus);
    return sortProjects(filtered, sortBy);
  }, [projects, sortBy, filterStatus]);

  const handleAddClick = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleSave = (formData) => {
    if (editingProject) {
      setProjects(projects.map(p =>
        p.id === editingProject.id
          ? { ...p, ...formData, updatedAt: new Date().toISOString() }
          : p
      ));
    } else {
      const newProject = {
        id: generateProjectId(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setProjects([...projects, newProject]);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleDelete = (projectId) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== projectId));
      setIsFormOpen(false);
      setEditingProject(null);
    }
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleFilterChange = (newFilterStatus) => {
    setFilterStatus(newFilterStatus);
  };

  return (
    <div className="important-projects-widget">
      <div className="important-projects-header">
        <h2 className="important-projects-title">Important Projects</h2>
        <button
          onClick={handleAddClick}
          className="important-projects-btn important-projects-btn-add"
        >
          + Add Project
        </button>
      </div>

      {projects.length > 0 && (
        <FilterBar
          sortBy={sortBy}
          onSortChange={handleSortChange}
          filterStatus={filterStatus}
          onFilterChange={handleFilterChange}
          projectCount={visibleProjects.length}
        />
      )}

      {visibleProjects.length === 0 ? (
        <div className="important-projects-empty">
          {projects.length === 0 ? (
            <>
              <p>No projects yet.</p>
              <p>Click "Add Project" to get started!</p>
            </>
          ) : (
            <p>No projects match the current filter.</p>
          )}
        </div>
      ) : (
        <div className="important-projects-list">
          {visibleProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      )}

      <ProjectForm
        isOpen={isFormOpen}
        project={editingProject}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
    </div>
  );
}
