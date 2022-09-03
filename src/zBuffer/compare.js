//Compara se os vertices batem com a posição do pixel 
export default (a, b, c) => {
  const test = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  return test
}