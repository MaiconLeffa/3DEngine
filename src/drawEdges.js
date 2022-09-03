import getPolygons from "./polygons/getPolygons"
import compare from "./zBuffer/compare"
import prepare from "./zBuffer/prepare"

export default (vertices, edges, ctx, size, translateX, translateY, mouseX, mouseY) => {

  const polygons = getPolygons(edges, vertices, size, translateX, translateY)
  const screenHeight = 100
  const screenWidth = 150
  const pixelsArray = new Uint8ClampedArray((screenHeight * screenWidth) * 4)

  //parte que determina se mouse ta em cima do poligono
  /*for (let k = 0; k < polygons.length - 1; k++) {
    if (polygons[k].visible) {
      const v1x = polygons[k].coordinates[0][0]
      const v1y = polygons[k].coordinates[0][1]

      const a = {}
      a.x = v1x
      a.y = v1y

      const v2x = polygons[k].coordinates[1][0]
      const v2y = polygons[k].coordinates[1][1]
      const b = {}
      b.x = v2x
      b.y = v2y

      const v3x = polygons[k].coordinates[2][0]
      const v3y = polygons[k].coordinates[2][1]
      const c = {}
      c.x = v3x
      c.y = v3y

      const mouse = {}
      mouse.x = mouseX
      mouse.y = mouseY

      if (compare(b, c, mouse) < 0 || compare(c, a, mouse) < 0 || compare(a, b, mouse) < 0) {
        continue
      } else {
        polygons[k].color = 'rgba(0,0,255)'
      }
    }
  }*/

  const colorBuffer = prepare(polygons, screenWidth, screenHeight)
  const arr = Object.keys(colorBuffer)

  for (let i = 0; i < arr.length; i++) {
    const xy = arr[i]
    const _xy = xy.split('_')
    const x = parseInt(_xy[0])
    const y = parseInt(_xy[1])

    const index = (x + (y * screenWidth)) * 4

    const color = colorBuffer[xy].color.replace(/[^\d,]/g, '').split(',')
    pixelsArray[index + 0] = parseInt(color[0])
    pixelsArray[index + 1] = parseInt(color[1])
    pixelsArray[index + 2] = parseInt(color[2])
    pixelsArray[index + 3] = 255;
  }

  const imageData = new ImageData(pixelsArray, screenWidth);
  ctx.putImageData(imageData, 0, 0);

  //INICIA A MONTAGEM DE TODAS AS FACES
  /*for (let i = 0; i < polygons.length - 1; i++) {
    if (polygons[i].visible) {
      ctx.beginPath()
      ctx.moveTo(polygons[i].coordinates[0][0], polygons[i].coordinates[0][1])
      ctx.lineTo(polygons[i].coordinates[1][0], polygons[i].coordinates[1][1])
      ctx.lineTo(polygons[i].coordinates[2][0], polygons[i].coordinates[2][1])

      if (polygons[i].coordinates[3]) ctx.lineTo(polygons[i].coordinates[3][0], polygons[i].coordinates[3][1])
      
      ctx.fillStyle = polygons[i].color
      ctx.closePath()
      //ctx.fill()
      ctx.lineWidth = .1
      ctx.stroke()
    }
  }*/

}