import { fontes, projeto } from '../dados'

export function Rodape() {
  return (
    <footer className="rodape">
      <div className="conteudo">
        <p className="rodape__projeto">
          {projeto.nome} · {projeto.instituicao}
        </p>
        <p>{fontes}</p>
      </div>
    </footer>
  )
}
