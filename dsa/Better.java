package dsa;

// Approach (Better Solution):
// - Use a HashSet to ensure uniqueness while iterating.
// - For each number added to the set for the first time:
// - Update `largest` and `secondLargest` on the fly.
// - This approach avoids sorting, making it O(n) time and O(n) space.

// Time Complexity: O(n)
// Space Complexity: O(n)

import java.util.*;

public class Better {
    public static int findSecondLargest(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        Integer largest = null;
        Integer secondLargest = null;

        for (int num : arr) {
            if (!seen.add(num))
                continue;
            if (largest == null || num > largest) {
                secondLargest = largest;
                largest = num;
            } else if (secondLargest == null || num > secondLargest) {
                secondLargest = num;
            }
        }

        return (secondLargest == null) ? -1 : secondLargest;
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
