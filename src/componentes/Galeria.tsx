import { useCallback, useEffect, useRef, useState } from 'react'
import { caminhoFoto, type Slug } from '../dados'
import { Foto } from './Foto'
import { Icone } from './Icones'

interface Props {
  slug: Slug
  nome: string
  arquivos: string[]
}

export function Galeria({ slug, nome, arquivos }: Props) {
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
  const legenda = atual ? `Foto ${arquivos.indexOf(atual) + 1} da galeria: ${nome}` : ''

  return (
    <section className="secao" aria-labelledby="galeria-titulo">
      <h2 id="galeria-titulo">Galeria de fotos</h2>
      <ul className="galeria">
        {arquivos.map((arquivo, i) => (
          <ItemGaleria
            key={arquivo}
            slug={slug}
            nome={nome}
            arquivo={arquivo}
            numero={i + 1}
            disponivel={!!disponiveis[arquivo]}
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
          {atual && <img src={caminhoFoto(slug, atual)} alt={legenda} />}
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
  slug: Slug
  nome: string
  arquivo: string
  numero: number
  disponivel: boolean
  marcar: (arquivo: string, ok: boolean) => void
  abrir: (arquivo: string, botao: HTMLButtonElement) => void
}

function ItemGaleria({ slug, nome, arquivo, numero, disponivel, marcar, abrir }: ItemProps) {
  const aoSaber = useCallback((ok: boolean) => marcar(arquivo, ok), [marcar, arquivo])
  return (
    <li>
      <button
        type="button"
        className="galeria__botao"
        disabled={!disponivel}
        aria-label={disponivel ? `Ampliar foto ${numero} da galeria` : `Foto ${numero} da galeria ainda não adicionada`}
        onClick={(e) => abrir(arquivo, e.currentTarget)}
      >
        <Foto src={caminhoFoto(slug, arquivo)} alt={`Foto ${numero} da galeria: ${nome}`} rotuloVazio={`Foto ${numero}`} onDisponivel={aoSaber} />
      </button>
    </li>
  )
}
