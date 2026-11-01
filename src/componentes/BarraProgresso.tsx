import type { Cultivo } from '../datas'

interface Props {
  cultivo: Cultivo
  cicloDias: number
  /** true quando há data de plantio mas a página ainda está carregando o dia de hoje. */
  carregando: boolean
}

export function BarraProgresso({ cultivo, cicloDias, carregando }: Props) {
  const { dias, porcentagem, pronta } = cultivo
  const diaTexto = dias === null ? (carregando ? '…' : '[X]') : String(dias)
  const legenda = `Dia ${diaTexto} de ${cicloDias} dias previstos até a colheita`
  const valorTexto =
    dias === null ? (carregando ? 'Calculando' : 'Data de plantio ainda não preenchida') : pronta ? `${porcentagem}%, pronta para colher` : `${porcentagem}%`

  return (
    <div className="progresso">
      <div className="progresso__topo">
        <span id="progresso-titulo" className="progresso__titulo">
          {pronta ? 'Pronta para colher' : 'Progresso até a colheita'}
        </span>
        <span className="progresso__porcentagem" aria-hidden="true">
          {dias === null ? '[X]%' : `${porcentagem}%`}
        </span>
      </div>
      <div
        className="progresso__trilha"
        role="progressbar"
        aria-labelledby="progresso-titulo"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentagem}
        aria-valuetext={valorTexto}
      >
        <div className="progresso__preenchimento" style={{ width: `${porcentagem}%` }} />
      </div>
      <p className="progresso__legenda">{legenda}</p>
    </div>
  )
}
