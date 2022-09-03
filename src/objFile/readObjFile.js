import file from './fileStr'

//Lê o arquivo obj (string) e extrai as informações necessárias para renderizar
export default () => {
  const vertexes = []
  const polygons = []
  const lines = file.split('\n')

  for (var i = 0; i < lines.length; i++) { //Loop entre cada linha do Obj
    if (lines[i].substring(0, 2) === 'v ') { //Se iniciar com 'v' é um vertice
      const v = lines[i].split(' ') //cada coordenada separada por espaço
      v.shift() //remove primeiro elemento que nomeia a linha

      const temp = []

      v.forEach(vt => {
        if (vt) temp.push(parseFloat(vt)) //insere cada vertice lida no array
      })

      if (temp.length) vertexes.push(temp) //se houver vertices insere na variavel global
    }

    if (lines[i].substring(0, 2) === 'f ') { //se inicar com f é um polygon (face)
      const f = lines[i].split(' ') //separa entre cada espaço
      f.shift() // remove primeiro elemento que nomeia a linha

      const t = []

      f.forEach(edge => { // loop entre cada index de vertex que compoe o poligono
        const e = edge.split('/') //separa cada parte usado /
        if (e[0]) t.push(parseInt(e[0]) - 1) //apenas o primeiro valor nos interessa (deve se descer um '-1' index para sincronizar corretamente com os vertices)
      })

      polygons.push(t) //adiciona poligono a variavel global
    }
  }

  return [vertexes, polygons]
}