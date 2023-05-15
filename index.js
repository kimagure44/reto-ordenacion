const original = document.querySelector('#originalArr');
const order = document.querySelector('#orderArr');

const generateNumbers = total => new Array(total).fill(0).map((_, index) => ({ type: `D-${index}`, value: Math.round(Math.random() * total * 8) }));

const generateChart = (id, data) => {
  return new Chart(id, {
    type: 'bar',
    data: {
      labels: data.map((item) => item.type),
      datasets: [{
        data: data.map(item => item.value)
      }]
    },
    options: {
      animation: false,
    }
  });
}

const quickSort = async data => {
  const payload = [...data]
  for (const [index, item] of payload.entries()) {
    if (item.value > payload[index + 1]?.value) {
        await delay(payload, index);
        generateChart('draw-quick-sort', payload);
        order.innerHTML = payload.map(item => item.value);
        return quickSort(payload);
    }
  }
}

const delay = (payload, index) => {
  return new Promise((res) => {
    setTimeout(() => {
      const [move] = payload.splice(index + 1, 1)
      payload.splice(index, 0, move);
      res(payload);
    }, velocity.value);
  });
}

let totalNumbers = document.querySelector('#totalNumbers');
let numbers = generateNumbers(parseInt(totalNumbers.value));
original.innerHTML = numbers.map(item => item.value);
let chart = generateChart('draw-quick-sort', numbers);
let velocity = document.querySelector('#velocity');

totalNumbers.addEventListener('change', function() {
  numbers = generateNumbers(parseInt(this.value));
  chart = generateChart('draw-quick-sort', numbers);
  original.innerHTML = numbers.map(item => item.value);
});

document.querySelector('#startOrder').addEventListener('click', () => {
  if (totalNumbers.value > 0 && velocity.value > 0) {
    quickSort(numbers);
  }
});
