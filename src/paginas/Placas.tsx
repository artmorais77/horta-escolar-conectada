import { BarraSuperior } from '../componentes/BarraSuperior'
import { Cabeca } from '../componentes/Cabeca'
import { Icone } from '../componentes/Icones'
import { Placa } from '../componentes/Placa'
import { Rodape } from '../componentes/Rodape'
import { corTerra } from '../cores'
import { hortalicas, projeto } from '../dados'

export function Placas() {
  return (
    <>
      <Cabeca
        titulo={`Plaquinhas com QR code · ${projeto.nome}`}
        descricao="Plaquinhas A5 com QR code para os vasos de alface, coentro e cebolinha."
        corTema={corTerra}
      />
      <div className="nao-imprimir">
        <BarraSuperior />
      </div>
      <main>
        <div className="conteudo placas__intro nao-imprimir">
          <h1>Plaquinhas</h1>
          <p>Uma plaquinha por folha A5 (retrato). Na janela de impressão, escolha o papel A5 e ative “Gráficos de fundo”, se aparecer.</p>
          <button type="button" className="botao-largo" onClick={() => window.print()}>
            <Icone nome="impressora" />
            Imprimir
          </button>
        </div>
        <div className="placas">
          {hortalicas.map((h) => (
            <Placa key={h.slug} hortalica={h} />
          ))}
        </div>
      </main>
      <div className="nao-imprimir">
        <Rodape />
      </div>
    </>
  )
}
