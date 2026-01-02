import ImportantProjectsWidget from './ImportantProjectsWidget';
import './Widget.css';

/**
 * Main Widget Entry Point
 *
 * This component is exposed via Module Federation and loaded by the dashboard.
 */
export default function Widget(props) {
  return <ImportantProjectsWidget {...props} />;
}
