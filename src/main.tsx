import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

/**
 * No StrictMode here on purpose: its double-invoked effects would create and
 * tear down a second WebGL context on every mount, which on some drivers costs
 * more than the first frame budget we're trying to protect.
 */
const container = document.getElementById('root');
if (!container) throw new Error('Missing #root');

createRoot(container).render(<App />);
