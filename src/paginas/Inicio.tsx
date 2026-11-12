import { Link } from 'react-router-dom'
import { Cabeca } from '../componentes/Cabeca'
import { ComoFoiOPlantio } from '../componentes/ComoFoiOPlantio'
import { Foto } from '../componentes/Foto'
import { Icone } from '../componentes/Icones'
import { Rodape } from '../componentes/Rodape'
import { corTerra } from '../cores'
import { caminhoFoto, hortalicas, objetivo, projeto, type Hortalica } from '../dados'
import { formatarData, lerData } from '../datas'

export function Inicio() {
  return (
    <>
      <Cabeca
        titulo={`${projeto.nome}: alface, coentro e cebolinha`}
        descricao="Horta escolar com alface, coentro e cebolinha, plantadas pelos alunos em pneus e garrafas PET."
        corTema={corTerra}
      />
      <header className="cabecalho">
        <div className="conteudo">
          <span className="rotulo" aria-hidden="true">
            <Icone nome="broto" tamanho={26} />
          </span>
          <h1 className="cabecalho__titulo">{projeto.nome}</h1>
          <p className="cabecalho__objetivo">{objetivo}</p>
        </div>
      </header>

      <main className="conteudo">
        <section className="card info" aria-label="Sobre o projeto">
          <dl>
            <div className="info__linha">
              <Icone nome="livro" className="info__icone" />
              <div>
                <dt>Disciplina</dt>
                <dd>{projeto.disciplina}</dd>
              </div>
            </div>
            <div className="info__linha">
              <Icone nome="capelo" className="info__icone" />
              <div>
                <dt>Curso</dt>
                <dd>{projeto.curso}</dd>
              </div>
            </div>
            <div className="info__linha">
              <Icone nome="predio" className="info__icone" />
              <div>
                <dt>Instituição</dt>
                <dd>{projeto.instituicao}</dd>
              </div>
            </div>
            <div className="info__linha">
              <Icone nome="broto" className="info__icone" />
              <div>
                <dt>Escola parceira</dt>
                <dd>
                  {projeto.escola}, TURMAS DO {projeto.turmas}
                </dd>
              </div>
            </div>
            <div className="info__linha">
              <Icone nome="calendario" className="info__icone" />
              <div>
                <dt>Plantio</dt>
                <dd>{formatarData(lerData(projeto.dataPlantio))}</dd>
              </div>
            </div>
          </dl>
        </section>

        <section className="secao" aria-labelledby="hortalicas-titulo">
          <h2 id="hortalicas-titulo">Nossas hortaliças</h2>
          <ul className="cards-hortalicas">
            {hortalicas.map((h) => (
              <li key={h.slug}>
                <CardHortalica hortalica={h} />
              </li>
            ))}
          </ul>
        </section>

        <ComoFoiOPlantio />

        <aside className="aviso">
          <Icone nome="qrcode" className="aviso__icone" />
          <p>Está ao lado de um canteiro? Escaneie o QR code da plaquinha para abrir direto a página daquela hortaliça.</p>
        </aside>
      </main>
      <Rodape />
    </>
  )
}

function CardHortalica({ hortalica: h }: { hortalica: Hortalica }) {
  return (
    <Link to={`/${h.slug}/`} className="card card-hortalica" data-hortalica={h.slug}>
      <Foto
        className="card-hortalica__foto"
        src={caminhoFoto(h.slug, h.fotos.capa)}
        alt={`Pé de ${h.nome.toLowerCase()}`}
        rotuloVazio={`Foto de capa: ${h.nome.toLowerCase()}`}
      />
      <div className="card-hortalica__corpo">
        <div>
          <h3 className="card-hortalica__nome">{h.nome}</h3>
          <p className="cientifico">{h.nomeCientifico}</p>
          <span className="selo">Plantada com {h.formaPlantio.toLowerCase()}</span>
        </div>
        <span className="botao-redondo" aria-hidden="true">
          <Icone nome="seta" />
        </span>
      </div>
    </Link>
  )
}
