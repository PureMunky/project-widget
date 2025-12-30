# Widget Customization Guide

Step-by-step guide to customize this template for your widget.

## Step 1: Configure Repository Settings

### 1.1 Update package.json

```json
{
  "name": "my-awesome-widget",
  "version": "1.0.0",
  "description": "My awesome dashboard widget",
  ...
}
```

### 1.2 Update vite.config.js

Change two things:

```javascript
federation({
  name: 'myAwesomeWidget',  // Change this - must be camelCase
  // ... rest stays the same
}),
// ...
base: '/my-awesome-widget/'  // Change this - must match repo name
```

### 1.3 Update index.html title

```html
<title>My Awesome Widget</title>
```

## Step 2: Choose Your Starting Point

### Option A: Start with BasicWidget

1. Open `src/Widget.jsx`
2. Keep the BasicWidget import and export:
   ```jsx
   import BasicWidget from './widgets/BasicWidget';
   export default function Widget(props) {
     return <BasicWidget {...props} />;
   }
   ```
3. Customize `src/widgets/BasicWidget.jsx`

### Option B: Start with StatefulWidget

1. Open `src/Widget.jsx`
2. Switch to StatefulWidget:
   ```jsx
   import StatefulWidget from './widgets/StatefulWidget';
   export default function Widget(props) {
     return <StatefulWidget {...props} />;
   }
   ```
3. Customize `src/widgets/StatefulWidget.jsx`

### Option C: Start from Scratch

1. Open `src/Widget.jsx`
2. Replace the content:
   ```jsx
   import './Widget.css';

   export default function Widget(props) {
     return (
       <div className="my-awesome-widget">
         <h3>My Awesome Widget</h3>
         <p>Your content here</p>
       </div>
     );
   }
   ```
3. Delete `src/widgets/` folder if not needed

## Step 3: Develop Your Widget

### 3.1 Test Locally

```bash
npm run dev
```

Visit `http://localhost:5173` and use the props editor to test.

### 3.2 Add Features

Common patterns:

**Fetch data from API:**
```jsx
useEffect(() => {
  fetch(apiUrl)
    .then(res => res.json())
    .then(setData)
    .catch(setError);
}, [apiUrl]);
```

**Store data in localStorage:**
```jsx
useEffect(() => {
  localStorage.setItem('my-widget:data', JSON.stringify(data));
}, [data]);
```

**Set up a timer:**
```jsx
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

### 3.3 Style Your Widget

Edit the CSS file (e.g., `src/Widget.css` or `src/widgets/BasicWidget.css`).

**Important**: Always use scoped class names:
```css
.my-awesome-widget { }
.my-awesome-widget-title { }
.my-awesome-widget-button { }
```

## Step 4: Configure Props

### 4.1 Define Expected Props

In your widget component:

```jsx
export default function Widget(props) {
  const {
    title = 'Default Title',
    apiKey,
    refreshInterval = 60000,
    showDetails = true
  } = props;

  // Use props...
}
```

### 4.2 Test Props Locally

Use the development wrapper's props editor to test different values.

### 4.3 Document Props

Add a comment at the top of your widget:

```jsx
/**
 * My Awesome Widget
 *
 * Props:
 * - title (string): Widget title
 * - apiKey (string, required): API authentication key
 * - refreshInterval (number): Auto-refresh interval in ms (default: 60000)
 * - showDetails (boolean): Show detailed view (default: true)
 */
export default function Widget(props) {
  // ...
}
```

## Step 5: Build and Test

### 5.1 Build for Production

```bash
npm run build
```

Check that `dist/` folder is created.

### 5.2 Preview Build

```bash
npm run preview
```

Visit the preview URL to test the production build.

## Step 6: Deploy

### 6.1 Enable GitHub Pages

1. Go to repository Settings > Pages
2. Source: **GitHub Actions**

### 6.2 Push to GitHub

```bash
git add .
git commit -m "Customize widget"
git push origin main
```

### 6.3 Verify Deployment

1. Wait for GitHub Actions workflow to complete
2. Visit: `https://YOUR_USERNAME.github.io/my-awesome-widget/`
3. You should see remoteEntry.js at: `https://YOUR_USERNAME.github.io/my-awesome-widget/assets/remoteEntry.js`

## Step 7: Add to Dashboard

### 7.1 Update Dashboard Configuration

Add to dashboard's `public/widgets.json`:

```json
{
  "widgets": [
    {
      "id": "my-awesome-widget",
      "name": "My Awesome Widget",
      "url": "https://YOUR_USERNAME.github.io/my-awesome-widget",
      "scope": "myAwesomeWidget",
      "module": "./Widget",
      "props": {
        "title": "Production Widget",
        "apiKey": "your-api-key",
        "refreshInterval": 30000,
        "showDetails": true
      }
    }
  ]
}
```

**Critical**: Ensure `scope` matches `name` in your widget's `vite.config.js`

### 7.2 Test in Dashboard

1. Rebuild dashboard: `npm run build`
2. Open dashboard
3. Your widget should load automatically

## Step 8: Iterate

### 8.1 Make Changes

Edit your widget code locally.

### 8.2 Test Locally

```bash
npm run dev
```

### 8.3 Deploy Updates

```bash
git add .
git commit -m "Update widget"
git push
```

Changes will automatically deploy via GitHub Actions.

### 8.4 Clear Cache (if needed)

If changes don't appear in dashboard:
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Verify new version is deployed (check remoteEntry.js)

## Common Customizations

### Add Third-Party Library

```bash
npm install library-name
```

Then import in your widget:
```jsx
import { something } from 'library-name';
```

### Add Environment Variables

Create `.env.local`:
```
VITE_API_KEY=your-api-key
VITE_API_URL=https://api.example.com
```

Use in code:
```jsx
const apiKey = import.meta.env.VITE_API_KEY;
```

**Important**: Don't commit `.env.local` (it's in .gitignore)

### Add Multiple Widgets

You can expose multiple widgets:

```javascript
// vite.config.js
exposes: {
  './Widget': './src/Widget.jsx',
  './AnotherWidget': './src/AnotherWidget.jsx'
}
```

Then configure in dashboard:
```json
{
  "id": "another-widget",
  "module": "./AnotherWidget",
  ...
}
```

### Customize Development Wrapper

Edit `src/App.jsx` to add more props inputs or change the layout.

## Troubleshooting

### Widget shows old version in dashboard

1. Check GitHub Actions completed successfully
2. Visit widget URL directly to verify deployment
3. Hard refresh dashboard (Ctrl+Shift+R)
4. Check browser console for loading errors

### Props not working

1. Verify props are passed in dashboard's widgets.json
2. Check destructuring in widget component
3. Use console.log(props) to debug
4. Test in development mode first

### Styling conflicts

1. Ensure all CSS classes are prefixed with widget name
2. Avoid using element selectors (div, p, h3)
3. Use specific class names

### Build fails

1. Check Node.js version (should be 20+)
2. Delete node_modules and package-lock.json
3. Run `npm install` again
4. Check for syntax errors

## Next Steps

- Explore the dashboard's ConfigManager to manage widget props dynamically
- Add widget-to-widget communication
- Implement error boundaries within your widget
- Add loading states for better UX
- Write tests for your widget components

## Need Help?

- Check main README.md for general information
- Review example widgets for patterns
- Check Module Federation documentation
- Open an issue in your widget repository
