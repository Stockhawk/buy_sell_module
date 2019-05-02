const k6 = require('k6/http');

const numberGenerator = () => Math.floor(Math.random() * 24);


const tickerGenerator = () => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'];
  return letters[numberGenerator()] + letters[numberGenerator()] + letters[numberGenerator()] + letters[numberGenerator()] + letters[numberGenerator()];
};


export const options = {
  vus: 100,
  duration: '5m',
};


export default function () {
  k6.get(`http://localhost:3002/api/stocks/${tickerGenerator()}`);
}
