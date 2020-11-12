// 题目A4：字符串的最长公共子序列求解问题
// 已知两个字符串X和Y，其中X包含m个字符，Y包含n个字符，
// 找出两者之间的最长公共子序列，
// 即在X和Y中从左到右都出现的连续的最长字符串序列。
// 例如，X=“ABCBDWDAB”，Y=“ACBDDAB”,
// 则X和Y的最长公共子序列即为{“CBD”，“DAB”}，
// 由该例可知，最长公共子序列可能不唯一。

function longestCommonSubstring(x, y) {
  let dp = [],
    result = [],
    res = [];
  //初始化dp数组
  for (let index = 0; index <= x.length; index++) {
    let arr = new Array(y.length + 1).fill(0)
    dp.push(arr)
  }
  //填表
  for (let i = 1; i <= x.length; i++) {
    for (let j = 1; j <= y.length; j++) {
      if (x[i - 1] == y[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      }
    }
  }

  //将dp映射到其中一参数上
  for (let index = 1; index < dp.length; index++) {
    res.push(Math.max(...dp[index]))
  }
  res.push(0)
  let max = Math.max(...res)

  //找最长公共子串
  for (let index = 0; index < res.length; index++) {
    if (res[index] == max) {
      result.push(x.slice(index - res[index] + 1, index + 1))
    }
  }
  console.log(result)
  return result;
}

longestCommonSubstring("ACBDDAB", "ABCWDAB")