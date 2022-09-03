export default (ctx, x, y, color) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, 1, 1)
}