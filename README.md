# Dashboard Widget Template

Production-ready template for creating widgets that can be dynamically loaded into the micro-frontend dashboard via Module Federation.

## Quick Start

### 1. Use This Template

Click "Use this template" on GitHub to create your own widget repository.

Or clone and customize:

```bash
git clone https://github.com/YOUR_USERNAME/widget-template.git my-awesome-widget
cd my-awesome-widget
git remote set-url origin https://github.com/YOUR_USERNAME/my-awesome-widget.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Develop Locally

```bash
npm run dev
```

Visit `http://localhost:5173` to see your widget in development mode with an interactive props editor.

### 4. Customize Your Widget

See [CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md) for step-by-step instructions.

## Features

- **React 19.2.0**: Matches dashboard version for compatibility
- **Module Federation**: Ready for dynamic remote loading
- **Two Example Widgets**:
  - BasicWidget: Simple static content with props
  - StatefulWidget: Advanced example with useState, useEffect, localStorage, and API integration
- **Development Mode**: Interactive props editor for testing
- **Auto-deployment**: GitHub Actions workflow included
- **Production-ready**: Optimized build configuration
- **Well-documented**: Comprehensive guides and comments

## Example Widgets Included

### BasicWidget
- Simple component structure
- Props handling
- Scoped CSS styling

### StatefulWidget
- State management with useState
- Side effects with useEffect
- localStorage persistence
- Timer/interval management
- API integration pattern
- Proper cleanup

## Project Structure

```
widget-template/
├── .github/workflows/
│   └── deploy.yml              # Auto-deploy to GitHub Pages
├── src/
│   ├── widgets/
│   │   ├── BasicWidget.jsx     # Simple example
│   │   ├── StatefulWidget.jsx  # Advanced example
│   │   └── *.css               # Widget styles
│   ├── Widget.jsx              # Main entry point (customize this!)
│   ├── App.jsx                 # Development wrapper
│   └── main.jsx                # React entry point
├── vite.config.js              # Vite + Module Federation config
├── package.json
└── README.md
```

## Deployment

### Automatic Deployment (Recommended)

1. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: **GitHub Actions**

2. Push to main branch:
   ```bash
   git add .
   git commit -m "Deploy widget"
   git push
   ```

3. Widget will be available at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### Manual Deployment

```bash
npm run build
# Upload dist/ folder to your hosting service
```

## Adding Widget to Dashboard

Add your widget configuration to the dashboard's `widgets.json`:

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
        "title": "Hello!",
        "message": "Custom message",
        "apiUrl": "https://api.example.com/data"
      }
    }
  ]
}
```

**Important**:
- `scope` must match `name` in `vite.config.js`
- `url` must match your GitHub Pages URL
- `module` must be `"./Widget"`

## Widget Development Best Practices

### 1. CSS Scoping
Always prefix CSS classes with your widget name to avoid conflicts:

```css
/* Good */
.my-widget { }
.my-widget-button { }

/* Bad */
.button { }
h3 { }
```

### 2. Props Validation
Handle missing or invalid props gracefully:

```jsx
export default function Widget(props) {
  const { title = 'Default Title', count = 0 } = props;
  // ...
}
```

### 3. Cleanup
Always clean up side effects:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    // Do something
  }, 1000);

  return () => clearInterval(timer); // Cleanup!
}, []);
```

### 4. Error Handling
Handle errors within your widget:

```jsx
const [error, setError] = useState(null);

if (error) {
  return <div className="widget-error">Error: {error.message}</div>;
}
```

### 5. Performance
- Lazy load heavy dependencies
- Debounce API calls
- Use React.memo for expensive components

## Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Troubleshooting

### Widget doesn't load in dashboard

1. Check browser console for errors
2. Verify URL is accessible (visit directly)
3. Check `scope` matches `name` in vite.config.js
4. Verify `base` path matches repository name

### React version conflicts

Ensure widget uses same React version as dashboard (19.2.0):

```json
{
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  }
}
```

### Assets not loading

Check `base` in vite.config.js matches your repository name:

```javascript
base: '/my-widget/'  // Must match repo name
```

### CORS errors

GitHub Pages handles CORS automatically. If you see errors:
- Verify widget is deployed to GitHub Pages
- Check URL is correct (case-sensitive)
- Clear browser cache

## Advanced Topics

### Widget Communication

Widgets can communicate via custom events:

```jsx
// Emit event
window.dispatchEvent(new CustomEvent('widget-message', {
  detail: { from: 'my-widget', data: { value: 42 } }
}));

// Listen for events
useEffect(() => {
  const handler = (e) => console.log('Received:', e.detail);
  window.addEventListener('widget-message', handler);
  return () => window.removeEventListener('widget-message', handler);
}, []);
```

### Using Third-Party Libraries

Add any npm package:

```bash
npm install axios
npm install date-fns
npm install lodash
```

### TypeScript Support

Convert to TypeScript:

1. Rename files: `.jsx` → `.tsx`
2. Add TypeScript: `npm install -D typescript @types/react @types/react-dom`
3. Add `tsconfig.json`
4. Update imports

## Resources

- [Module Federation Docs](https://module-federation.io/)
- [React 19 Docs](https://react.dev/)
- [Vite Docs](https://vite.dev/)

## License

MIT License - See [LICENSE](./LICENSE) file

## Support

For issues or questions:
- Open an issue in the widget repository
- Check the main dashboard repository
- Review Module Federation documentation
