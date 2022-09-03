export default (vertices, ctx, size, translateX, translateY) => {
  vertices.forEach(coordinate => {
    const projectedX = (parseFloat(coordinate[0]) * size) + translateX
    const projectedY = (coordinate[1] * size) + translateY
   
    ctx.beginPath()
    ctx.arc(projectedX, projectedY, 5, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fillStyle = "red"
    ctx.fill()
  })

  /*const projectedX = (parseFloat(light[0]) * sizeFactor) + translateX
  const projectedY = (light[1] * sizeFactor) + translateY

  ctx.beginPath()
  ctx.arc(projectedX, projectedY, 10, 0, 2 * Math.PI, false)
  ctx.closePath()
  ctx.fillStyle = "green"
  ctx.fill()
  */
}