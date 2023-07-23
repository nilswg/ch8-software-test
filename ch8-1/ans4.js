const { getTests } = require('./getTest')
const { findDeterminates } = require('./findDeterminates')
const { findInactives } = require('./findInactives')
const { logRow } = require('./logRow')

const numOfClauses = 4
const tests = getTests(numOfClauses)

const runTest = (f) => {
  console.log('| |a|b|c|d|p|')
  console.log('|-|-|-|-|-|-|')

  for (let i = 0, n = tests.length; i < n; i++) {
    const p = f(...tests[i])
    logRow(i + 1, p, ...tests[i])
  }

  console.log('ACC----------------------')
  for (let ci = 0; ci < numOfClauses; ci++) {
    const acc = findDeterminates(f, tests, ci)
    console.log(
      `p${String.fromCharCode(97 + ci)}: ${JSON.stringify(acc, null)}`,
      { depth: null, colors: true }
    )
  }

  console.log('ICC----------------------')
  for (let ci = 0; ci < numOfClauses; ci++) {
    const icc = findInactives(f, tests, ci)
    console.log(
      `p${String.fromCharCode(97 + ci)}: ${JSON.stringify(icc, null)}`,
      { depth: null, colors: true }
    )
  }
}

runTest((a, b, c, d) => (a || (b && c)) && d  )
