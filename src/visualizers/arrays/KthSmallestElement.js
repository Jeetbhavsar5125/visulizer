export const generateKthSmallestSteps = (arr, k = 3) => {
  const steps = [];
  if (!arr || arr.length === 0) return steps;
  
  // Make sure K is valid
  const targetK = Math.min(Math.max(1, k), arr.length);
  let tempArr = [...arr];

  steps.push({
    type: 'array',
    array: [...tempArr],
    activeIndices: [],
    variables: { k: targetK },
    message: `Finding the ${targetK}th smallest element using Merge Sort.`
  });

  const merge = (low, mid, high) => {
    let left = low;
    let right = mid + 1;
    let merged = [];

    steps.push({
      type: 'array',
      array: [...tempArr],
      activeIndices: Array.from({length: high - low + 1}, (_, i) => low + i),
      variables: { k: targetK, low, mid, high },
      message: `Merging subarrays: [${low}...${mid}] and [${mid+1}...${high}]`
    });

    while (left <= mid && right <= high) {
      steps.push({
        type: 'array',
        array: [...tempArr],
        activeIndices: [left, right],
        variables: { k: targetK },
        pointers: { [left]: 'L', [right]: 'R' },
        message: `Comparing ${tempArr[left]} and ${tempArr[right]}`
      });

      if (tempArr[left] <= tempArr[right]) {
        merged.push(tempArr[left++]);
      } else {
        merged.push(tempArr[right++]);
      }
    }

    while (left <= mid) {
      merged.push(tempArr[left++]);
    }
    while (right <= high) {
      merged.push(tempArr[right++]);
    }

    for (let i = 0; i < merged.length; i++) {
      tempArr[low + i] = merged[i];
      steps.push({
        type: 'array',
        array: [...tempArr],
        swappingIndices: [low + i],
        variables: { k: targetK },
        message: `Placing ${merged[i]} into sorted position ${low + i}`
      });
    }
  };

  const mergeSort = (low, high) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      mergeSort(low, mid);
      mergeSort(mid + 1, high);
      merge(low, mid, high);
    }
  };

  mergeSort(0, tempArr.length - 1);

  const kIndex = targetK - 1;
  const kthElement = tempArr[kIndex];

  steps.push({
    type: 'array',
    array: [...tempArr],
    doneIndices: Array.from({length: tempArr.length}, (_, i) => i),
    activeIndices: [kIndex],
    variables: { k: targetK, result: kthElement },
    pointers: { [kIndex]: `${targetK}th` },
    message: `Merge Sort complete! The ${targetK}th smallest element is ${kthElement}`
  });

  return steps;
};

