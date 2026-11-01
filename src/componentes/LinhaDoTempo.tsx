import { caminhoFoto, type EtapaDiario, type Slug } from '../dados'
import { diasEntre, formatarData, type Dia } from '../datas'
import { Foto } from './Foto'
import { Icone } from './Icones'

export interface EtapaComData extends EtapaDiario {
  dataLida: Dia | null
}

interface Props {
  slug: Slug
  nome: string
  etapas: EtapaComData[]
  hoje: Dia | null
}

export function LinhaDoTempo({ slug, nome, etapas, hoje }: Props) {
  return (
    <section className="secao" aria-labelledby="diario-titulo">
      <h2 id="diario-titulo">Diário de cultivo</h2>
      <ol className="linha">
        {etapas.map((etapa) => {
          // Sem data, ou com data no futuro: etapa ainda "em breve".
          const emBreve = !etapa.dataLida || (hoje !== null && diasEntre(hoje, etapa.dataLida) > 0)
          return (
            <li key={etapa.titulo} className={`linha__etapa${emBreve ? ' linha__etapa--breve' : ''}`}>
              <span className={`linha__marcador${etapa.destaque ? ' linha__marcador--destaque' : ''}`} aria-hidden="true">
                {etapa.destaque && <Icone nome="estrela" tamanho={18} />}
              </span>
              <div className="card linha__card">
                <p className="linha__data">
                  <time dateTime={etapa.dataLida ? isoDe(etapa.dataLida) : undefined}>{formatarData(etapa.dataLida)}</time>
                  {emBreve && <span className="selo selo--breve">em breve</span>}
                </p>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.frase}</p>
                <Foto
                  className="linha__foto"
                  src={caminhoFoto(slug, etapa.foto)}
                  alt={`${nome}: ${etapa.titulo.toLowerCase()}`}
                  rotuloVazio={`Foto: ${etapa.titulo.toLowerCase()}`}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function isoDe(d: Dia) {
  return `${d.ano}-${String(d.mes).padStart(2, '0')}-${String(d.dia).padStart(2, '0')}`
}
