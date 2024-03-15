let sum = 0;
const elements = document.querySelectorAll('span.pull-right.mr-10');

elements.forEach((element) => {
  const value = parseFloat(element.textContent);
  if (!isNaN(value)) {
    sum += value;
  }
});

console.log('The sum of all values is:', sum);