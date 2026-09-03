import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'
import './index.css'

// vite-react-ssg prerenders every static route to HTML (great for SEO/AdSense)
// and hydrates into a normal React SPA on the client.
export const createRoot = ViteReactSSG({ routes })
