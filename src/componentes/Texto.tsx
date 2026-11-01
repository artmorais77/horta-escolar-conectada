import { Fragment } from 'react'

/** Mostra um texto em que trechos entre *asteriscos* ficam em itálico. */
export function Texto({ children }: { children: string }) {
  const partes = children.split(/\*([^*]+)\*/g)
  return (
    <>
      {partes.map((parte, i) => (i % 2 === 1 ? <em key={i}>{parte}</em> : <Fragment key={i}>{parte}</Fragment>))}
    </>
  )
}
