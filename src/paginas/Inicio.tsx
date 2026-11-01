import { Link } from 'react-router-dom'
import { Cabeca } from '../componentes/Cabeca'
import { Foto } from '../componentes/Foto'
import { Icone } from '../componentes/Icones'
import { Rodape } from '../componentes/Rodape'
import { corTerra } from '../cores'
import { caminhoFoto, hortalicas, objetivo, projeto, type Hortalica } from '../dados'
import { calcularCultivo, formatarData, lerData, textoDias, useHoje, type Dia } from '../datas'

export function Inicio() {
  const hoje = useHoje()
  return (
    <>
      <Cabeca
        titulo={`${projeto.nome}: alface, coentro e cebolinha`}
        descricao="Projeto acadêmico que acompanha e documenta o cultivo de alface, coentro e cebolinha, do plantio até a apresentação."
        corTema={corTerra}
      />
      <header className="cabecalho">
        <div className="conteudo">
          <p className="rotulo">
            <Icone nome="broto" tamanho={20} />
            Projeto acadêmico
          </p>
          <h1 className="cabecalho__titulo">{projeto.nome}</h1>
          <p className="cabecalho__objetivo">{objetivo}</p>
        </div>
      </header>

      <main className="conteudo">
        <section className="card info" aria-label="Sobre o projeto">
          <dl>
            <div className="info__linha">
              <Icone nome="pessoas" className="info__icone" />
              <div>
                <dt>Integrantes</dt>
                <dd>{projeto.integrantes.join(', ')}</dd>
              </div>
            </div>
            <div className="info__linha">
              <Icone nome="livro" className="info__icone" />
              <div>
                <dt>Disciplina · Curso · Instituição</dt>
                <dd>
                  {projeto.disciplina} · {projeto.curso} · {projeto.instituicao}
                </dd>
              </div>
            </div>
            <div className="info__linha">
              <Icone nome="calendario" className="info__icone" />
              <div>
                <dt>Apresentação</dt>
                <dd>{formatarData(lerData(projeto.dataApresentacao))}</dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="secao" aria-labelledby="hortalicas-titulo">
          <h2 id="hortalicas-titulo">Nossas hortaliças</h2>
          <ul className="cards-hortalicas">
            {hortalicas.map((h) => (
              <li key={h.slug}>
                <CardHortalica hortalica={h} hoje={hoje} />
              </li>
            ))}
          </ul>
        </section>

        <aside className="aviso">
          <Icone nome="qrcode" className="aviso__icone" />
          <p>Está ao lado de um vaso? Escaneie o QR code da plaquinha para abrir direto a página daquela hortaliça.</p>
        </aside>
      </main>
      <Rodape />
    </>
  )
}

function CardHortalica({ hortalica: h, hoje }: { hortalica: Hortalica; hoje: Dia | null }) {
  const plantio = lerData(h.dataPlantio)
  const { dias } = calcularCultivo(plantio, hoje, h.cicloDias)
  const rotulo = plantio && dias === null ? '… dias de cultivo' : `${textoDias(dias)} de cultivo`
  return (
    <Link to={`/${h.slug}/`} className="card card-hortalica" data-hortalica={h.slug}>
      <Foto
        className="card-hortalica__foto"
        src={caminhoFoto(h.slug, h.fotos.capa)}
        alt={`Vaso de ${h.nome.toLowerCase()} do projeto`}
        rotuloVazio={`Foto de capa: ${h.nome.toLowerCase()}`}
      />
      <div className="card-hortalica__corpo">
        <div>
          <h3 className="card-hortalica__nome">{h.nome}</h3>
          <p className="cientifico">{h.nomeCientifico}</p>
          <span className="selo">{rotulo}</span>
        </div>
        <span className="botao-redondo" aria-hidden="true">
          <Icone nome="seta" />
        </span>
      </div>
    </Link>
  )
}
