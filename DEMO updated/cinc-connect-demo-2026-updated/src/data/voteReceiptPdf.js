// Builds a one-page PDF vote receipt in the browser (no library) and downloads it.
// Used by Ballots & Votes ("DOWNLOAD RECEIPT"). The accent hex is swapped per tenant at build time.
import { CURRENT_USER } from './userData'

const ACCENT = '#006A52'

const ascii = s => String(s).replace(/[—–]/g, '-').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7E]/g, '')
const esc = s => ascii(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
const rgb = hex => [1, 3, 5].map(i => (parseInt(hex.slice(i, i + 2), 16) / 255).toFixed(3)).join(' ')

export function downloadVoteReceipt({ ballotTitle, selections, timestamp = new Date() }) {
  const when = timestamp.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true })
  const conf = 'VR-' + timestamp.getTime().toString(36).toUpperCase().slice(-8)

  const ops = []
  const text = (x, y, size, str, bold = false, color = '0.09 0.11 0.10') =>
    ops.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${color} rg ${x} ${y} Td (${esc(str)}) Tj ET`)
  const line = y => ops.push(`0.85 0.85 0.85 RG 0.8 w 56 ${y} m 556 ${y} l S`)

  ops.push(`${rgb(ACCENT)} rg 0 742 612 50 re f`)
  text(56, 760, 18, 'Vote Receipt', true, '1 1 1')
  text(400, 762, 11, CURRENT_USER.community, false, '1 1 1')

  let y = 700
  text(56, y, 16, 'Vote Confirmed', true, rgb(ACCENT)); y -= 22
  text(56, y, 12, ballotTitle); y -= 28; line(y); y -= 26

  const row = (label, value) => {
    text(56, y, 9, label.toUpperCase(), true, '0.45 0.45 0.45'); y -= 16
    text(56, y, 12, value); y -= 26
  }
  row('Voter', `${CURRENT_USER.fullName}  -  ${CURRENT_USER.primaryEmail}`)
  row('Date & time cast', when)
  row('Confirmation #', conf)
  line(y + 8); y -= 14

  text(56, y, 9, selections.length > 1 ? 'YOUR SELECTIONS' : 'YOUR SELECTION', true, '0.45 0.45 0.45'); y -= 18
  selections.forEach(s => { text(66, y, 12, '-  ' + s); y -= 18 })

  text(56, 60, 9, 'This receipt confirms your ballot was recorded electronically through CINC Connect.', false, '0.45 0.45 0.45')

  const stream = ops.join('\n')
  const objs = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]
  let pdf = '%PDF-1.4\n'
  const offsets = objs.map((o, i) => { const at = pdf.length; pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; return at })
  const xref = pdf.length
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n` + offsets.map(o => String(o).padStart(10, '0') + ' 00000 n \n').join('')
  pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`

  const url = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `Vote_Receipt_${ascii(ballotTitle).replace(/[^A-Za-z0-9]+/g, '_')}.pdf`
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
