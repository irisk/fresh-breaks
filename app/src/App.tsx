import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './components/Splash'

const Home = lazy(() => import('./pages/Home'))
const BreathingPicker = lazy(() => import('./pages/BreathingPicker'))
const Breathing = lazy(() => import('./pages/Breathing'))
const Reflection = lazy(() => import('./pages/Reflection'))
const ConversationStarter = lazy(() => import('./pages/ConversationStarter'))
const GratitudeRipples = lazy(() => import('./pages/GratitudeRipples'))
const SoundScape = lazy(() => import('./pages/SoundScape'))
const NatureVideo = lazy(() => import('./pages/NatureVideo'))
const Done = lazy(() => import('./pages/Done'))

function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--fb-white)',
        fontFamily: 'var(--fb-font-body)',
        color: 'var(--fb-text-1)',
      }}
    >
      <Splash />
      <div className="mx-auto max-w-md min-h-dvh">
        <Suspense fallback={<div className="min-h-dvh" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breathing" element={<BreathingPicker />} />
            <Route path="/breathing/:id" element={<Breathing />} />
            <Route path="/reflection" element={<Reflection />} />
            <Route path="/conversation" element={<ConversationStarter />} />
            <Route path="/gratitude" element={<GratitudeRipples />} />
            <Route path="/sounds" element={<SoundScape />} />
            <Route path="/video" element={<NatureVideo />} />
            <Route path="/done" element={<Done />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
