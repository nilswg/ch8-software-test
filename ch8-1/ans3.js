const { getTests } = require('./getTest')
const { findDeterminates } = require('./findDeterminates')
const { findInactives } = require('./findInactives')
const { logRow } = require('./logRow')

const numOfClauses = 3
const tests = getTests(numOfClauses)
// [
//   [1, 1, 1],
//   [1, 1, 0],
//   [1, 0, 1],
//   [1, 0, 0],
//   [0, 1, 1],
//   [0, 1, 0],
//   [0, 0, 1],
//   [0, 0, 0],
// ]

const runTest = (f) => {
  console.log('| |a|b|c|p|')
  console.log('|-|-|-|-|-|')

  for (let i = 0, n = tests.length; i < n; i++) {
    const p = f(...tests[i])
    logRow(i + 1, p, ...tests[i])
  }

  console.log('ACC----------------------')
  for (let ci = 0; ci < numOfClauses; ci++) {
    const acc = findDeterminates(f, tests, ci)
    console.log(`p${String.fromCharCode(97 + ci)}: ${JSON.stringify(acc)}`)
  }

  console.log('ICC----------------------')
  for (let ci = 0; ci < numOfClauses; ci++) {
    const icc = findInactives(f, tests, ci)
    console.log(`p${String.fromCharCode(97 + ci)}: ${JSON.stringify(icc)}`)
  }
}

const foo = (a, b, c) => a && (b || c)
runTest(foo)
