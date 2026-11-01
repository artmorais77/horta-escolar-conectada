/*
 * ============================================================
 *  DADOS DO SITE: tudo o que vocês precisam editar está aqui.
 * ============================================================
 *
 *  - Datas: escrevam no formato brasileiro, "DD/MM/AAAA" (ex.: "15/09/2026").
 *    Enquanto a data não for preenchida, o site mostra "[DD/MM/AAAA]".
 *  - Fotos: coloquem os arquivos em public/fotos/<hortaliça>/ com os nomes
 *    listados abaixo. Foto que ainda não existe vira um espaço reservado.
 *  - Textos entre *asteriscos* aparecem em itálico.
 */

import type { NomeIcone } from './componentes/Icones'

export type Slug = 'alface' | 'coentro' | 'cebolinha'

export interface Projeto {
  nome: string
  integrantes: string[]
  disciplina: string
  curso: string
  instituicao: string
  /** "DD/MM/AAAA" */
  dataApresentacao: string
  /**
   * Endereço completo do site publicado, terminando em "/".
   * Ex.: "https://usuario.github.io/horta/". Usado nos QR codes das plaquinhas.
   * Enquanto estiver vazio, as plaquinhas mostram um espaço tracejado.
   */
  urlBase: string
}

export interface ItemFicha {
  icone: NomeIcone
  titulo: string
  texto: string
}

export interface EtapaDiario {
  titulo: string
  /** "DD/MM/AAAA". Na semeadura, se ficar vazio, usa a data de plantio; no dia da apresentação, usa a data da apresentação. */
  data: string
  frase: string
  /** Nome do arquivo em public/fotos/<hortaliça>/ */
  foto: string
  /** Marca a última etapa com estrela. */
  destaque?: boolean
}

export interface Hortalica {
  slug: Slug
  nome: string
  nomeCientifico: string
  /** Texto do selo, ex.: "Família Asteraceae" */
  familia: string
  origem: string
  /** Dias previstos do plantio até a colheita (usado na barra de progresso). */
  cicloDias: number
  /** "DD/MM/AAAA" */
  dataPlantio: string
  ficha: ItemFicha[]
  nutricao: {
    introducao?: string
    selos: string[]
    frase?: string
  }
  voceSabia: string[]
  diario: EtapaDiario[]
  fotos: {
    capa: string
    galeria: string[]
  }
}

// ------------------------------------------------------------
//  Projeto
// ------------------------------------------------------------

export const projeto: Projeto = {
  nome: '[NOME DO PROJETO]',
  integrantes: ['[NOMES DOS INTEGRANTES]'],
  disciplina: '[DISCIPLINA]',
  curso: '[CURSO]',
  instituicao: '[INSTITUIÇÃO]',
  dataApresentacao: '[DD/MM/AAAA]',
  urlBase: '',
}

export const objetivo =
  'Acompanhamos e documentamos o cultivo de três hortaliças, do plantio até a apresentação. Cada vaso tem um QR code que leva à página da sua planta, com diário, fotos e curiosidades.'

export const fontes = 'Fontes: Embrapa Hortaliças, Embrapa Semiárido e artigos científicos'

// ------------------------------------------------------------
//  Diário e fotos (padrão, igual para as três hortaliças)
// ------------------------------------------------------------

/** Fotos da galeria: galeria-01.jpg, galeria-02.jpg... Aumentem ou diminuam a lista à vontade. */
const galeriaPadrao = ['galeria-01.jpg', 'galeria-02.jpg', 'galeria-03.jpg', 'galeria-04.jpg', 'galeria-05.jpg', 'galeria-06.jpg']

interface DatasDiario {
  /** Vazia = usa a data de plantio. */
  semeadura: string
  germinacao: string
  primeirasFolhas: string
  crescimento: string
  /** Vazia = usa a data da apresentação do projeto. */
  apresentacao: string
}

function diario(datas: DatasDiario, frases: { primeirasFolhas: string; crescimento: string }): EtapaDiario[] {
  return [
    { titulo: 'Semeadura', data: datas.semeadura, frase: 'As sementes foram colocadas no vaso.', foto: 'semeadura.jpg' },
    { titulo: 'Germinação', data: datas.germinacao, frase: 'Os primeiros brotos apareceram na terra.', foto: 'germinacao.jpg' },
    { titulo: 'Primeiras folhas', data: datas.primeirasFolhas, frase: frases.primeirasFolhas, foto: 'primeiras-folhas.jpg' },
    { titulo: 'Crescimento', data: datas.crescimento, frase: frases.crescimento, foto: 'crescimento.jpg' },
    { titulo: 'Dia da apresentação', data: datas.apresentacao, frase: 'O resultado final do nosso cultivo.', foto: 'apresentacao.jpg', destaque: true },
  ]
}

// ------------------------------------------------------------
//  Hortaliças
// ------------------------------------------------------------

