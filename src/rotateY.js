export default (vertices, angle) => {
  const orientationY = 1
  vertices.forEach((coordinates, index) => {
    const x = coordinates[0]
    const y = coordinates[1]
    const z = coordinates[2]
    const finalX = x * Math.cos(angle * orientationY) - z * Math.sin(angle * orientationY)
    const finalZ = x * Math.sin(angle * orientationY) + z * Math.cos(angle * orientationY)
    vertices[index] = [finalX, y, finalZ]
  })
  return vertices
}