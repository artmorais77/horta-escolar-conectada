import { Head } from 'vite-react-ssg'

interface Props {
  titulo: string
  descricao: string
  corTema: string
  hortalica?: string
}

/** <title>, descrição, cor do navegador e o atributo data-hortalica do <body>. */
export function Cabeca({ titulo, descricao, corTema, hortalica }: Props) {
  return (
    <Head>
      <html lang="pt-BR" />
      <body data-hortalica={hortalica ?? 'nenhuma'} />
      <title>{titulo}</title>
      <meta name="description" content={descricao} />
      <meta name="theme-color" content={corTema} />
    </Head>
  )
}
