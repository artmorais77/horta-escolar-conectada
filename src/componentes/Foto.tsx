import { useEffect, useRef, useState } from 'react'
import { Icone } from './Icones'

interface Props {
  src: string
  alt: string
  /** Texto do espaço reservado, ex.: "Foto da germinação". */
  rotuloVazio: string
  className?: string
  /** Avisa quando a foto existe (true) ou não (false). */
  onDisponivel?: (disponivel: boolean) => void
}

type Estado = 'carregando' | 'ok' | 'erro'

/**
 * Foto com espaço reservado. O espaço reservado fica sempre por baixo, e a
 * imagem só aparece depois de carregar, então nunca se vê uma imagem quebrada.
 */
export function Foto({ src, alt, rotuloVazio, className, onDisponivel }: Props) {
  const ref = useRef<HTMLImageElement>(null)
  const [estado, setEstado] = useState<Estado>('carregando')

  // A imagem pode ter terminado (ou falhado) antes do React assumir a página.
  useEffect(() => {
    const img = ref.current
    if (img?.complete) setEstado(img.naturalWidth > 0 ? 'ok' : 'erro')
  }, [src])

  useEffect(() => {
    if (estado !== 'carregando') onDisponivel?.(estado === 'ok')
  }, [estado, onDisponivel])

  return (
    <div className={`foto ${className ?? ''}`} data-estado={estado}>
      <div className="foto__vazio" aria-hidden={estado === 'ok'}>
        <Icone nome="camera" tamanho={32} />
        <span>{rotuloVazio}</span>
      </div>
      {estado !== 'erro' && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setEstado('ok')}
          onError={() => setEstado('erro')}
        />
      )}
    </div>
  )
}
