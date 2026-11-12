# Horta: alface, coentro e cebolinha

Site do projeto de extensão que implantou uma horta na Escola Municipal Jurgleide Alves Sampaio (Açailândia, MA) com as turmas do 6º ano. O plantio foi em 10/11/2026. Cada canteiro tem uma plaquinha com QR code que abre a página daquela planta.

Páginas geradas:

| Endereço      | Conteúdo                                     |
| ------------- | -------------------------------------------- |
| `/`           | Página inicial, hortaliças e "Como foi o plantio" |
| `/alface/`    | Fotos do plantio e ficha técnica da alface   |
| `/coentro/`   | Fotos do plantio e ficha técnica do coentro  |
| `/cebolinha/` | Fotos do plantio e ficha técnica da cebolinha |
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

- **Projeto:** nome, disciplina, curso, instituição, escola, turmas e data do plantio (`DD/MM/AAAA`).
- **`etapasPlantio`:** as etapas da seção "Como foi o plantio" da página inicial, cada uma com título, texto e fotos.
- **Cada hortaliça:** `formaPlantio` (sementes ou mudas), a frase `plantio` e a lista de fotos da `galeria`.
- **`urlBase`:** o endereço do site publicado, terminando em `/` (ex.: `'https://usuario.github.io/horta/'`). Os QR codes das plaquinhas só aparecem depois que ela é preenchida.
- Textos entre `*asteriscos*` ficam em itálico.

Depois de editar, salvem o arquivo. Com `npm run dev` aberto, a página atualiza sozinha.

## Fotos

- **Fotos do plantio:** ficam em `public/fotos/plantio/`. Para usar uma foto, coloquem o arquivo lá e adicionem `{ arquivo: 'nome.jpg', descricao: '...' }` na galeria da hortaliça ou em uma etapa de `etapasPlantio`. A descrição é lida por leitores de tela e aparece na foto ampliada.
- **Capa de cada hortaliça:** `public/fotos/<hortaliça>/capa.jpg`.

Enquanto uma foto não existir, aparece um espaço reservado com ícone de câmera, sem imagem quebrada. Os créditos estão em `public/fotos/CREDITOS.md`.

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
  datas.ts                 leitura e formatação de datas
  estilo.css               cores, fontes e layout
  rotas.tsx                endereços do site
  paginas/                 Inicio, PaginaHortalica, Placas, NaoEncontrada (404)
  componentes/             ComoFoiOPlantio, FichaTecnica, Galeria, Foto, Placa...
public/
  favicon.svg
  fotos/plantio/           fotos do dia do plantio
  fotos/<hortaliça>/       capa de cada hortaliça
```

Fontes do conteúdo: Embrapa Hortaliças, Embrapa Semiárido e artigos científicos.
