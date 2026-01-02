export function generateProjectId() {
  return `proj-${Date.now()}`;
}

export function sortProjects(projects, sortBy) {
  const sorted = [...projects];

  switch (sortBy) {
    case 'priority': {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }
    case 'deadline':
      return sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    case 'status': {
      const statusOrder = { 'Blocked': 4, 'In Progress': 3, 'Planning': 2, 'Completed': 1 };
      return sorted.sort((a, b) => statusOrder[b.status] - statusOrder[a.status]);
    }
    default:
      return sorted;
  }
}

export function filterProjects(projects, filterStatus) {
  if (!filterStatus) {
    return projects;
  }
  return projects.filter(project => project.status === filterStatus);
}

export function isProjectOverdue(deadline, status) {
  if (status === 'Completed') {
    return false;
  }
  const deadlineDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  return deadlineDate < today;
}

export function validateProject(formData) {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Project name is required';
  }

  if (!formData.deadline || !/^\d{4}-\d{2}-\d{2}$/.test(formData.deadline)) {
    errors.deadline = 'Valid deadline date is required';
  }

  if (!formData.status) {
    errors.status = 'Status is required';
  }

  if (!formData.priority) {
    errors.priority = 'Priority is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}
