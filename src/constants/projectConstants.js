export const STATUS_OPTIONS = [
  'Planning',
  'In Progress',
  'Blocked',
  'Completed'
];

export const PRIORITY_OPTIONS = [
  'High',
  'Medium',
  'Low'
];

export const STORAGE_KEYS = {
  PROJECTS: 'important-projects:projects',
  SORT_BY: 'important-projects:sortBy',
  FILTER_STATUS: 'important-projects:filterStatus'
};

export const SORT_OPTIONS = [
  { value: 'priority', label: 'Priority' },
  { value: 'deadline', label: 'Deadline' },
  { value: 'status', label: 'Status' }
];
