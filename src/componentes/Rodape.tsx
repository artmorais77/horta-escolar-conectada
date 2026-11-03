import { fontes, projeto } from '../dados'

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="conteudo">
        <p className="rodape__projeto">{projeto.nome}</p>
        <p className="rodape__instituicao">{projeto.instituicao}</p>
        <p className="rodape__fontes">{fontes}</p>
      </div>
    </footer>
  )
}
