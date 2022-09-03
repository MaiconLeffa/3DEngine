export default (vertices, angle) => {
  vertices.forEach((coordinates, index) => {
    const x = coordinates[0]
    const y = coordinates[1]
    const z = coordinates[2]
    const finalX = x * Math.cos(angle) - y * Math.sin(angle)
    const finalY = x * Math.sin(angle) + y * Math.cos(angle)
    vertices[index] = [finalX, finalY, z]
  })
  return vertices
}