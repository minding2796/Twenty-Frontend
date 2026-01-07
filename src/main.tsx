import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './components/Header'
import Footer from './components/Footer'

const showHeader = window.location.href !== 'https://twenty.thinkinggms.com/login-game';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {(showHeader ? <Header/> : <></>)}
        <main className={(showHeader ? "show-header" : "")}>
            <App/>
        </main>
        {(showHeader ? <Footer/> : <></>)}
    </StrictMode>,
)
