import colorFace from "./colorFace"
import getPolygons from "./getPolygons"
import renderPixel from "./renderPixel"
import vectorNormal from "./vectorNormal"
import prepare from "./zBuffer/prepare"

const translateZ = 0

export default (vertices, edges, ctx, size, translateX, translateY, mouseX, mouseY) => {
  const polygons = getPolygons(edges, vertices, size, translateX, translateY, translateZ)

  function compare(a, b, c) {
    const test = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    return test
  }

  //parte que determina se mouse ta em cima do poligono
  for (let k = 0; k < polygons.length - 1; k++) {
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
  }

  const screenHeight = 150
  const screenWidth = 150
  const pixelsArray = new Uint8ClampedArray((screenHeight * screenWidth) * 4);
  const colorBuffer = prepare(polygons, screenWidth, screenHeight)

  for (let i = 0; i < pixelsArray.length; i += 4) {
    const x = (i / 4) % screenWidth;
    const y = Math.floor((i / 4) / screenWidth);

    if (colorBuffer[`${x}_${y}`]) {
      let color = colorBuffer[`${x}_${y}`].color
      if (color) {
        color = color.replace(/[^\d,]/g, '').split(',');
        pixelsArray[i + 0] = parseInt(color[0])    // R value
        pixelsArray[i + 1] = parseInt(color[1])  // G value
        pixelsArray[i + 2] = parseInt(color[2])    // B value
        pixelsArray[i + 3] = 255;  // A value
      }
    } else { //cor do fundo
      pixelsArray[i + 0] = 255;    // R value
      pixelsArray[i + 1] = 255;  // G value
      pixelsArray[i + 2] = 0;    // B value
      pixelsArray[i + 3] = 255;  // A value
    }
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