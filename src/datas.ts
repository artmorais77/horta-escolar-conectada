import { useEffect, useState } from 'react'

/** Uma data de calendário, sem hora e sem fuso. */
export interface Dia {
  ano: number
  mes: number
  dia: number
}

export const DATA_VAZIA = '[DD/MM/AAAA]'
const FUSO = 'America/Sao_Paulo'

/** Lê "DD/MM/AAAA". Devolve null se estiver vazia, for o espaço reservado ou for inválida. */
export function lerData(texto: string | undefined): Dia | null {
  const m = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(texto ?? '')
  if (!m) return null
  const d = { dia: Number(m[1]), mes: Number(m[2]), ano: Number(m[3]) }
  const t = new Date(Date.UTC(d.ano, d.mes - 1, d.dia))
  if (t.getUTCFullYear() !== d.ano || t.getUTCMonth() !== d.mes - 1 || t.getUTCDate() !== d.dia) return null
  return d
}

export function formatarData(d: Dia | null): string {
  if (!d) return DATA_VAZIA
  return `${String(d.dia).padStart(2, '0')}/${String(d.mes).padStart(2, '0')}/${d.ano}`
}

/** Data de hoje no horário de Brasília, independente do fuso do aparelho. */
export function hojeEmSaoPaulo(agora = new Date()): Dia {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: FUSO,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(agora)
  const valor = (tipo: string) => Number(partes.find((p) => p.type === tipo)?.value)
  return { ano: valor('year'), mes: valor('month'), dia: valor('day') }
}

/** Diferença em dias inteiros (b − a), contando só o calendário. */
export function diasEntre(a: Dia, b: Dia): number {
  const ms = Date.UTC(b.ano, b.mes - 1, b.dia) - Date.UTC(a.ano, a.mes - 1, a.dia)
  return Math.round(ms / 86_400_000)
}

/**
 * Data de hoje, calculada só no navegador (as páginas são geradas antes,
 * no build, então o servidor não pode saber que dia é hoje).
 * Devolve null até a página carregar.
 */
export function useHoje(): Dia | null {
  const [hoje, setHoje] = useState<Dia | null>(null)
  useEffect(() => {
    setHoje(hojeEmSaoPaulo())
  }, [])
  return hoje
}

export interface Cultivo {
  /** Dias desde o plantio; null se não houver data ou se ainda não carregou. */
  dias: number | null
  /** Porcentagem do ciclo, de 0 a 100. */
  porcentagem: number
  pronta: boolean
}

export function calcularCultivo(plantio: Dia | null, hoje: Dia | null, cicloDias: number): Cultivo {
  if (!plantio || !hoje) return { dias: null, porcentagem: 0, pronta: false }
  const dias = Math.max(0, diasEntre(plantio, hoje))
  const porcentagem = Math.min(100, Math.round((dias / cicloDias) * 100))
  return { dias, porcentagem, pronta: dias >= cicloDias }
}

export function textoDias(n: number | null): string {
  if (n === null) return '[X] dias'
  return n === 1 ? '1 dia' : `${n} dias`
}
