import { Link } from 'react-router-dom'
import { BarraSuperior } from '../componentes/BarraSuperior'
import { Cabeca } from '../componentes/Cabeca'
import { FichaTecnica } from '../componentes/FichaTecnica'
import { Foto } from '../componentes/Foto'
import { Galeria } from '../componentes/Galeria'
import { Icone } from '../componentes/Icones'
import { Rodape } from '../componentes/Rodape'
import { Texto } from '../componentes/Texto'
import { corDestaque } from '../cores'
import { caminhoFoto, projeto, type Hortalica } from '../dados'
import { formatarData, lerData } from '../datas'

export function PaginaHortalica({ hortalica: h }: { hortalica: Hortalica }) {
  const plantio = lerData(projeto.dataPlantio)

  return (
    <>
      <Cabeca
        titulo={`${h.nome} (${h.nomeCientifico}) · ${projeto.nome}`}
        descricao={`Fotos do plantio, ficha técnica e curiosidades da ${h.nome.toLowerCase()} (${h.nomeCientifico}) da horta escolar.`}
        corTema={corDestaque[h.slug]}
        hortalica={h.slug}
      />
      <BarraSuperior />

      <main>
        <Foto
          className="capa"
          src={caminhoFoto(h.slug, h.fotos.capa)}
          alt={`Pé de ${h.nome.toLowerCase()}`}
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

          <section className="indicadores" aria-label="Sobre o plantio">
            <div className="card indicador">
              <span className="indicador__rotulo">
                <Icone nome="calendario" tamanho={20} />
                Plantio
              </span>
              <span className={`indicador__valor${plantio ? '' : ' indicador__valor--vazio'}`}>{formatarData(plantio)}</span>
            </div>
            <div className="card indicador">
              <span className="indicador__rotulo">
                <Icone nome="broto" tamanho={20} />
                Plantada com
              </span>
              <span className="indicador__valor">{h.formaPlantio}</span>
            </div>
          </section>

          <Galeria titulo="Fotos do plantio" texto={h.plantio} fotos={h.fotos.galeria} />
          <FichaTecnica itens={h.ficha} />

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
