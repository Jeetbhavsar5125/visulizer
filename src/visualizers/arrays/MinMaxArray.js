export const generateMinMaxSteps = (arr) => {
  const steps = [];
  if (!arr || arr.length === 0) return steps;

  let min = arr[0];
  let max = arr[0];

  steps.push({
    type: 'array',
    array: [...arr],
    activeIndices: [0],
    variables: { min, max },
    pointers: { 0: 'curr' },
    message: `Initialize min and max with the first element: ${arr[0]}`
  });

  for (let i = 1; i < arr.length; i++) {
    steps.push({
      type: 'array',
      array: [...arr],
      activeIndices: [i],
      variables: { min, max },
      pointers: { [i]: 'curr' },
      message: `Comparing ${arr[i]} with min (${min}) and max (${max})`
    });

    let updated = false;
    if (arr[i] < min) {
      min = arr[i];
      updated = true;
    }
    if (arr[i] > max) {
      max = arr[i];
      updated = true;
    }

    if (updated) {
      steps.push({
        type: 'array',
        array: [...arr],
        activeIndices: [i],
        variables: { min, max },
        pointers: { [i]: 'curr' },
        message: `Updated! new min: ${min}, new max: ${max}`
      });
    }
  }

  steps.push({
    type: 'array',
    array: [...arr],
    activeIndices: [],
    doneIndices: Array.from({length: arr.length}, (_, i) => i),
    variables: { min, max },
    pointers: {},
    message: `Finished. Minimum: ${min}, Maximum: ${max}`
  });

  return steps;
};
