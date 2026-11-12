import { caminhoFoto, etapasPlantio } from '../dados'
import { Foto } from './Foto'

export function ComoFoiOPlantio() {
  return (
    <section className="secao" aria-labelledby="plantio-titulo">
      <h2 id="plantio-titulo">Como foi o plantio</h2>
      <ol className="linha">
        {etapasPlantio.map((etapa, i) => (
          <li key={etapa.titulo} className="linha__etapa">
            <span className="linha__marcador" aria-hidden="true">
              {i + 1}
            </span>
            <div className="card linha__card">
              <h3>{etapa.titulo}</h3>
              <p>{etapa.texto}</p>
              <div className="linha__fotos">
                {etapa.fotos.map((foto) => (
                  <figure key={foto.arquivo} className="linha__figura">
                    <Foto
                      className="linha__foto"
                      src={caminhoFoto('plantio', foto.arquivo)}
                      alt={foto.descricao}
                      rotuloVazio="Foto do plantio"
                    />
                    {foto.legenda && <figcaption className="linha__legenda">{foto.legenda}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
