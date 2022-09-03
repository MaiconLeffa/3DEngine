function zBufferGrayScale(percent) {
  var r = 0 + Math.floor(percent / 100 * 255);
  var g = 0 + Math.floor(percent / 100 * 255);
  var b = 0 + Math.floor(percent / 100 * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ')';
}

// determina a cor de cada pixel
export default (zBufferPolygons, grayScale) => {

  const arr = Object.keys(zBufferPolygons)

  for (let i = 0; i < arr.length; i++) {
    const xy = arr[i]
    let z = Infinity
    let color = null

    for (let j = 0; j < zBufferPolygons[xy].length; j++) {
      const polygon = zBufferPolygons[xy][j]
      if (polygon.visible) {
        for (let u = 0; u < polygon.coordinates.length; u++) {
          const zCoordinate = polygon.coordinates[u][2]
          if (zCoordinate <= z) {
            z = zCoordinate
            color = polygon.color
          }
        }
      }
    }

    if (grayScale) { //Caso queira ver o zdepth em cor
      const perc = (z * 100) / (-80 - 2)
      zBufferPolygons[xy].color = zBufferGrayScale(perc)
    } else {
      zBufferPolygons[xy].color = color || 'rgba(255,0,0)'
    }

  }

  return zBufferPolygons
}