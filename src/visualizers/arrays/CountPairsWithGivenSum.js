export const generateCountPairsSteps = (arr, targetSum = 6) => {
  const steps = [];
  if (!arr || arr.length === 0) return steps;

  let count = 0;
  
  steps.push({
    type: 'array',
    array: [...arr],
    activeIndices: [],
    variables: { targetSum, count },
    message: `Finding pairs that sum to ${targetSum}`
  });

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let currentSum = arr[i] + arr[j];
      
      steps.push({
        type: 'array',
        array: [...arr],
        activeIndices: [i, j],
        variables: { targetSum, count, currentSum },
        pointers: { [i]: 'i', [j]: 'j' },
        message: `Checking pair (${arr[i]}, ${arr[j]}) -> Sum: ${currentSum}`
      });

      if (currentSum === targetSum) {
        count++;
        steps.push({
          type: 'array',
          array: [...arr],
          activeIndices: [i, j],
          variables: { targetSum, count },
          pointers: { [i]: 'match', [j]: 'match' },
          message: `Found a match! Incrementing count to ${count}.`
        });
      }
    }
  }

  steps.push({
    type: 'array',
    array: [...arr],
    doneIndices: Array.from({length: arr.length}, (_, i) => i),
    activeIndices: [],
    variables: { targetSum, count },
    pointers: {},
    message: `Finished! Total pairs with sum ${targetSum} is ${count}.`
  });

  return steps;
};
