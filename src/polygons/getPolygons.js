import colorFace from "./colorFace"
import vectorNormal from "./vectorNormal"

export default (edges, vertices, size, translateX, translateY) => {
  const polygons = []

  for (let i = 0; i < edges.length; i++) {
    const point = edges[i]

    const vN = vectorNormal(point, vertices)
    const color = colorFace(vertices, point, vN)
    let polygon = {
      coordinates: []
    }

    const p1 = [
      (parseFloat(vertices[point[0]][0]) * size) + translateX,
      (parseFloat(vertices[point[0]][1]) * size) + translateY,
      (parseFloat(vertices[point[0]][2]) * size)
    ]
    polygon.coordinates.push(p1)

    const p2 = [
      (parseFloat(vertices[point[1]][0]) * size) + translateX,
      (parseFloat(vertices[point[1]][1]) * size) + translateY,
      (parseFloat(vertices[point[1]][2]) * size)
    ]
    polygon.coordinates.push(p2)

    const p3 = [
      (parseFloat(vertices[point[2]][0]) * size) + translateX,
      (parseFloat(vertices[point[2]][1]) * size) + translateY,
      (parseFloat(vertices[point[2]][2]) * size)
    ]

    polygon.coordinates.push(p3)
    polygon.color = `rgba(${color[0]},${color[1]},${color[2]})`
    polygon.visible = vN[2] > 0
    polygons.push(polygon)

    if (point[3]) {

      const p4 = [
        (parseFloat(vertices[point[3]][0]) * size) + translateX,
        (parseFloat(vertices[point[3]][1]) * size) + translateY,
        (parseFloat(vertices[point[3]][2]) * size)
      ]
      polygon.coordinates.push(p4)

      polygon = { coordinates: [] }

      polygon.color = `rgba(${color[0]},${color[1]},${color[2]})`
      polygon.visible = vN[2] > 0

      polygon.coordinates.push(p1)
      polygon.coordinates.push(p3)
      polygon.coordinates.push(p4)
      polygons.push(polygon)

    }
  }

  return polygons
}