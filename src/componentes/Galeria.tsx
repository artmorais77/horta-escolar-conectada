import { useCallback, useEffect, useRef, useState } from 'react'
import { caminhoFoto, type FotoPlantio } from '../dados'
import { Foto } from './Foto'
import { Icone } from './Icones'

interface Props {
  titulo: string
  /** Frase mostrada acima das fotos. */
  texto?: string
  fotos: FotoPlantio[]
}

export function Galeria({ titulo, texto, fotos }: Props) {
  const arquivos = fotos.map((f) => f.arquivo)
  const [disponiveis, setDisponiveis] = useState<Record<string, boolean>>({})
  const [aberta, setAberta] = useState<number | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)
  const origem = useRef<HTMLButtonElement | null>(null)

  const marcar = useCallback((arquivo: string, ok: boolean) => {
    setDisponiveis((atual) => (atual[arquivo] === ok ? atual : { ...atual, [arquivo]: ok }))
  }, [])

  // Só as fotos que existem entram na navegação do lightbox.
  const comFoto = arquivos.filter((a) => disponiveis[a])

  const abrir = (arquivo: string, botao: HTMLButtonElement) => {
    origem.current = botao
    setAberta(comFoto.indexOf(arquivo))
    dialogo.current?.showModal()
  }
  const fechar = () => dialogo.current?.close()
  const mover = (passo: number) =>
    setAberta((i) => (i === null ? i : (i + passo + comFoto.length) % comFoto.length))

  useEffect(() => {
    const d = dialogo.current
    if (!d) return
    const aoFechar = () => {
      setAberta(null)
      origem.current?.focus()
    }
    d.addEventListener('close', aoFechar)
    return () => d.removeEventListener('close', aoFechar)
  }, [])

  const atual = aberta !== null ? comFoto[aberta] : undefined
  const legenda = atual ? fotos[arquivos.indexOf(atual)].descricao : ''

  return (
    <section className="secao" aria-labelledby="galeria-titulo">
      <h2 id="galeria-titulo">{titulo}</h2>
      {texto && <p className="galeria__texto">{texto}</p>}
      <ul className="galeria">
        {fotos.map((foto, i) => (
          <ItemGaleria
            key={foto.arquivo}
            arquivo={foto.arquivo}
            descricao={foto.descricao}
            numero={i + 1}
            disponivel={!!disponiveis[foto.arquivo]}
            marcar={marcar}
            abrir={abrir}
          />
        ))}
      </ul>

      <dialog
        ref={dialogo}
        className="lightbox"
        aria-label="Foto ampliada"
        onClick={(e) => {
          // Toque fora da foto (no fundo escuro) fecha.
          if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('lightbox__palco')) fechar()
        }}
        onKeyDown={(e) => {
          if (comFoto.length < 2) return
          if (e.key === 'ArrowRight') mover(1)
          if (e.key === 'ArrowLeft') mover(-1)
        }}
      >
        <div className="lightbox__palco">
          {atual && <img src={caminhoFoto('plantio', atual)} alt={legenda} />}
          <button type="button" className="lightbox__botao lightbox__fechar" onClick={fechar} aria-label="Fechar foto ampliada">
            <Icone nome="fechar" />
          </button>
          {comFoto.length > 1 && (
            <>
              <button type="button" className="lightbox__botao lightbox__anterior" onClick={() => mover(-1)} aria-label="Foto anterior">
                <Icone nome="anterior" />
              </button>
              <button type="button" className="lightbox__botao lightbox__proxima" onClick={() => mover(1)} aria-label="Próxima foto">
                <Icone nome="proxima" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </section>
  )
}

interface ItemProps {
  arquivo: string
  descricao: string
  numero: number
  disponivel: boolean
  marcar: (arquivo: string, ok: boolean) => void
  abrir: (arquivo: string, botao: HTMLButtonElement) => void
}

function ItemGaleria({ arquivo, descricao, numero, disponivel, marcar, abrir }: ItemProps) {
  const aoSaber = useCallback((ok: boolean) => marcar(arquivo, ok), [marcar, arquivo])
  return (
    <li>
      <button
        type="button"
        className="galeria__botao"
        disabled={!disponivel}
        aria-label={disponivel ? `Ampliar foto: ${descricao}` : `Foto ${numero} da galeria ainda não adicionada`}
        onClick={(e) => abrir(arquivo, e.currentTarget)}
      >
        <Foto src={caminhoFoto('plantio', arquivo)} alt={descricao} rotuloVazio={`Foto ${numero}`} onDisponivel={aoSaber} />
      </button>
    </li>
  )
}
