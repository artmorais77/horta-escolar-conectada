# Horta: alface, coentro e cebolinha

Site do projeto acadêmico que acompanha o cultivo de três hortaliças. Cada vaso tem uma plaquinha com QR code que abre a página daquela planta.

Páginas geradas:

| Endereço      | Conteúdo                                     |
| ------------- | -------------------------------------------- |
| `/`           | Página inicial com as três hortaliças        |
| `/alface/`    | Diário, fotos e ficha técnica da alface      |
| `/coentro/`   | Diário, fotos e ficha técnica do coentro     |
| `/cebolinha/` | Diário, fotos e ficha técnica da cebolinha   |
| `/placas/`    | Plaquinhas A5 com QR code, prontas para imprimir |

Feito com React + TypeScript + Vite. O `vite-react-ssg` gera um `index.html` de verdade para cada endereço, então os links do QR code abrem direto no GitHub Pages, sem erro 404.

## Rodar no computador

Precisa do [Node.js](https://nodejs.org/) 20 ou mais novo.

```bash
npm install     # só na primeira vez
npm run dev     # abre o site em http://localhost:5173/horta/
```

Para gerar a versão final (pasta `dist/`) e conferir como vai ficar:

```bash
npm run build
npm run preview # abre em http://localhost:4173/horta/
```

## Editar os textos e as datas

**Tudo o que precisa ser preenchido fica em `src/dados.ts`.** Não é preciso mexer em mais nada.

- **Projeto:** nome, integrantes, disciplina, curso, instituição e data da apresentação.
- **Datas:** escrevam no formato `DD/MM/AAAA` (ex.: `'15/09/2026'`). Enquanto estiver `'[DD/MM/AAAA]'`, o site mostra o espaço reservado.
- **`dataPlantio`** de cada hortaliça: com ela o site calcula sozinho os "dias de cultivo" e a barra de progresso (pelo horário de Brasília). Ao passar do ciclo previsto, aparece "Pronta para colher".
- **Diário:** cada hortaliça tem, dentro de `diario(...)`, uma linha com as datas de cada etapa (`semeadura`, `germinacao`, `primeirasFolhas`, `crescimento`, `apresentacao`). A data da semeadura, se ficar vazia (`''`), usa a data de plantio; a do "Dia da apresentação" usa a data da apresentação do projeto. Etapas sem data ou com data no futuro aparecem como "em breve".
- **`urlBase`:** o endereço do site publicado, terminando em `/` (ex.: `'https://usuario.github.io/horta/'`). Os QR codes das plaquinhas só aparecem depois que ela é preenchida.
- Textos entre `*asteriscos*` ficam em itálico.

Depois de editar, salvem o arquivo. Com `npm run dev` aberto, a página atualiza sozinha.

## Fotos

Coloquem as fotos em `public/fotos/<hortaliça>/`, com estes nomes exatos (tudo minúsculo, `.jpg`):

```
public/fotos/alface/
  capa.jpg              foto do topo da página e do card da página inicial
  semeadura.jpg
  germinacao.jpg
  primeiras-folhas.jpg
  crescimento.jpg
  apresentacao.jpg
  galeria-01.jpg        fotos da galeria (a lista está em dados.ts)
  galeria-02.jpg
  ...
```

O mesmo vale para `coentro/` e `cebolinha/`. Enquanto uma foto não existir, aparece um espaço reservado com ícone de câmera, sem imagem quebrada.

Dica: reduzam as fotos para no máximo uns 1600 px de largura antes de enviar, assim a página abre rápido no celular. Para mudar a quantidade de fotos da galeria, editem a lista `galeriaPadrao` em `dados.ts`.

## Publicar no GitHub Pages

1. Criem um repositório no GitHub e enviem este projeto para a branch `main`.
2. No repositório, abram **Settings → Pages** e, em **Source**, escolham **GitHub Actions**.
3. Pronto: a cada `push` na `main`, o workflow `.github/workflows/deploy.yml` gera o site e publica. O andamento aparece na aba **Actions**.

O endereço fica `https://<usuario>.github.io/<nome-do-repositorio>/`. O workflow já usa o nome do repositório como subdiretório. Depois da primeira publicação:

1. Copiem esse endereço para `urlBase` em `src/dados.ts` e enviem de novo.
2. Abram `/placas/`, cliquem em **Imprimir**, escolham papel **A5** e ativem **Gráficos de fundo** (se a opção aparecer) para sair com as cores.
3. Testem cada QR code com o celular antes de colar no vaso.

> Para rodar localmente com outro subdiretório: `BASE_PATH=/outro-nome/ npm run build`.

## Estrutura

```
src/
  dados.ts                 <- textos, datas e fotos (editem aqui)
  datas.ts                 cálculos de datas (fuso America/Sao_Paulo)
  estilo.css               cores, fontes e layout
  rotas.tsx                endereços do site
  paginas/                 Inicio, PaginaHortalica, Placas, NaoEncontrada (404)
  componentes/             LinhaDoTempo, FichaTecnica, Galeria, BarraProgresso, Foto, Placa...
public/
  favicon.svg
  fotos/<hortaliça>/       fotos do cultivo
```

Fontes do conteúdo: Embrapa Hortaliças, Embrapa Semiárido e artigos científicos.
