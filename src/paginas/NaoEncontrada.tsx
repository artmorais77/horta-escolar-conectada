import { Link } from 'react-router-dom'
import { Cabeca } from '../componentes/Cabeca'
import { Icone } from '../componentes/Icones'
import { Rodape } from '../componentes/Rodape'
import { corTerra } from '../cores'
import { projeto } from '../dados'

export function NaoEncontrada() {
  return (
    <>
      <Cabeca titulo={`Página não encontrada · ${projeto.nome}`} descricao="Esta página não existe." corTema={corTerra} />
      <main className="conteudo nao-encontrada">
        <Icone nome="broto" tamanho={56} className="nao-encontrada__icone" />
        <h1>Página não encontrada</h1>
        <p>Este endereço não existe. Talvez o link do QR code esteja incompleto.</p>
        <Link to="/" className="botao-largo">
          Ir para o início
          <Icone nome="seta" />
        </Link>
      </main>
      <Rodape />
    </>
  )
}
