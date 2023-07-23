const T = (x) => (x === true ? 'T' : 'F')

const findDeterminates = (f, tests, ci) => {
  const memo = new Map()
  const res = []
  for (let i = 0, n = tests.length; i < n; i++) {
    const p = f(...tests[i])
    const pattern = getPattern(ci, ...tests[i])

    // 如取 Pa 時，會只看 b, c 形成的 pattern，如 TT、TF，同時查看對應的 p 與位置 i+1
    // 如果發現同樣的 pattern，但不同的 a 與得到不同 p 時，表示 a 能決定 p
    // 我們會將這個位置保存到 res
    const prev = memo.get(pattern)
    if (!!prev) {
      const [prevIdx, prevP] = prev
      if (prevP !== p) {
        // 取 p 一為 T；另一為 F
        res.push([prevIdx, i + 1])
      }
    } else {
      memo.set(pattern, [i + 1, p])
    }
  }
  // console.log(memo)
  return res
}

// 假如我們有 a, b, c 三個子句，且希望找出 Pa。則表示 ci=0，
// 會用其次要的子句 b, c 來產生 pattern。 例如形成 TT、TF 等
const getPattern = (ci, ...params) => {
  const n = params.length
  const checks = Array(n)
    .fill(1)
    .map((x, i) => (i !== ci ? 1 : 0))

  let res = ''
  for (let i = 0, n = checks.length; i < n; i++) {
    res += checks[i] === 1 ? T(params[i]) : ''
  }
  return res
}

module.exports = { findDeterminates }
