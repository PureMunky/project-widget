# Important Projects Widget

A dashboard widget for tracking important projects with markdown support, visual indicators, and localStorage persistence.

## Features

- **Project Management**: Create, edit, and delete projects
- **Rich Data**: Track name, description, status, priority, and deadlines
- **Markdown Support**: Format descriptions with links, bold, italic, lists, and more
- **Sorting & Filtering**: Sort by priority, deadline, or status; filter by status
- **Visual Indicators**:
  - Color-coded status borders (Planning, In Progress, Blocked, Completed)
  - Priority badges (High, Medium, Low)
  - Overdue warnings for past deadlines
- **Persistent Storage**: All data saved to localStorage automatically
- **Clean UI**: Card-based layout with hover effects and subtle controls

## Dashboard Configuration

Add this to your dashboard's widget configuration:

```json
{
  "id": "important-projects",
  "name": "Important Projects",
  "url": "https://puremunky.github.io/project-widget/",
  "scope": "importantProjectsWidget",
  "module": "./Widget"
}
```

## Development

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173/project-widget/` to see the widget in development mode.

### Build

```bash
npm run build
```

### Deploy

Push to the `main` branch and GitHub Actions will automatically build and deploy to GitHub Pages.

## Project Structure

```
project-widget/
├── src/
│   ├── components/
│   │   ├── ProjectCard.jsx      # Individual project display
│   │   ├── ProjectForm.jsx      # Add/edit modal
│   │   └── FilterBar.jsx        # Sort/filter controls
│   ├── utils/
│   │   ├── projectUtils.js      # Utility functions
│   │   └── storageManager.js    # localStorage management
│   ├── constants/
│   │   └── projectConstants.js  # App constants
│   ├── ImportantProjectsWidget.jsx  # Main widget
│   └── Widget.jsx               # Module Federation entry
├── vite.config.js               # Build configuration
└── package.json
```

## Usage

### Adding a Project

Click the "+ Add Project" button and fill in:
- **Project Name** (required)
- **Description** (supports markdown)
- **Status**: Planning, In Progress, Blocked, or Completed
- **Priority**: High, Medium, or Low
- **Deadline** (required)

### Markdown in Descriptions

Use markdown formatting in project descriptions:

```markdown
**Important:** See [project docs](https://example.com)

- Feature A complete
- Feature B in progress
- Need to *review* with team
```

### Editing Projects

Click any project card to edit. The delete button is available in the edit dialog.

## Technologies

- React 19.2.0
- Module Federation (via @originjs/vite-plugin-federation)
- react-markdown for description rendering
- localStorage for data persistence

## License

MIT
