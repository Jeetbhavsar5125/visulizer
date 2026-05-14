import { generateReversalSteps } from './visualizers/arrays/ReverseArray';
import { generateKadanesSteps } from './visualizers/arrays/KadanesAlgorithm';
import { generateMinMaxSteps } from './visualizers/arrays/MinMaxArray';
import { generateKthSmallestSteps } from './visualizers/arrays/KthSmallestElement';
import { generateCyclicallyRotateSteps } from './visualizers/arrays/CyclicallyRotateArray';
import { generateBuySellStockSteps } from './visualizers/arrays/BestTimeToBuyAndSellStock';
import { generateCountPairsSteps } from './visualizers/arrays/CountPairsWithGivenSum';
import { generateMinimizeHeightsSteps } from './visualizers/arrays/MinimizeHeights';
import { generateValidPalindromeSteps } from './visualizers/strings/ValidPalindrome';
import { generateReverseLinkedListSteps } from './visualizers/linkedlists/ReverseLinkedList';

export const VisualizerRegistry = {
  arrays: {
    name: 'Arrays',
    algorithms: {
      'array-reversal': {
        name: "Reverse Array",
        defaultInput: "5, 12, 8, 3, 19, 7, 1",
        generateSteps: generateReversalSteps,
        defaultCode: `public class Solution {
    public static void reverseArray(int[] arr) {
        int left = 0;
        int right = arr.length - 1;
        
        while(left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            left++;
            right--;
        }
    }
}`
      },
      'kadanes': {
        name: "Kadane's Algorithm",
        defaultInput: "-2, 1, -3, 4, -1, 2, 1, -5, 4",
        generateSteps: generateKadanesSteps,
        defaultCode: `public class Solution {
    public long maxSubarraySum(int[] arr) {
        long maxSum = arr[0];
        long currentSum = arr[0];
        
        for (int i = 1; i < arr.length; i++) {
            currentSum = Math.max(arr[i], currentSum + arr[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        return maxSum;
    }
} `
      },
      'min-max': {
        name: "Min/Max Array",
        defaultInput: "3, 2, 1, 56, 10000, 167",
        generateSteps: generateMinMaxSteps,
        defaultCode: `public class Solution {
    public static class Pair {
        public int min;
        public int max;
    }
    public static Pair getMinMax(long a[], long n) {
        Pair minmax = new Pair();
        if (n == 1) {
            minmax.max = (int)a[0];
            minmax.min = (int)a[0];
            return minmax;
        }
        if (a[0] > a[1]) {
            minmax.max = (int)a[0];
            minmax.min = (int)a[1];
        } else {
            minmax.max = (int)a[1];
            minmax.min = (int)a[0];
        }
        for (int i = 2; i < n; i++) {
            if (a[i] > minmax.max) minmax.max = (int)a[i];
            else if (a[i] < minmax.min) minmax.min = (int)a[i];
        }
        return minmax;
    }
}`
      },
      'kth-smallest': {
        name: "Kth Smallest Element",
        defaultInput: "7, 10, 4, 3, 20, 15",
        secondInput: "3",
        secondInputLabel: "K",
        generateSteps: generateKthSmallestSteps,
        defaultCode: `public class Solution {
    public static int kthSmallest(int[] arr, int l, int r, int k) {
        mergeSort(arr, l, r);
        return arr[k - 1];
    }

    private static void mergeSort(int[] arr, int l, int r) {
        if (l < r) {
            int m = l + (r - l) / 2;
            mergeSort(arr, l, m);
            mergeSort(arr, m + 1, r);
            merge(arr, l, m, r);
        }
    }

    private static void merge(int[] arr, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = arr[l + i];
        for (int j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) arr[k++] = L[i++];
            else arr[k++] = R[j++];
        }
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}`
      },
      'cyclic-rotate': {
        name: "Cyclically Rotate Array",
        defaultInput: "1, 2, 3, 4, 5",
        generateSteps: generateCyclicallyRotateSteps,
        defaultCode: `public class Solution {
    public void rotate(int[] arr) {
        int n = arr.length;
        if(n <= 1) return;
        int last = arr[n - 1];
        for(int i = n - 1; i > 0; i--){
            arr[i] = arr[i - 1];
        }
        arr[0] = last;
    }
}`
      },
      'buy-sell-stock': {
        name: "Best Time to Buy and Sell Stock",
        defaultInput: "7, 1, 5, 3, 6, 4",
        generateSteps: generateBuySellStockSteps,
        defaultCode: `public class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int i = 0; i < prices.length; i++) {
            if (prices[i] < minPrice) {
                minPrice = prices[i];
            } else if (prices[i] - minPrice > maxProfit) {
                maxProfit = prices[i] - minPrice;
            }
        }
        return maxProfit;
    }
}`
      },
      'count-pairs-sum': {
        name: "Count Pairs with Given Sum",
        defaultInput: "1, 5, 7, -1, 5",
        secondInput: "6",
        secondInputLabel: "Target",
        generateSteps: generateCountPairsSteps,
        defaultCode: `import java.util.HashMap;
public class Solution {
    int getPairsCount(int[] arr, int n, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (map.containsKey(k - arr[i])) {
                count += map.get(k - arr[i]);
            }
            map.put(arr[i], map.getOrDefault(arr[i], 0) + 1);
        }
        return count;
    }
}`
      },
      'minimize-heights': {
        name: "Minimize Heights II",
        defaultInput: "1, 15, 10, 6, 4, 3, 2, 7, 8, 9",
        secondInput: "5",
        secondInputLabel: "K",
        generateSteps: generateMinimizeHeightsSteps,
        defaultCode: `import java.util.*;

class Solution {
    public int getMinDiff(int[] arr, int k) {
        int n = arr.length;
        Arrays.sort(arr);
        int ans = arr[n - 1] - arr[0];

        for(int i = 0; i < n - 1; i++) {
            int min = Math.min(arr[0] + k, arr[i + 1] - k);
            int max = Math.max(arr[n - 1] - k, arr[i] + k);

            if(min < 0) {
                continue;
            }

            ans = Math.min(ans, max - min);
        }

        return ans;
    }
}`
      }
    }
  },
  strings: {
    name: 'Strings',
    algorithms: {
      'valid-palindrome': {
        name: "Valid Palindrome",
        defaultInput: "A man, a plan, a canal: Panama",
        generateSteps: generateValidPalindromeSteps,
        defaultCode: `public class Solution {
    public boolean isPalindrome(String s) {
        if (s.isEmpty()) return true;
        int head = 0, tail = s.length() - 1;
        char cHead, cTail;
        
        while(head <= tail) {
            cHead = s.charAt(head);
            cTail = s.charAt(tail);
            
            if (!Character.isLetterOrDigit(cHead)) {
                head++;
            } else if(!Character.isLetterOrDigit(cTail)) {
                tail--;
            } else {
                if (Character.toLowerCase(cHead) != Character.toLowerCase(cTail)) {
                    return false;
                }
                head++;
                tail--;
            }
        }
        return true;
    }
}`
      }
    }
  },
  linkedlists: {
    name: 'Linked Lists',
    algorithms: {
      'reverse-ll': {
        name: "Reverse Linked List",
        defaultInput: "1 -> 2 -> 3 -> 4 -> 5",
        generateSteps: generateReverseLinkedListSteps,
        defaultCode: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        return prev;
    }
}`
      }
    }
  }
};

export const parseInputForType = (str, type) => {
  if (type === 'strings') return str;
  if (type === 'linkedlists') {
    return str.split('->').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  }
  // Arrays
  const cleaned = str.replace(/[\[\]]/g, '');
  return cleaned.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
};
