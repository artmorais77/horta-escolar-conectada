import QRCode from 'qrcode'
import { projeto, type Hortalica } from '../dados'
import { Icone } from './Icones'

const MARGEM = 4 // módulos brancos em volta (zona de silêncio padrão)

/** Desenha o QR code como SVG (gerado já no build, sem depender do navegador). */
function QrSvg({ texto, rotulo }: { texto: string; rotulo: string }) {
  const qr = QRCode.create(texto, { errorCorrectionLevel: 'M' })
  const n = qr.modules.size
  const total = n + MARGEM * 2
  let d = ''
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (qr.modules.get(y, x)) d += `M${x + MARGEM} ${y + MARGEM}h1v1h-1z`
    }
  }
  return (
    <svg className="placa__qr" viewBox={`0 0 ${total} ${total}`} role="img" aria-label={rotulo} shapeRendering="crispEdges">
      <rect width={total} height={total} fill="#FFFFFF" />
      <path d={d} fill="#000000" />
    </svg>
  )
}

export function Placa({ hortalica }: { hortalica: Hortalica }) {
  const base = projeto.urlBase.trim()
  const url = base ? `${base.endsWith('/') ? base : `${base}/`}${hortalica.slug}/` : ''

  return (
    <article className="placa" data-hortalica={hortalica.slug} aria-label={`Plaquinha: ${hortalica.nome}`}>
      <div className="placa__cartao">
        <p className="placa__projeto">
          <Icone nome="broto" />
          {projeto.nome}
        </p>
        <h2 className="placa__nome">{hortalica.nome}</h2>
        <p className="placa__cientifico">
          <em>{hortalica.nomeCientifico}</em>
        </p>
        {url ? (
          <QrSvg texto={url} rotulo={`QR code para ${url}`} />
        ) : (
          <div className="placa__qr placa__qr--vazio">
            <Icone nome="qrcode" tamanho={40} />
            <span>QR code</span>
            <small>Preencha a URL base em dados.ts</small>
          </div>
        )}
        <p className="placa__chamada">Escaneie para acompanhar o cultivo</p>
      </div>
    </article>
  )
}
