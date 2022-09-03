import file from './objFile'

export default () => {

  const vertexes = []
  const edges = []
  const lines = file.split('\n')

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].substring(0, 2) === 'v ') {
      const v = lines[i].split(' ')
      v.shift()
      const temp = []

      v.forEach(vt => {
        if (vt) temp.push(parseFloat(vt))
      })

      if (temp.length) vertexes.push(temp)
    }

    if (lines[i].substring(0, 2) === 'f ') {
      const f = lines[i].split(' ')
      f.shift()

      const t = []

      f.forEach(edge => {
        const e = edge.split('/')
        if (e[0]) t.push(parseInt(e[0]) - 1)
      })

      if (lines[i + 1] && lines[i + 1].substring(0, 2) === 'f ') {
        const f2 = lines[i + 1].split(' ')
        f2.forEach(edge => {
          const e = edge.split('/')
          if (typeof e[0] === 'number') t.push(parseInt(e[0]) - 1)
        })

       


      }

      edges.push(t)
      i + 2
    }
  }

  return [vertexes, edges]
}