function zBufferGrayScale(percent) {
  var r = 0 + Math.floor(percent / 100 * 255);
  var g = 0 + Math.floor(percent / 100 * 255);
  var b = 0 + Math.floor(percent / 100 * 255);
  return 'rgba(' + r + ',' + g + ',' + b + ')';
}

// determina a cor de cada pixel
export default (zBufferPolygons, grayScale) => {
  Object.keys(zBufferPolygons).forEach(xy => {

    let z = Infinity
    let color = null

    zBufferPolygons[xy].forEach(polygon => {
      if (polygon.visible) {
        polygon.coordinates.forEach(coordinate => {
          const zCoordinate = coordinate[2]
          if (zCoordinate <= z) {
            z = zCoordinate
            color = polygon.color
          }
        })
      }
    })

    if (grayScale) { //Caso queira ver o zdepth em cor
      const perc = (z * 100) / (-80 - 2)
      zBufferPolygons[xy].color = zBufferGrayScale(perc)
    } else {
      zBufferPolygons[xy].color = color || 'rgba(255,0,0)'
    }

  })

  return zBufferPolygons
}