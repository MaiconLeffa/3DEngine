import angle from "./angle"
import sub from "./sub"

const light = [100, 450,500]

export default (vertices, face, vn) => {
  const v1 = vertices[face[0]]
  const v2 = vertices[face[1]]
  const v3 = vertices[face[2]]

  const valorMedio = [
    (v1[0] + v2[0] + v3[0]) / 3.0,
    (v1[1] + v2[1] + v3[1]) / 3.0,
    (v1[2] + v2[2] + v3[2]) / 3.0,
  ]

  const escalar = -1
  const center = [valorMedio[0] * escalar, valorMedio[1] * escalar, valorMedio[2] * escalar]
  const ang = angle(vn, center)

  if (ang < (Math.PI / 2.0)) {
    vn = [vn[0] * escalar, vn[1] * escalar, vn[2] * escalar]
  }
  const vf_luz = sub(light, valorMedio);
  const a_luz = angle(vn, vf_luz);
  let quantCor = 0;

  if (a_luz < (Math.PI / 2.0)) {
    quantCor += ((Math.PI / 2.0) - a_luz) / (Math.PI / 2.0);
  }

  const testColor = [154, 132, 136]
  let r = parseInt(quantCor * testColor[0])
  let g = parseInt(quantCor * testColor[1])
  let b = parseInt(quantCor * testColor[2])

  if (r > 255) r = 255;
  if (g > 255) g = 255;
  if (b > 255) b = 255;

  const color = [r, g, b]
  return color
}