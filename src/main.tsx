import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { CurrentHotfireProvider } from './hotfireContext.tsx'
import { PlaybackProvider } from './playbackContext.tsx'

render(
    <PlaybackProvider>
        <CurrentHotfireProvider>
            <App />
        </CurrentHotfireProvider>
    </PlaybackProvider>,
    document.getElementById('app') as HTMLElement)
