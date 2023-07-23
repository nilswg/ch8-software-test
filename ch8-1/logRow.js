const T = (x) => (x === true ? 'T' : 'F')

const logRow = (rowIdx, p, ...tuples) => {
  let res = `|${rowIdx}|`
  for (let i = 0, n = tuples.length; i < n; i++) {
    res += `${T(tuples[i])}|`
  }
  res += `${T(p)}|`
  console.log(res)
}

module.exports = { logRow, T }
