import colorBuffer from "./colorBuffer"
import compare from "./compare"

//Prepara o Z-Buffer
//Loop entre cada poligono comparando quais poligonos estao posicionados em cada pixel
export default (polygons, screenWidth, screenHeight) => {
  const zBufferPolygons = []

  for (let i = 0; i < polygons.length; i++) {
    const box = polygons[i]
    if (!box.visible) continue

    for (let x = 0; x < screenWidth; x++) {
      for (let y = 0; y < screenHeight; y++) {

        const v1x = box.coordinates[0][0]
        const v1y = box.coordinates[0][1]
        const a = {}
        a.x = v1x
        a.y = v1y

        const v2x = box.coordinates[1][0]
        const v2y = box.coordinates[1][1]
        const b = {}
        b.x = v2x
        b.y = v2y

        const v3x = box.coordinates[2][0]
        const v3y = box.coordinates[2][1]
        const c = {}
        c.x = v3x
        c.y = v3y

        const p = {}
        p.x = x
        p.y = y

        if (compare(b, c, p) < 0 || compare(c, a, p) < 0 || compare(a, b, p) < 0) {
          continue
        } else {
          const xy = `${x}_${y}`
          if (zBufferPolygons[xy]) {
            zBufferPolygons[xy].push(box)
          } else {
            zBufferPolygons[xy] = [box]
          }
        }
      }
    }
  }

  return colorBuffer(zBufferPolygons, false)

}