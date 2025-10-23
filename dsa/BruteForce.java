
package dsa;

// Approach:
// - Sort the array.
// - Traverse backward to find the second distinct element from the end.

// Time: O(n log n) (due to sorting)
// Space: O(1) (in-place sort)

import java.util.Arrays;
import java.util.Scanner;

public class BruteForce {
    public static int findSecondLargest(int[] nums) {
        if (nums.length < 2) return -1;

        Arrays.sort(nums); 
        int n = nums.length;
        for (int i = n - 2; i >= 0; i--) {
            if (nums[i] != nums[i + 1]) {
                return nums[i]; // Second largest distinct
            }
        }
        return -1; // All elements are same
    }
    public static void main(String[] args) {
        Scanner obj= new Scanner(System.in);
        int n=obj.nextInt();
        int arr[]=new int[n];
        for(int i=0;i<n;i++){
            arr[i]=obj.nextInt();
        }
        System.out.println(findSecondLargest(arr)); 
    }
    
}
