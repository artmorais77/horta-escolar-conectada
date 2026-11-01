import type { ItemFicha } from '../dados'
import { Icone } from './Icones'

export function FichaTecnica({ itens }: { itens: ItemFicha[] }) {
  return (
    <section className="secao" aria-labelledby="ficha-titulo">
      <h2 id="ficha-titulo">Ficha técnica</h2>
      <ul className="ficha">
        {itens.map((item) => (
          <li key={item.titulo} className="card ficha__item">
            <span className="quadrado-icone">
              <Icone nome={item.icone} />
            </span>
            <div>
              <h3>{item.titulo}</h3>
              <p>{item.texto}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
