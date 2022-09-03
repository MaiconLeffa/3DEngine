export default (u, v) => {
  const c_u = Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]);
  const c_v = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  const uv_prod = (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]);
  return Math.acos(uv_prod / (c_u * c_v))
}