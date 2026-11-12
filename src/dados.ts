/*
 * ============================================================
 *  DADOS DO SITE: tudo o que vocês precisam editar está aqui.
 * ============================================================
 *
 *  - Datas: escrevam no formato brasileiro, "DD/MM/AAAA" (ex.: "15/09/2026").
 *  - Fotos do plantio: ficam em public/fotos/plantio/. A capa de cada
 *    hortaliça fica em public/fotos/<hortaliça>/capa.jpg.
 *  - Textos entre *asteriscos* aparecem em itálico.
 */

import type { NomeIcone } from './componentes/Icones'

export type Slug = 'alface' | 'coentro' | 'cebolinha'

export interface Projeto {
  nome: string
  disciplina: string
  curso: string
  instituicao: string
  escola: string
  turmas: string
  /** "DD/MM/AAAA" */
  dataPlantio: string
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

/** Uma foto de public/fotos/plantio/. */
export interface FotoPlantio {
  arquivo: string
  /** Descrição da foto (leitores de tela e legenda da foto ampliada). */
  descricao: string
  /** Legenda curta mostrada embaixo da foto, na linha do tempo. */
  legenda?: string
}

export interface EtapaPlantio {
  titulo: string
  texto: string
  fotos: FotoPlantio[]
}

export interface Hortalica {
  slug: Slug
  nome: string
  nomeCientifico: string
  /** Texto do selo, ex.: "Família Asteraceae" */
  familia: string
  origem: string
  /** Como foi plantada, ex.: "Sementes" ou "Mudas". */
  formaPlantio: string
  /** Frase sobre o plantio, mostrada acima das fotos. */
  plantio: string
  ficha: ItemFicha[]
  nutricao: {
    introducao?: string
    selos: string[]
    frase?: string
  }
  voceSabia: string[]
  fotos: {
    /** Arquivo em public/fotos/<hortaliça>/ */
    capa: string
    galeria: FotoPlantio[]
  }
}

// ------------------------------------------------------------
//  Projeto
// ------------------------------------------------------------

export const projeto: Projeto = {
  nome: 'HORTA ESCOLAR CONECTADA',
  disciplina: 'INTEGRAÇÃO, ENSINO, PRÁTICA E COMUNIDADE',
  curso: 'TECNOLOGIA EM GESTÃO DO AGRONEGÓCIO',
  instituicao: 'FACULDADE VALE DO AÇO - FAVALE',
  escola: 'ESCOLA MUNICIPAL JURGLEIDE ALVES SAMPAIO - AÇAILÂNDIA (MA)',
  turmas: '6º ANO A E B',
  dataPlantio: '10/11/2026',
  urlBase: 'https://artmorais77.github.io/horta-escolar-conectada/',
}

export const objetivo =
  'Implantamos uma horta com as turmas do 6º ano, reaproveitando pneus e garrafas PET. Cada canteiro tem um QR code que leva à página da sua hortaliça, com fotos do plantio, ficha técnica e curiosidades.'

export const fontes = 'Fontes: Embrapa Hortaliças, Embrapa Semiárido e artigos científicos'

// ------------------------------------------------------------
//  Como foi o plantio (página inicial)
// ------------------------------------------------------------

export const etapasPlantio: EtapaPlantio[] = [
  {
    titulo: 'Escolha do local',
    texto:
      'Na área externa da escola, verificamos a luz do sol, a água disponível para irrigação e o espaço para os canteiros e vasos.',
    fotos: [{ arquivo: 'escolha-do-local.jpg', descricao: 'Área externa da escola escolhida para a horta, antes do plantio' }],
  },
  {
    titulo: 'Palestra educativa',
    texto:
      'Antes de plantar, as turmas aprenderam o que é uma horta, como as plantas se desenvolvem, como cuidar delas e por que as hortaliças são importantes na alimentação.',
    fotos: [{ arquivo: 'palestra.jpg', descricao: 'Equipe apresenta a palestra para a turma na sala de aula' }],
  },
  {
    titulo: 'Preparação do substrato',
    texto: 'Os alunos ajudaram a misturar terra e adubo e entenderam a importância dos nutrientes para o crescimento das plantas.',
    fotos: [
      { arquivo: 'turma-reunida.jpg', descricao: 'Alunos reunidos debaixo da mangueira, acompanhando o preparo do substrato' },
      { arquivo: 'alunos-preparam-substrato.jpg', descricao: 'Aluno enche o balde de substrato, acompanhado pela equipe' },
    ],
  },
  {
    titulo: 'Pneus e garrafas PET',
    texto: 'Os pneus viraram canteiros e as garrafas PET viraram vasos, dando novo uso a materiais que seriam descartados.',
    fotos: [
      { arquivo: 'garrafas-pet.jpg', descricao: 'Equipe e alunos enchem garrafas PET com substrato' },
      { arquivo: 'aluno-enche-pneu.jpg', descricao: 'Aluno despeja substrato do balde dentro de um pneu' },
    ],
  },
  {
    titulo: 'Plantio',
    texto: 'Os alunos plantaram as mudas de cebolinha e semearam a alface e o coentro.',
    fotos: [
      { arquivo: 'plantio-de-mudas.jpg', descricao: 'Aluna e equipe abrem covas no pneu, ao lado das mudas de cebolinha', legenda: 'Preparação das covas' },
      { arquivo: 'alunas-preparam-pneu.jpg', descricao: 'Alunas plantam no pneu', legenda: 'Plantio das hortaliças' },
      { arquivo: 'aluna-semeia-2.jpg', descricao: 'Aluna semeia e cobre as sementes no pneu', legenda: 'Cobertura das sementes com substrato' },
      { arquivo: 'semeadura-garrafa-pet.jpg', descricao: 'Semeadura em uma garrafa PET com substrato', legenda: 'Semeadura nas garrafas PET' },
    ],
  },
  {
    titulo: 'Identificação com QR codes',
    texto: 'Cada canteiro recebeu uma plaquinha com QR code que leva à página da sua hortaliça.',
    fotos: [
      { arquivo: 'canteiros-com-placas.jpg', descricao: 'Fileira de pneus plantados, cada um com sua plaquinha de QR code' },
      { arquivo: 'cebolinha-com-placa.jpg', descricao: 'Pneu com a cebolinha já brotando e a plaquinha de QR code' },
    ],
  },
]

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
    formaPlantio: 'Sementes',
    plantio: 'A alface foi semeada direto nos pneus. Os alunos espalharam as sementes e cobriram com uma camada fina de substrato.',
    ficha: [
      { icone: 'calendario', titulo: 'Ciclo', texto: '50 a 80 dias da semeadura à colheita (mais curto no calor)' },
      { icone: 'regua', titulo: 'Espaçamento', texto: '25 × 25 cm' },
      { icone: 'gota', titulo: 'Rega', texto: 'Diária, 2 vezes ao dia: ao amanhecer e no fim da tarde, sem encharcar' },
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
    fotos: {
      capa: 'capa.jpg',
      galeria: [
        { arquivo: 'sementes-e-mudas.jpg', descricao: 'Pacotes de sementes de alface e coentro e o maço de mudas de cebolinha' },
        { arquivo: 'aluno-semeia-2.jpg', descricao: 'Aluno espalha sementes sobre o substrato do pneu' },
        { arquivo: 'aluna-semeia.jpg', descricao: 'Aluna semeia no pneu' },
        { arquivo: 'aluno-prepara-sementes.jpg', descricao: 'Aluno separa sementes na mão, ao lado do pneu' },
        { arquivo: 'sementes-na-mao.jpg', descricao: 'Aluno com sementes na palma da mão' },
        { arquivo: 'alface-com-placa.jpg', descricao: 'Pneu da alface com a plaquinha de QR code' },
      ],
    },
  },
  {
    slug: 'coentro',
    nome: 'Coentro',
    nomeCientifico: 'Coriandrum sativum',
    familia: 'Família Apiaceae',
    origem: 'Da mesma família da salsa e da cenoura, é originário da região mediterrânea.',
    formaPlantio: 'Sementes',
    plantio: 'O coentro também foi semeado direto no substrato, e as sementes foram cobertas com uma camada fina de terra.',
    ficha: [
      { icone: 'calendario', titulo: 'Ciclo', texto: '40 a 55 dias para folhas (cerca de 90 a 100 dias para sementes)' },
      { icone: 'sol', titulo: 'Clima', texto: 'Gosta de calor, acima de 25 °C' },
      { icone: 'camadas', titulo: 'Solo', texto: 'pH perto de 6,0' },
      { icone: 'linhas', titulo: 'Semeadura', texto: 'Direta, com 25 cm entre linhas e 10 cm entre plantas' },
      { icone: 'escudo', titulo: 'Resistência', texto: 'Planta rústica, com poucas doenças' },
    ],
    nutricao: {
      introducao: 'Uma fonte de:',
      selos: ['Ferro', 'Vitamina C', 'Provitamina A', 'Cálcio'],
    },
    voceSabia: [
      'O nome vem do grego *kóris*, que significa percevejo, por causa do aroma forte das folhas.',
      'É muito importante para a agricultura familiar do Nordeste.',
    ],
    fotos: {
      capa: 'capa.jpg',
      galeria: [
        { arquivo: 'sementes-e-mudas.jpg', descricao: 'Pacotes de sementes de alface e coentro e o maço de mudas de cebolinha' },
        { arquivo: 'aluna-semeia-2.jpg', descricao: 'Aluna semeia no pneu' },
        { arquivo: 'sementes-na-mao-2.jpg', descricao: 'Aluno com sementes na mão, pronto para semear' },
        { arquivo: 'aluno-afofa-terra.jpg', descricao: 'Aluno afofa a terra do pneu antes da semeadura' },
        { arquivo: 'garrafa-pet-semeada.jpg', descricao: 'Semeadura em uma garrafa PET com substrato' },
        { arquivo: 'semeadura-pneu.jpg', descricao: 'Semeadura em um pneu, com garrafas PET ao lado' },
      ],
    },
  },
  {
    slug: 'cebolinha',
    nome: 'Cebolinha',
    nomeCientifico: 'Allium fistulosum',
    familia: 'Família das Aliáceas',
    origem: 'Da mesma família da cebola, é originária da Sibéria.',
    formaPlantio: 'Mudas',
    plantio: 'A cebolinha foi plantada com mudas. Os alunos abriram covas no substrato e colocaram cada muda com a raiz para baixo.',
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
      'Se for cortada a uns 2 a 3 cm do solo, sem arrancar a base, ela rebrota e permite várias colheitas.',
      'As folhas são tubulares e a planta cresce em touceira.',
    ],
    fotos: {
      capa: 'capa.jpg',
      galeria: [
        { arquivo: 'mudas-de-cebolinha.jpg', descricao: 'Maço de mudas de cebolinha sobre o pneu' },
        { arquivo: 'alunas-plantam-mudas.jpg', descricao: 'Alunas plantam mudas em um pneu' },
        { arquivo: 'plantio-de-mudas.jpg', descricao: 'Aluna e equipe plantam mudas de cebolinha' },
        { arquivo: 'mudas-no-pneu.jpg', descricao: 'Mudas recém-plantadas em um pneu' },
        { arquivo: 'cebolinha-com-placa.jpg', descricao: 'Cebolinha brotando no pneu, com a plaquinha de QR code' },
        { arquivo: 'cebolinha-com-placa-2.jpg', descricao: 'Pneu da cebolinha com a plaquinha, na fileira da horta' },
      ],
    },
  },
]

/** Endereço das fotos (já considera o subdiretório do GitHub Pages). */
export function caminhoFoto(pasta: Slug | 'plantio', arquivo: string): string {
  return `${import.meta.env.BASE_URL}fotos/${pasta}/${arquivo}`
}