export const hortalicas: Hortalica[] = [
  {
    slug: 'alface',
    nome: 'Alface',
    nomeCientifico: 'Lactuca sativa',
    familia: 'Família Asteraceae',
    origem:
      'Originária da Ásia, chegou ao Brasil com os portugueses no século 16. Os egípcios já a cultivavam por volta de 4.500 a.C.',
    cicloDias: 45,
    dataPlantio: '[DD/MM/AAAA]',
    ficha: [
      { icone: 'calendario', titulo: 'Ciclo', texto: '35 a 45 dias (mais curto no calor)' },
      { icone: 'regua', titulo: 'Espaçamento', texto: '25 × 25 cm' },
      { icone: 'gota', titulo: 'Rega', texto: 'Diária' },
      { icone: 'termometro', titulo: 'Temperatura', texto: 'Tolera de 6 a 30 °C; prefere clima ameno' },
      { icone: 'camadas', titulo: 'Solo', texto: 'Areno-argiloso, rico em matéria orgânica' },
    ],
    nutricao: {
      selos: ['Vitamina A', 'Vitamina C', 'Ferro', 'Fósforo'],
      frase: 'Tem cerca de 96% de água, por isso ajuda na hidratação.',
    },
    voceSabia: [
      'É a folhosa mais consumida do Brasil, e a crespa tem a preferência de 70% do mercado.',
      'As folhas externas, mais escuras, têm muito mais pró-vitamina A que as internas.',
    ],
    diario: diario(
      // Datas de cada etapa do diário ("DD/MM/AAAA")
      { semeadura: '', germinacao: '[DD/MM/AAAA]', primeirasFolhas: '[DD/MM/AAAA]', crescimento: '[DD/MM/AAAA]', apresentacao: '' },
      {
        primeirasFolhas: 'Surgiram as primeiras folhas verdadeiras.',
        crescimento: 'A planta ganhou volume e novas folhas.',
      },
    ),
    fotos: { capa: 'capa.jpg', galeria: galeriaPadrao },
  },
  {
    slug: 'coentro',
    nome: 'Coentro',
    nomeCientifico: 'Coriandrum sativum',
    familia: 'Família Apiaceae',
    origem: 'Da mesma família da salsa e da cenoura, é originário da região mediterrânea.',
    cicloDias: 55,
    dataPlantio: '[DD/MM/AAAA]',
    ficha: [
      { icone: 'calendario', titulo: 'Ciclo', texto: '40 a 55 dias para folhas (até 120 dias para sementes)' },
      { icone: 'sol', titulo: 'Clima', texto: 'Gosta de calor, acima de 25 °C' },
      { icone: 'camadas', titulo: 'Solo', texto: 'pH perto de 6,0' },
      { icone: 'linhas', titulo: 'Semeadura', texto: 'Em linhas espaçadas de 20 cm' },
      { icone: 'escudo', titulo: 'Resistência', texto: 'Planta rústica, com poucas doenças' },
    ],
    nutricao: {
      introducao: 'Uma fonte de:',
      selos: ['Ferro', 'Vitamina C', 'Provitamina A', 'Vitaminas do complexo B'],
    },
    voceSabia: [
      'O nome vem do grego *kóris*, que significa percevejo, por causa do aroma forte das folhas.',
      'É muito importante para a agricultura familiar do Nordeste.',
    ],
    diario: diario(
      // Datas de cada etapa do diário ("DD/MM/AAAA")
      { semeadura: '', germinacao: '[DD/MM/AAAA]', primeirasFolhas: '[DD/MM/AAAA]', crescimento: '[DD/MM/AAAA]', apresentacao: '' },
      {
        primeirasFolhas: 'Surgiram as primeiras folhas verdadeiras.',
        crescimento: 'A planta ganhou volume e novas folhas.',
      },
    ),
    fotos: { capa: 'capa.jpg', galeria: galeriaPadrao },
  },
  {
    slug: 'cebolinha',
    nome: 'Cebolinha',
    nomeCientifico: 'Allium fistulosum',
    familia: 'Família das Aliáceas',
    origem: 'Da mesma família da cebola, é originária da Sibéria.',
    cicloDias: 100,
    dataPlantio: '[DD/MM/AAAA]',
    ficha: [
      { icone: 'broto', titulo: 'Germinação', texto: 'Em 7 a 15 dias' },
      { icone: 'pa', titulo: 'Transplante', texto: 'Entre 30 e 40 dias, com mudas de cerca de 15 cm' },
      { icone: 'calendario', titulo: 'Colheita', texto: '85 a 100 dias após a semeadura (ou 55 a 60 dias após o plantio de mudas)' },
      { icone: 'regua', titulo: 'Ponto de colheita', texto: 'Folhas com 20 a 40 cm' },
      { icone: 'termometro', titulo: 'Temperatura ideal', texto: 'De 8 a 22 °C' },
    ],
    nutricao: {
      selos: ['Estimula o apetite', 'Auxilia na digestão'],
      frase: 'A cebolinha pode estimular o apetite e auxiliar na digestão.',
    },
    voceSabia: [
      'Se for cortada a uns 2 cm do solo, ela rebrota e permite várias colheitas.',
      'As folhas são tubulares e a planta cresce em touceira.',
    ],
    diario: diario(
      // Datas de cada etapa do diário ("DD/MM/AAAA")
      { semeadura: '', germinacao: '[DD/MM/AAAA]', primeirasFolhas: '[DD/MM/AAAA]', crescimento: '[DD/MM/AAAA]', apresentacao: '' },
      {
        primeirasFolhas: 'Surgiram as primeiras folhas, finas e tubulares.',
        crescimento: 'A touceira ganhou volume e novas folhas.',
      },
    ),
    fotos: { capa: 'capa.jpg', galeria: galeriaPadrao },
  },
]

/** Endereço base das fotos (já considera o subdiretório do GitHub Pages). */
export function caminhoFoto(slug: Slug, arquivo: string): string {
  return `${import.meta.env.BASE_URL}fotos/${slug}/${arquivo}`
}
