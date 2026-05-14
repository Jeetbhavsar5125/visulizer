export const generateValidPalindromeSteps = (str) => {
  const steps = [];
  // Strip non-alphanumeric and lowercase
  const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  const arr = cleaned.split('');
  
  if (arr.length === 0) {
    return [{ type: 'string', array: [], activeIndices: [], message: "Empty or no alphanumeric chars. It is a palindrome." }];
  }

  let left = 0;
  let right = arr.length - 1;

  steps.push({
    type: 'string',
    array: [...arr],
    activeIndices: [left, right],
    pointers: { [left]: 'L', [right]: 'R' },
    message: `Initialized pointers at ends of cleaned string: "${cleaned}"`
  });

  let isPalindrome = true;

  while (left < right) {
    steps.push({
      type: 'string',
      array: [...arr],
      activeIndices: [left, right],
      pointers: { [left]: 'L', [right]: 'R' },
      message: `Compare '${arr[left]}' and '${arr[right]}'`
    });

    if (arr[left] !== arr[right]) {
      steps.push({
        type: 'string',
        array: [...arr],
        activeIndices: [left, right],
        swappingIndices: [left, right], // Use swapping color for mismatch
        pointers: { [left]: 'L', [right]: 'R' },
        message: `'${arr[left]}' != '${arr[right]}'. Not a palindrome!`
      });
      isPalindrome = false;
      break;
    }

    steps.push({
      type: 'string',
      array: [...arr],
      activeIndices: [left, right],
      doneIndices: [left, right], // Mark as matched
      pointers: { [left]: 'L', [right]: 'R' },
      message: `Matched! Moving pointers inward.`
    });

    left++;
    right--;
  }

  if (isPalindrome) {
    steps.push({
      type: 'string',
      array: [...arr],
      activeIndices: [],
      doneIndices: Array.from({length: arr.length}, (_, i) => i),
      pointers: {},
      message: `Pointers crossed. The string is a valid palindrome!`
    });
  }

  return steps;
};
