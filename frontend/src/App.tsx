import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

const HomePage = lazy(() => import('./pages/HomePage'))
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'))
const PoemDetailPage = lazy(() => import('./pages/PoemDetailPage'))
const CollectionPage = lazy(() => import('./pages/CollectionPage'))
const ChallengePage = lazy(() => import('./pages/ChallengePage'))

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="text-text-2 text-sm">加载中...</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg text-text font-body">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/poem/:id" element={<PoemDetailPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#f5f0e8',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
