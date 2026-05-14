export const generateCyclicallyRotateSteps = (arr) => {
  const steps = [];
  if (!arr || arr.length <= 1) return steps;

  let tempArr = [...arr];
  let n = tempArr.length;
  
  steps.push({
    type: 'array',
    array: [...tempArr],
    activeIndices: [],
    message: "Initial Array. We need to move the last element to the first position."
  });

  const lastElement = tempArr[n - 1];

  steps.push({
    type: 'array',
    array: [...tempArr],
    activeIndices: [n - 1],
    variables: { lastElement },
    pointers: { [n - 1]: 'last' },
    message: `Save the last element (${lastElement})`
  });

  // Shift elements to the right
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      type: 'array',
      array: [...tempArr],
      activeIndices: [i, i - 1],
      variables: { lastElement },
      pointers: { [i]: 'i', [i - 1]: 'i-1' },
      message: `Shift element at index ${i - 1} to index ${i}`
    });

    tempArr[i] = tempArr[i - 1];

    steps.push({
      type: 'array',
      array: [...tempArr],
      swappingIndices: [i, i - 1],
      variables: { lastElement },
      pointers: { [i]: 'i' },
      message: `Shifted! Array updated.`
    });
  }

  // Put last element in first position
  steps.push({
    type: 'array',
    array: [...tempArr],
    activeIndices: [0],
    variables: { lastElement },
    pointers: { 0: 'first' },
    message: `Now place the saved last element (${lastElement}) at index 0`
  });

  tempArr[0] = lastElement;

  steps.push({
    type: 'array',
    array: [...tempArr],
    doneIndices: Array.from({length: tempArr.length}, (_, i) => i),
    activeIndices: [0],
    variables: {},
    pointers: {},
    message: "Array cyclically rotated by 1!"
  });

  return steps;
};
