import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { CurrentHotfireProvider } from './hotfireContext.tsx'
import { PlaybackProvider } from './playbackContext.tsx'

render(
    <CurrentHotfireProvider>
        <PlaybackProvider>
            <App />
        </PlaybackProvider>
    </CurrentHotfireProvider>,
    document.getElementById('app') as HTMLElement)
