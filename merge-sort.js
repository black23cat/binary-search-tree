function mergeSort(array) {
  // Base case when the array have reach to only 1 element
  if (array.length === 1) {
    return array;
  }
  // Split array into 2 equal length
  const splitArray = array.length / 2;
  const leftArray = array.slice(0, splitArray);
  const rightArray = array.slice(splitArray, array.length);

  // Run recursive function until the array length is
  // only 1 element remaining on each left/right side of array
  const sortedLeft = mergeSort(leftArray);
  const sortedRight = mergeSort(rightArray);
  // Sort the result from previously splitted array
  const sorted = merge(sortedLeft, sortedRight);

  // return the value that already been sorted
  return sorted;
}

function merge(left, right) {
  // initialize for index on each side of an array
  let i = 0;
  let j = 0;
  const result = [];
  // Check for smallest number on both sides of array
  while (i < left.length && j < right.length) {
    // Assign the lowest number and increment the intialize value
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Push the remaining number on array
  for (; i < left.length; i++) {
    result.push(left[i]);
  }
  for (; j < right.length; j++) {
    result.push(right[j]);
  }
  return result;
}

function removeDuplicate(array) {
  if (!array) return;
  const removed = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[i + 1]) {
      removed.push(array[i]);
    }
  }
  return removed;
}

export { mergeSort, removeDuplicate };
