/**
 * Difficulty:
 * Medium
 *
 * Desc:
 * Given a set of distinct positive integers,
 * find the largest subset such that every pair (Si, Sj) of elements in this subset satisfies: Si % Sj = 0 or Sj % Si = 0.
 * If there are multiple solutions, return any subset is fine.
 *
 * Example:
 * nums: [1,2,3]
 * Result: [1,2] (of course, [1,3] will also be ok)
 *
 * nums: [1,2,4,8]
 * Result: [1,2,4,8]
 *
 * Trick:
 * 按照要求，返回的数组内两两数组是可整除的。将数组排序，例如 arr = [1, 2, 4, 8]，
 * 对于新的数字 num，如果 num < arr[0] 且 arr[0] % num === 0；或者
 * num > arr[arr.length - 1] 且 num % arr[arr.length - 1] === 0，则符合要求（两两可被整除）
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function(nums) {
  if (nums.length <= 1) return nums;
  nums.sort((a, b) => a - b);

  const tmp = [];
  // 用于储存关系链，即 parent[i] 处储存的索引 j，则 i, j 都是可被整数的数组内元素的索引
  const parent = [];
  let max = 1;
  let maxIndex = 0;

  for (let i = 0; i < nums.length; i += 1) {
    if (tmp[i] === undefined) tmp[i] = 1;

    for (let j = 0; j < i; j += 1) {
      if (tmp[j] === undefined) tmp[j] = 1;

      if (nums[i] % nums[j] === 0) {
        if (tmp[j] + 1 > tmp[i]) {
          tmp[i] = tmp[j] + 1;
          parent[i] = j;

          if (tmp[i] > max) {
            max = tmp[i];
            maxIndex = i;
          }
        }
      }
    }
  }

  const results = [];

  for (let i = 0; i < max; i += 1) {
    results.unshift(nums[maxIndex]);
    maxIndex = parent[maxIndex];
  }

  return results;
};

// Test case
largestDivisibleSubset([3,4,16,8]);
largestDivisibleSubset([546,669]);
largestDivisibleSubset([1,2,3]);
largestDivisibleSubset([1,2,3,6,9,27]);
