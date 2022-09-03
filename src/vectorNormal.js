export default (face, vertices) => {
  const p0 = vertices[face[0]]
  const p1 = vertices[face[1]]
  const p2 = vertices[face[2]]

  const x1 = p1[0] - p0[0]
  const y1 = p1[1] - p0[1]
  const z1 = p1[2] - p0[2]

  const x2 = p2[0] - p0[0]
  const y2 = p2[1] - p0[1]
  const z2 = p2[2] - p0[2]

  const coordinates = [
    y1 * z2 - y2 * z1,
    x2 * z1 - x1 * z2,
    x1 * y2 - x2 * y1
  ]

  return coordinates
}