package dsa;

// Approach:
// Find the largest number in one pass.
// In another pass, find the largest number smaller than the first (second largest).
// No extra data structure used.

// Complexity:
// Time: O(n)
// Space: O(1)

import java.util.Scanner;

public class Optimal {
     public static int findSecondLargest(int[] nums) {
        if (nums.length < 2) return -1;

        int largest = Integer.MIN_VALUE;
        int secondLargest = Integer.MIN_VALUE;

        // Step 1: Find largest
        for (int num : nums) {
            if (num > largest) {
                largest = num;
            }
        }

        // Step 2: Find number smaller than largest but greater than others
        for (int num : nums) {
            if (num < largest && num > secondLargest) {
                secondLargest = num;
            }
        }

        return (secondLargest == Integer.MIN_VALUE) ? -1 : secondLargest;
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
