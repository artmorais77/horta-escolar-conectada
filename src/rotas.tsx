import type { RouteRecord } from 'vite-react-ssg'
import { hortalicas } from './dados'
import { Inicio } from './paginas/Inicio'
import { NaoEncontrada } from './paginas/NaoEncontrada'
import { PaginaHortalica } from './paginas/PaginaHortalica'
import { Placas } from './paginas/Placas'
import { RolarAoTopo } from './componentes/RolarAoTopo'

export const rotas: RouteRecord[] = [
  {
    path: '/',
    element: <RolarAoTopo />,
    children: [
      { index: true, element: <Inicio /> },
      ...hortalicas.map((h) => ({ path: `${h.slug}/`, element: <PaginaHortalica hortalica={h} /> })),
      { path: 'placas/', element: <Placas /> },
      { path: '*', element: <NaoEncontrada /> },
    ],
  },
]
