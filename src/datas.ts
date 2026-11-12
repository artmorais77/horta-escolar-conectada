/** Uma data de calendário, sem hora e sem fuso. */
export interface Dia {
  ano: number
  mes: number
  dia: number
}

export const DATA_VAZIA = '[DD/MM/AAAA]'

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
