import BasicWidget from './widgets/BasicWidget';
// import StatefulWidget from './widgets/StatefulWidget';
import './Widget.css';

/**
 * Main Widget Entry Point
 *
 * This component is exposed via Module Federation and loaded by the dashboard.
 *
 * CUSTOMIZATION:
 * - Import your widget component above
 * - Export it as default below
 * - Delete the example widgets when ready
 */
export default function Widget(props) {
  // Option 1: Use BasicWidget (default)
  return <BasicWidget {...props} />;

  // Option 2: Use StatefulWidget
  // return <StatefulWidget {...props} />;

  // Option 3: Create your own widget inline
  // return (
  //   <div className="my-widget">
  //     <h3>My Custom Widget</h3>
  //     <p>Widget content here</p>
  //   </div>
  // );
}
