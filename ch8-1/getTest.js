//@ts-check

const getTests = (n = 3) => {
  const tests = Array(2 ** n)
    .fill(0)
    .map((x, i) => {
      const num = 2 ** n - 1 - i
      const arr=  num.toString(2).padStart(n, '0').split('')
      // console.log({ i, arr })
      return arr.map((x) => (x === '1' ? true : false))
    })

  // console.log({ tests })
  return tests;
}

module.exports = { getTests }
