import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { CurrentHotfireProvider } from './context.tsx'

render(<CurrentHotfireProvider>
    <App />
</CurrentHotfireProvider>,
    document.getElementById('app') as HTMLElement)
