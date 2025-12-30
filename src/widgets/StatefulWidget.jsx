import { useState, useEffect } from 'react';
import './StatefulWidget.css';

/**
 * Stateful Widget Example
 *
 * Demonstrates:
 * - useState for local state management
 * - useEffect for side effects and cleanup
 * - localStorage for persistence
 * - Timer/interval management
 * - API integration pattern
 */
export default function StatefulWidget(props) {
  const {
    initialCount = 0,
    autoIncrement = false,
    apiUrl = null
  } = props;

  // Local state
  const [count, setCount] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('stateful-widget:count');
    return saved ? parseInt(saved, 10) : initialCount;
  });

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save count to localStorage
  useEffect(() => {
    localStorage.setItem('stateful-widget:count', count.toString());
  }, [count]);

  // Auto-increment timer
  useEffect(() => {
    if (!autoIncrement) return;

    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [autoIncrement]);

  // Fetch data from API (example pattern)
  useEffect(() => {
    if (!apiUrl) return;

    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: abort fetch on unmount
    return () => controller.abort();
  }, [apiUrl]);

  const handleIncrement = () => setCount(prev => prev + 1);
  const handleDecrement = () => setCount(prev => prev - 1);
  const handleReset = () => {
    setCount(initialCount);
    localStorage.removeItem('stateful-widget:count');
  };

  return (
    <div className="stateful-widget">
      <h3 className="stateful-widget-title">Stateful Widget</h3>

      {/* Counter Demo */}
      <div className="stateful-widget-counter">
        <h4>Counter: {count}</h4>
        <div className="stateful-widget-buttons">
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <p className="stateful-widget-note">
          {autoIncrement && '(Auto-incrementing) '}
          Count is persisted in localStorage
        </p>
      </div>

      {/* API Data Demo */}
      {apiUrl && (
        <div className="stateful-widget-api">
          <h4>API Data</h4>
          {loading && <p>Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
          {data && (
            <details>
              <summary>View API Response</summary>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </details>
          )}
        </div>
      )}

      {/* Features Info */}
      <div className="stateful-widget-info">
        <p>This widget demonstrates:</p>
        <ul>
          <li>useState for local state</li>
          <li>useEffect for side effects</li>
          <li>localStorage persistence</li>
          <li>Timer management with cleanup</li>
          <li>API integration pattern</li>
          <li>Error handling</li>
        </ul>
      </div>
    </div>
  );
}
