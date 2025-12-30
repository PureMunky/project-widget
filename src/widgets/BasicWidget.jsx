import './BasicWidget.css';

/**
 * Basic Widget Example
 *
 * Demonstrates:
 * - Simple static content
 * - Props handling
 * - Scoped CSS styling
 */
export default function BasicWidget(props) {
  const { title = 'Basic Widget', message = 'Hello from the widget!' } = props;

  return (
    <div className="basic-widget">
      <h3 className="basic-widget-title">{title}</h3>
      <p className="basic-widget-message">{message}</p>

      <div className="basic-widget-info">
        <p>This is a basic widget example demonstrating:</p>
        <ul>
          <li>Props from dashboard configuration</li>
          <li>Scoped CSS styling</li>
          <li>Simple component structure</li>
        </ul>
      </div>

      {Object.keys(props).length > 0 && (
        <details className="basic-widget-props">
          <summary>Props received from dashboard</summary>
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </details>
      )}
    </div>
  );
}
