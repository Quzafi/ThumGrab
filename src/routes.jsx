import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import GuidesIndex from './pages/guides/GuidesIndex.jsx'
import HowToDownload from './pages/guides/HowToDownload.jsx'
import ThumbnailSizes from './pages/guides/ThumbnailSizes.jsx'
import MakeGoodThumbnails from './pages/guides/MakeGoodThumbnails.jsx'
import ChannelDna from './pages/ChannelDna.jsx'
import AiTitlePage from './pages/AiTitlePage.jsx'
import AbTestPage from './pages/AbTestPage.jsx'
import BatchPage from './pages/BatchPage.jsx'
import Faq from './pages/Faq.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Disclaimer from './pages/Disclaimer.jsx'
import NotFound from './pages/NotFound.jsx'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dna', element: <ChannelDna /> },
      { path: 'title-generator', element: <AiTitlePage /> },
      { path: 'ab-test', element: <AbTestPage /> },
      { path: 'batch', element: <BatchPage /> },
      { path: 'guides', element: <GuidesIndex /> },
      {
        path: 'guides/how-to-download-youtube-thumbnails',
        element: <HowToDownload />,
      },
      { path: 'guides/youtube-thumbnail-sizes', element: <ThumbnailSizes /> },
      { path: 'guides/how-to-make-good-thumbnails', element: <MakeGoodThumbnails /> },
      { path: 'faq', element: <Faq /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'privacy-policy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'disclaimer', element: <Disclaimer /> },
      // Explicit /404 so the SSG emits dist/404.html (GitHub Pages / S3 / CDN
      // convention). The catch-all below handles unknown routes at runtime.
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
