import { useState } from 'react';
import Widget from './Widget';
import './App.css';

/**
 * Standalone app wrapper for development
 * This allows the widget to run independently for testing
 * The dashboard will load Widget.jsx directly, not this file
 */
function App() {
  const [widgetProps, setWidgetProps] = useState({
    title: 'Development Mode',
    message: 'This is how your widget looks in standalone development!',
    initialCount: 0,
    autoIncrement: false,
    apiUrl: ''
  });

  const handlePropsChange = (key, value) => {
    setWidgetProps(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Widget Development Mode</h1>
        <p>Test your widget with different props before deploying</p>
      </header>

      <div className="app-container">
        {/* Props Editor */}
        <aside className="app-sidebar">
          <h2>Test Props</h2>
          <div className="props-editor">
            <label>
              Title:
              <input
                type="text"
                value={widgetProps.title || ''}
                onChange={(e) => handlePropsChange('title', e.target.value)}
              />
            </label>

            <label>
              Message:
              <textarea
                value={widgetProps.message || ''}
                onChange={(e) => handlePropsChange('message', e.target.value)}
                rows={3}
              />
            </label>

            <label>
              Initial Count:
              <input
                type="number"
                value={widgetProps.initialCount || 0}
                onChange={(e) => handlePropsChange('initialCount', parseInt(e.target.value, 10))}
              />
            </label>

            <label>
              <input
                type="checkbox"
                checked={widgetProps.autoIncrement || false}
                onChange={(e) => handlePropsChange('autoIncrement', e.target.checked)}
              />
              Auto Increment
            </label>

            <label>
              API URL:
              <input
                type="text"
                value={widgetProps.apiUrl || ''}
                onChange={(e) => handlePropsChange('apiUrl', e.target.value)}
                placeholder="https://api.example.com/data"
              />
            </label>

            <details>
              <summary>Current Props JSON</summary>
              <pre>{JSON.stringify(widgetProps, null, 2)}</pre>
            </details>
          </div>
        </aside>

        {/* Widget Preview */}
        <main className="app-main">
          <div className="widget-preview">
            <div className="widget-preview-label">
              <strong>Widget Preview</strong>
              <span>This is how it will appear in the dashboard</span>
            </div>
            <Widget {...widgetProps} />
          </div>
        </main>
      </div>

      <footer className="app-footer">
        <p>
          Run <code>npm run dev</code> to develop •
          Run <code>npm run build</code> to build •
          Push to <code>main</code> branch to auto-deploy
        </p>
      </footer>
    </div>
  );
}

export default App;
