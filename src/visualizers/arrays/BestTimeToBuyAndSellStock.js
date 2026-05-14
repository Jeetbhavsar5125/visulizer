export const generateBuySellStockSteps = (arr) => {
  const steps = [];
  if (!arr || arr.length === 0) return steps;

  let minPrice = arr[0];
  let maxProfit = 0;
  let buyIndex = 0;
  let bestBuyIndex = 0;
  let bestSellIndex = 0;

  steps.push({
    type: 'array',
    array: [...arr],
    activeIndices: [0],
    variables: { minPrice, maxProfit },
    pointers: { 0: 'buy?' },
    message: `Initialize minPrice as first element ${arr[0]} and maxProfit as 0.`
  });

  for (let i = 1; i < arr.length; i++) {
    steps.push({
      type: 'array',
      array: [...arr],
      activeIndices: [i],
      variables: { minPrice, maxProfit, currentPrice: arr[i] },
      pointers: { [buyIndex]: 'min', [i]: 'curr' },
      message: `Checking price at day ${i}: ${arr[i]}`
    });

    if (arr[i] < minPrice) {
      minPrice = arr[i];
      buyIndex = i;
      steps.push({
        type: 'array',
        array: [...arr],
        activeIndices: [i],
        variables: { minPrice, maxProfit },
        pointers: { [buyIndex]: 'new min' },
        message: `Found lower price: ${arr[i]}. Updating minPrice.`
      });
    } else {
      let currentProfit = arr[i] - minPrice;
      steps.push({
        type: 'array',
        array: [...arr],
        activeIndices: [i, buyIndex],
        variables: { minPrice, maxProfit, currentProfit },
        pointers: { [buyIndex]: 'min', [i]: 'curr' },
        message: `Current profit if sold today: ${arr[i]} - ${minPrice} = ${currentProfit}`
      });

      if (currentProfit > maxProfit) {
        maxProfit = currentProfit;
        bestBuyIndex = buyIndex;
        bestSellIndex = i;
        steps.push({
          type: 'array',
          array: [...arr],
          activeIndices: [i, buyIndex],
          variables: { minPrice, maxProfit },
          pointers: { [buyIndex]: 'buy', [i]: 'sell' },
          message: `New maxProfit found: ${maxProfit}!`
        });
      }
    }
  }

  steps.push({
    type: 'array',
    array: [...arr],
    doneIndices: Array.from({length: arr.length}, (_, i) => i),
    activeIndices: maxProfit > 0 ? [bestBuyIndex, bestSellIndex] : [],
    variables: { maxProfit },
    pointers: maxProfit > 0 ? { [bestBuyIndex]: 'BUY', [bestSellIndex]: 'SELL' } : {},
    message: maxProfit > 0 ? `Finished. Best profit is ${maxProfit} by buying on day ${bestBuyIndex} and selling on day ${bestSellIndex}.` : "Finished. No profit can be made."
  });

  return steps;
};
