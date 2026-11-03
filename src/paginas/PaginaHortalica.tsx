import { Link } from 'react-router-dom'
import { BarraProgresso } from '../componentes/BarraProgresso'
import { BarraSuperior } from '../componentes/BarraSuperior'
import { Cabeca } from '../componentes/Cabeca'
import { FichaTecnica } from '../componentes/FichaTecnica'
import { Foto } from '../componentes/Foto'
import { Galeria } from '../componentes/Galeria'
import { Icone } from '../componentes/Icones'
import { LinhaDoTempo, type EtapaComData } from '../componentes/LinhaDoTempo'
import { Rodape } from '../componentes/Rodape'
import { Texto } from '../componentes/Texto'
import { corDestaque } from '../cores'
import { caminhoFoto, projeto, type Hortalica } from '../dados'
import { calcularCultivo, formatarData, lerData, textoDias, useHoje } from '../datas'

export function PaginaHortalica({ hortalica: h }: { hortalica: Hortalica }) {
  const hoje = useHoje()
  const plantio = lerData(h.dataPlantio)
  const cultivo = calcularCultivo(plantio, hoje, h.cicloDias)
  const carregando = plantio !== null && hoje === null

  const etapas: EtapaComData[] = h.diario.map((etapa, i) => {
    let dataLida = lerData(etapa.data)
    // A semeadura sem data usa a data de plantio.
    if (!dataLida && i === 0) dataLida = plantio
    return { ...etapa, dataLida }
  })

  return (
    <>
      <Cabeca
        titulo={`${h.nome} (${h.nomeCientifico}) · ${projeto.nome}`}
        descricao={`Diário de cultivo, fotos, ficha técnica e curiosidades da ${h.nome.toLowerCase()} (${h.nomeCientifico}) do nosso projeto acadêmico.`}
        corTema={corDestaque[h.slug]}
        hortalica={h.slug}
      />
      <BarraSuperior />

      <main>
        <Foto
          className="capa"
          src={caminhoFoto(h.slug, h.fotos.capa)}
          alt={`Vaso de ${h.nome.toLowerCase()} do projeto`}
          rotuloVazio={`Foto de capa: ${h.nome.toLowerCase()}`}
        />

        <div className="conteudo">
          <section className="apresentacao" aria-labelledby="nome-hortalica">
            <span className="selo selo--familia">{h.familia}</span>
            <h1 id="nome-hortalica" className="apresentacao__nome">
              {h.nome}
            </h1>
            <p className="cientifico apresentacao__cientifico">{h.nomeCientifico}</p>
            <p className="apresentacao__origem">{h.origem}</p>
          </section>

          <section className="indicadores" aria-label="Indicadores do cultivo">
            <div className="card indicador">
              <span className="indicador__rotulo">
                <Icone nome="calendario" tamanho={20} />
                Plantio
              </span>
              <span className={`indicador__valor${plantio ? '' : ' indicador__valor--vazio'}`}>{formatarData(plantio)}</span>
            </div>
            <div className="card indicador">
              <span className="indicador__rotulo">
                <Icone nome="relogio" tamanho={20} />
                Dias de cultivo
              </span>
              <span className="indicador__valor">{carregando ? '…' : textoDias(cultivo.dias)}</span>
            </div>
            <div className="card indicador indicador--largo">
              <BarraProgresso cultivo={cultivo} cicloDias={h.cicloDias} carregando={carregando} />
            </div>
          </section>

          <FichaTecnica itens={h.ficha} />
          <LinhaDoTempo slug={h.slug} nome={h.nome} etapas={etapas} hoje={hoje} />
          <Galeria slug={h.slug} nome={h.nome} arquivos={h.fotos.galeria} />

          <section className="card bloco nutricao" aria-labelledby="nutricao-titulo">
            <h2 id="nutricao-titulo" className="bloco__titulo">
              <span className="quadrado-icone">
                <Icone nome="coracao" />
              </span>
              Nutrição e benefícios
            </h2>
            {h.nutricao.introducao && <p>{h.nutricao.introducao}</p>}
            <ul className="selos">
              {h.nutricao.selos.map((s) => (
                <li key={s} className="selo">
                  {s}
                </li>
              ))}
            </ul>
            {h.nutricao.frase && <p>{h.nutricao.frase}</p>}
          </section>

          <section className="bloco voce-sabia" aria-labelledby="sabia-titulo">
            <h2 id="sabia-titulo" className="bloco__titulo">
              <Icone nome="lampada" tamanho={28} />
              Você sabia?
            </h2>
            {h.voceSabia.map((frase) => (
              <p key={frase}>
                <Texto>{frase}</Texto>
              </p>
            ))}
          </section>

          <Link to="/" className="botao-largo">
            Ver todas as hortaliças
            <Icone nome="seta" />
          </Link>
        </div>
      </main>
      <Rodape />
    </>
  )
}
