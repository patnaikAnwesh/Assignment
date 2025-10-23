Problem Statement

Given an array of integers, remove all duplicate values and return the second largest unique number from the array.
If a second largest unique value does not exist (for example, if all numbers are the same), return -1.

Input Format:
- n → size of the array (integer)
- a1, a2, a3, ... an → space-separated integers representing the array elements.

Output Format:
- second largest unique number if it doesn’t exist, output -1.

Approaches & Complexity

1️⃣ Brute Force Approach
Idea:
- Sort the array in ascending order.
- Traverse backward and find the second distinct element from the end.

Steps:
- Sort the array.
- Start from the last index and skip duplicates.
- Return the second unique number.

Complexity:
- Time: O(n log n) (sorting)
- Space: O(1)

Pros: Easy to implement.
Cons: Slower due to sorting.

2️⃣ Better Approach (Using HashSet)
Idea:
- Use a HashSet to remove duplicates.
- Track largest and secondLargest while iterating through unique elements.

Steps:
- Iterate through array and add elements to a HashSet to ensure uniqueness.
- For each new number:
- If it’s greater than largest, update both largest and secondLargest.
- Else if it’s between largest and secondLargest, update secondLargest.
- Return the second largest number.

Complexity:
- Time: O(n)
- Space: O(n)

Pros: Efficient and clean.
Cons: Requires additional space for HashSet.

3️⃣ Optimal Approach (O(1) Space)
Idea:
- Find the largest number in one pass.
- Then find the largest number smaller than it in another pass.

Steps:
- Traverse the array to find the largest number.
- Traverse again to find the largest number smaller than that.
- Return the second largest.

Complexity:
- Time: O(n)
- Space: O(1)

Pros: Fastest and most space-efficient.
Cons: Slightly more logic; requires two passes.

Basic Test Cases
| Test | Input                  | Expected Output | Explanation                           |
| ---- | ---------------------- | --------------- | ------------------------------------- |
| 1    | `7`<br>`3 5 2 5 6 6 1` | `5`             | Unique: {1,2,3,5,6} → 2nd largest = 5 |
| 2    | `5`<br>`5 4 3 2 1`     | `4`             | Already unique; 2nd largest = 4       |

Edge Test Cases
| Test | Input          | Expected Output | Explanation                             |
| ---- | -------------- | --------------- | --------------------------------------- |
| 3    | `3`<br>`7 7 7` | `-1`            | All numbers same; only one unique value |
| 4    | `1`<br>`9`     | `-1`            | Single element; no 2nd largest exists   |

Corner Test Cases
| Test | Input                      | Expected Output | Explanation                              |
| ---- | -------------------------- | --------------- | ---------------------------------------- |
| 5    | `6`<br>`10 9 8 8 10 11`    | `10`            | Unique: {8,9,10,11} → 2nd largest = 10   |
| 6    | `6`<br>`-1 -5 -3 -5 -2 -1` | `-2`            | Unique: {-5,-3,-2,-1} → 2nd largest = -2 |

Submission summary 
This project presents three progressively optimized approaches to find the second largest unique number from an integer array.

Brute Force Approach — sorts the array and scans backward to identify the second distinct element.
Simple and easy to implement.
Time: O(n log n), Space: O(1)

Better Approach — uses a HashSet to ensure uniqueness and dynamically tracks the largest and second largest values in one pass.
Balances clarity and performance.
Time: O(n), Space: O(n)

Optimal Approach — performs two linear passes to find both largest and second largest values without any extra data structures.
Most efficient in both time and memory usage.
Time: O(n), Space: O(1)

All solutions have been tested against multiple scenarios — including basic, edge, and corner cases — covering arrays with duplicates, negative numbers, single elements, and repeated values.
