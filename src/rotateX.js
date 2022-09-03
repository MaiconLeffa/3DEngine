export default (vertices, angle) => {
  const orientationX = 1
  vertices.forEach((coordinates, index) => {
    const x = coordinates[0]
    const y = coordinates[1]
    const z = coordinates[2]
    const finalZ = (z * Math.cos(angle * orientationX) - y * Math.sin(angle * orientationX))
    const finalY = (z * Math.sin(angle * orientationX) + y * Math.cos(angle * orientationX))
    vertices[index] = [x, finalY, finalZ]
  })
  return vertices
}