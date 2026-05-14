export const generateKadanesSteps = (arr) => {
  const steps = [];
  let maxSum = arr[0];
  let currentSum = arr[0];

  steps.push({
    type: 'array',
    array: [...arr],
    activeIndices: [0],
    pointers: { 0: 'i' },
    message: `Initialize maxSum = ${maxSum}, currentSum = ${currentSum}`,
    variables: { maxSum, currentSum }
  });

  for (let i = 1; i < arr.length; i++) {
    steps.push({
      type: 'array',
      array: [...arr],
      activeIndices: [i],
      pointers: { [i]: 'i' },
      message: `Evaluate element ${arr[i]}.`,
      variables: { maxSum, currentSum }
    });

    currentSum = Math.max(arr[i], currentSum + arr[i]);
    
    steps.push({
      type: 'array',
      array: [...arr],
      activeIndices: [i],
      pointers: { [i]: 'i' },
      message: `currentSum = max(${arr[i]}, ${currentSum - arr[i]} + ${arr[i]}) = ${currentSum}`,
      variables: { maxSum, currentSum }
    });

    if (currentSum > maxSum) {
      maxSum = currentSum;
      steps.push({
        type: 'array',
        array: [...arr],
        activeIndices: [i],
        pointers: { [i]: 'i' },
        message: `currentSum > maxSum, so update maxSum = ${maxSum}`,
        variables: { maxSum, currentSum }
      });
    }
  }

  steps.push({
    type: 'array',
    array: [...arr],
    activeIndices: [],
    pointers: {},
    message: `Finished! Maximum Subarray Sum is ${maxSum}`,
    variables: { maxSum, currentSum }
  });

  return steps;
};
