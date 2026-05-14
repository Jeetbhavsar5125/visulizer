export const generateReversalSteps = (arr) => {
  const steps = [];
  let tempArr = [...arr];
  let left = 0;
  let right = tempArr.length - 1;

  steps.push({ 
    type: 'array', array: [...tempArr], activeIndices: [], swappingIndices: [], doneIndices: [], 
    message: "Initial Array" 
  });

  while (left < right) {
    steps.push({ 
      type: 'array', array: [...tempArr], activeIndices: [left, right], swappingIndices: [],
      doneIndices: Array.from({length: left}, (_, i) => i).concat(Array.from({length: left}, (_, i) => tempArr.length - 1 - i)),
      pointers: { [left]: 'L', [right]: 'R' },
      message: `Select elements at ${left} and ${right}`
    });

    steps.push({ 
      type: 'array', array: [...tempArr], activeIndices: [], swappingIndices: [left, right],
      doneIndices: Array.from({length: left}, (_, i) => i).concat(Array.from({length: left}, (_, i) => tempArr.length - 1 - i)),
      pointers: { [left]: 'L', [right]: 'R' },
      message: `Swap ${tempArr[left]} and ${tempArr[right]}`
    });

    let temp = tempArr[left];
    tempArr[left] = tempArr[right];
    tempArr[right] = temp;

    steps.push({ 
      type: 'array', array: [...tempArr], activeIndices: [], swappingIndices: [left, right],
      doneIndices: Array.from({length: left}, (_, i) => i).concat(Array.from({length: left}, (_, i) => tempArr.length - 1 - i)),
      pointers: { [left]: 'L', [right]: 'R' },
      message: `Swapped!`
    });

    left++;
    right--;
  }
  
  steps.push({ 
    type: 'array', array: [...tempArr], activeIndices: [], swappingIndices: [],
    doneIndices: Array.from({length: tempArr.length}, (_, i) => i),
    pointers: {},
    message: "Array completely reversed!"
  });

  return steps;
};
