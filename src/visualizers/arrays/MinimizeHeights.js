export const generateMinimizeHeightsSteps = (arr, k = 2) => {
  const steps = [];
  if (!arr || arr.length === 0) return steps;

  let n = arr.length;
  let currentArr = [...arr];

  steps.push({
    type: 'array',
    array: [...currentArr],
    activeIndices: [],
    variables: { k, message: 'Starting algorithm' },
    message: `Initial array. k = ${k}. Goal: Minimize the difference between maximum and minimum heights after adding or subtracting k from each element.`
  });

  // Sorting
  currentArr.sort((a, b) => a - b);
  steps.push({
    type: 'array',
    array: [...currentArr],
    activeIndices: Array.from({ length: n }, (_, i) => i),
    variables: { k },
    message: "First, we sort the array to easily find potential min and max values."
  });

  let ans = currentArr[n - 1] - currentArr[0];
  steps.push({
    type: 'array',
    array: [...currentArr],
    activeIndices: [0, n - 1],
    variables: { k, ans },
    pointers: { 0: 'min', [n - 1]: 'max' },
    message: `Initial max difference: ${currentArr[n - 1]} - ${currentArr[0]} = ${ans}`
  });

  for (let i = 0; i < n - 1; i++) {
    let minVal = Math.min(currentArr[0] + k, currentArr[i + 1] - k);
    let maxVal = Math.max(currentArr[n - 1] - k, currentArr[i] + k);

    steps.push({
      type: 'array',
      array: [...currentArr],
      activeIndices: [0, i, i + 1, n - 1],
      variables: { k, ans, minVal, maxVal, i },
      pointers: { 0: 'a[0]', [i]: 'a[i]', [i + 1]: 'a[i+1]', [n - 1]: 'a[n-1]' },
      message: `At index ${i}: Comparing potential new min (${minVal}) and max (${maxVal}).`
    });

    if (minVal < 0) {
      steps.push({
        type: 'array',
        array: [...currentArr],
        activeIndices: [i, i + 1],
        variables: { k, ans, minVal, i },
        message: `minVal (${minVal}) is negative, skipping this iteration as heights cannot be negative.`
      });
      continue;
    }

    let currentDiff = maxVal - minVal;
    let oldAns = ans;
    ans = Math.min(ans, currentDiff);

    if (ans < oldAns) {
      steps.push({
        type: 'array',
        array: [...currentArr],
        activeIndices: [i, i + 1],
        variables: { k, ans, currentDiff, i },
        message: `Updated minimum difference! New difference: ${maxVal} - ${minVal} = ${currentDiff}. Total min diff: ${ans}`
      });
    } else {
      steps.push({
        type: 'array',
        array: [...currentArr],
        activeIndices: [i, i + 1],
        variables: { k, ans, currentDiff, i },
        message: `Current difference (${currentDiff}) is not smaller than current best (${oldAns}).`
      });
    }
  }

  steps.push({
    type: 'array',
    array: [...currentArr],
    doneIndices: Array.from({ length: n }, (_, i) => i),
    activeIndices: [],
    variables: { k, finalAns: ans },
    pointers: {},
    message: `Finished! The minimum possible difference is ${ans}.`
  });

  return steps;
};
