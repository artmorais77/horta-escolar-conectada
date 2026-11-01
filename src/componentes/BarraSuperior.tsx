import { Link } from 'react-router-dom'
import { projeto } from '../dados'
import { Icone } from './Icones'

export function BarraSuperior() {
  return (
    <header className="barra-superior">
      <nav className="conteudo barra-superior__nav" aria-label="Navegação principal">
        <Link to="/" className="barra-superior__voltar">
          <Icone nome="voltar" tamanho={20} />
          Início
        </Link>
        <span className="barra-superior__projeto">{projeto.nome}</span>
      </nav>
    </header>
  )
}
