export const generateReverseLinkedListSteps = (arr) => {
  const steps = [];
  
  if (arr.length === 0) {
    return [{ type: 'linkedlist', nodes: [], pointers: {}, message: "Empty Linked List" }];
  }

  // We will represent nodes as an array for simplicity in rendering,
  // but logically treat them as a linked list.
  let prev = -1; // -1 means null
  let curr = 0;

  steps.push({
    type: 'linkedlist',
    nodes: [...arr],
    pointers: { [curr]: 'curr', '-1': 'prev' },
    message: "Initialize prev = null, curr = head"
  });

  // To visualize reversed links, we maintain an array of 'next' pointers
  // Initially, node i points to i+1. (last node points to -1)
  let nextPointers = Array.from({length: arr.length}, (_, i) => i + 1);
  nextPointers[arr.length - 1] = -1;

  while (curr !== -1 && curr < arr.length) {
    let nextNode = nextPointers[curr];
    
    steps.push({
      type: 'linkedlist',
      nodes: [...arr],
      nextPointers: [...nextPointers],
      pointers: { [curr]: 'curr', [prev]: 'prev', [nextNode]: 'next' },
      message: `Save next node: next = curr.next (${nextNode !== -1 ? arr[nextNode] : 'null'})`
    });

    // Reverse the link
    nextPointers[curr] = prev;

    steps.push({
      type: 'linkedlist',
      nodes: [...arr],
      nextPointers: [...nextPointers],
      pointers: { [curr]: 'curr', [prev]: 'prev', [nextNode]: 'next' },
      message: `Reverse link: curr.next = prev`
    });

    prev = curr;
    curr = nextNode;

    steps.push({
      type: 'linkedlist',
      nodes: [...arr],
      nextPointers: [...nextPointers],
      pointers: { [curr]: 'curr', [prev]: 'prev', [nextNode]: 'next' },
      message: `Advance pointers: prev = curr, curr = next`
    });
  }

  steps.push({
    type: 'linkedlist',
    nodes: [...arr],
    nextPointers: [...nextPointers],
    pointers: { [prev]: 'head' },
    message: "Finished! Return prev as the new head."
  });

  return steps;
};
