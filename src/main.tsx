import { ViteReactSSG } from 'vite-react-ssg'
import { rotas } from './rotas'
import './estilo.css'

export const createRoot = ViteReactSSG({ routes: rotas, basename: import.meta.env.BASE_URL })
