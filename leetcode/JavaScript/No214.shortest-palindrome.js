/**
 * Difficulty:
 * Hard
 *
 * Desc:
 * Given a string s, you are allowed to convert it to a palindrome
 * by adding characters in front of it. Find and return the shortest palindrome you can find by performing this transformation.
 *
 * Example:
 * Input: "aacecaaa"
 * Output: "aaacecaaa"
 *
 * Input: "abcd"
 * Output: "dcbabcd"
 */

/**
 * Time out solution
 */

/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome_timeout = function(s) {
  const midIndex = Math.floor(s.length / 2);
  let left = s.length % 2 === 0 ? midIndex - 1 : midIndex;
  const reverse = str => str.split('').reverse().join('');

  while (left >= 0) {
    let tmpL = left;
    let tmpR = left + 1;
    let tmpR2 = left + 2;
    let renable = true;
    let r2enable = true;
    while (tmpL >= 0) {
      if (s[tmpL] !== s[tmpR]) {
        renable = false;
      } else if (renable) {
        tmpR += 1;
      }
      if (s[tmpL] !== s[tmpR2]) {
        r2enable = false;
      } else if (r2enable) {
        tmpR2 += 1;
      }
      if (!renable && !r2enable) break;
      tmpL -= 1;
    }
    if (tmpL < 0) {
      const r = tmpR2 - tmpL === (left + 2) * 2 ? tmpR2 : tmpR;
      return reverse(s.slice(r)) + s;
    }
    left -= 1;
  }
  return reverse(s.slice(1)) + s;
};

/**
 * Accepted solution
 */

/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
  const reversed = s.split('').reverse().join('');

  for (let i = 0; i < s.length; i += 1) {
    if (s.slice(0, s.length - i) === reversed.slice(i)) {
      return reversed.slice(0, i) + s;
    }
  }
  return '';
};

/**
 * KMP solution
 */

// https://leetcode.com/problems/shortest-palindrome/discuss/60113/Clean-KMP-solution-with-super-detailed-explanation
var shortestPalindrome_kmp = function(s) {
  const reverse = str => str.split('').reverse().join('');
  const reversed = reverse(s);
  const tmpStr = s + '#' + reversed;

  const kmpTable = [0];
  let index = 0;

  for (let i = 1; i < tmpStr.length; i += 1) {
    if (tmpStr[i] === tmpStr[index]) {
      kmpTable[i] = kmpTable[i - 1] + 1;
      index += 1;
    } else {
      index = kmpTable[i - 1];

      while (index > 0 && tmpStr[i] !== tmpStr[index]) index = kmpTable[index - 1];
      if (tmpStr[i] === tmpStr[index]) index += 1;
      kmpTable[i] = index;
    }
  }

  return reverse(s.slice(kmpTable[tmpStr.length - 1])) + s;
};

// Test case
console.log(shortestPalindrome('ababbbabbaba'))
console.log(shortestPalindrome('aaaa'))
console.log(shortestPalindrome('aaaaa'))
console.log(shortestPalindrome('aba'))
console.log(shortestPalindrome('aacecaaa'))
console.log(shortestPalindrome('abcd'))
console.log(shortestPalindrome('aaceecaaa'))
console.log(shortestPalindrome('aaacecaaa'))
