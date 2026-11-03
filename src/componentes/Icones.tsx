import type { ReactNode } from 'react'

/** Ícones de traço (24 × 24), desenhados à mão para o projeto. */
const caminhos = {
  broto: (
    <>
      <path d="M12 21v-9" />
      <path d="M12 12c0-4 2.5-6.5 7-7 0 4.5-2.5 7-7 7z" />
      <path d="M12 14c0-3.5-2.2-5.6-6-6 0 3.7 2.3 6 6 6z" />
      <path d="M8 21h8" />
    </>
  ),
  livro: (
    <>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5z" />
      <path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z" />
    </>
  ),
  capelo: (
    <>
      <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.6v4.2c1.4 1.3 3.3 2 5.5 2s4.1-.7 5.5-2v-4.2" />
      <path d="M21.5 9.5v5" />
    </>
  ),
  predio: (
    <>
      <path d="M3 20.5h18" />
      <path d="M4.5 9.5L12 4l7.5 5.5" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
    </>
  ),
  calendario: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  regua: (
    <>
      <rect x="2.5" y="8" width="19" height="8" rx="1.5" />
      <path d="M6.5 8v3M10 8v4M13.5 8v3M17 8v4" />
    </>
  ),
  gota: <path d="M12 3.5c3.5 4.2 6 7.6 6 10.5a6 6 0 0 1-12 0c0-2.9 2.5-6.3 6-10.5z" />,
  termometro: (
    <>
      <path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0z" />
      <path d="M12 9v6.5" />
    </>
  ),
  camadas: (
    <>
      <path d="M3 9.5c3-1.5 6-1.5 9 0s6 1.5 9 0" />
      <path d="M3 14c3-1.5 6-1.5 9 0s6 1.5 9 0" />
      <path d="M3 18.5c3-1.5 6-1.5 9 0s6 1.5 9 0" />
      <path d="M12 9.5V4" />
      <path d="M12 6c1-1.4 2.3-2 4-2-.3 1.7-1.6 2.6-4 2z" />
    </>
  ),
  sol: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  linhas: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20v-4M12 20v-4M18 20v-4" />
      <path d="M6 16c0-2 1-3 2.5-3.5M12 16c0-2 1-3 2.5-3.5M18 16c0-2 1-3 2.5-3.5" />
      <path d="M3 8h18" strokeDasharray="2 3" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8.2-7.5 9.5-4.3-1.3-7.5-5-7.5-9.5V6z" />
      <path d="M8.8 12.2l2.2 2.2 4.2-4.4" />
    </>
  ),
  pa: (
    <>
      <path d="M14.5 9.5L20 4" />
      <path d="M18.5 2.5l3 3" />
      <path d="M14.8 9.2l-1.6-1.6c-.6-.6-1.5-.6-2.1 0l-5.9 5.9c-1.7 1.7-2 5.8-2 7.4 1.6 0 5.7-.3 7.4-2l5.9-5.9c.6-.6.6-1.5 0-2.1z" />
    </>
  ),
  coracao: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z" />,
  lampada: (
    <>
      <path d="M9 17.5h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2v.2h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5c0-.8.7-1.5 1.5-1.5h2.3l1.5-2.2h5.4l1.5 2.2h2.3c.8 0 1.5.7 1.5 1.5v9c0 .8-.7 1.5-1.5 1.5h-13c-.8 0-1.5-.7-1.5-1.5z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  seta: <path d="M5 12h14M13 6l6 6-6 6" />,
  voltar: <path d="M19 12H5M11 6l-6 6 6 6" />,
  estrela: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
  anterior: <path d="M15 5l-7 7 7 7" />,
  proxima: <path d="M9 5l7 7-7 7" />,
  impressora: (
    <>
      <path d="M7 9V3.5h10V9" />
      <rect x="3.5" y="9" width="17" height="8" rx="2" />
      <path d="M7 14h10v6.5H7z" />
    </>
  ),
  qrcode: (
    <>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1" />
      <path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM14 18.5v2M18.5 14h2" />
    </>
  ),
} satisfies Record<string, ReactNode>

export type NomeIcone = keyof typeof caminhos

interface Props {
  nome: NomeIcone
  tamanho?: number
  className?: string
  /** Texto para leitores de tela; sem ele o ícone é decorativo. */
  rotulo?: string
}

export function Icone({ nome, tamanho = 24, className, rotulo }: Props) {
  return (
    <svg
      className={className}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={rotulo ? 'img' : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
      focusable="false"
    >
      {caminhos[nome]}
    </svg>
  )
}
