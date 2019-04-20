const faker = require('faker');
const fs = require('fs');
const file = fs.createWriteStream('./mockData.csv');

const createCompanies = ( numOfChar ) => {
  const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const allPossibilities = [];
  const roundChoice = (round, charNumber) => {
    for (let i = 0; i < options.length; i++) {
      round += options[i];
      if (charNumber === numOfChar) {
        const ticker = round;
        allPossibilities.push(ticker);
      } else {
        roundChoice(round, charNumber + 1);
      }
      round = round.slice(0, -1);
    }
  };
  roundChoice('', 1);
  return allPossibilities;
};

const tickers = createCompanies(5);


const createMockData = async () => {
  for (let i = 0; i < 10000000; i++) {
    if (i === 0) {
      file.write('id, ask_price, ask_size, bid_price, bid_size, las_extended_hours_trade_price, last_trade_price, symbol, createdAt, updatedAt \n');
    } else if (!file.write(`${tickers[i]}, ${faker.finance.amount()}, ${faker.random.number()}, ${faker.finance.amount()}, ${faker.random.number()}, ${faker.finance.amount()}, ${faker.finance.amount()}, ${faker.random.alphaNumeric(5)}, 2019-03-29T17:37:11.000Z, 2019-03-29T17:37:11.000Z \n`)) {
        await new Promise(resolve => file.once('drain', resolve));
    }
  }
};

createMockData();


    // const stockData = {
    //   ask_price: faker.finance.amount(),
    //   ask_size: faker.random.number(),
    //   bid_price: faker.finance.amount(),
    //   bid_size: faker.random.number(),
    //   last_extended_hours_trade_price: faker.finance.amount(),
    //   last_trade_price: faker.finance.amount(),
    //   symbol: faker.random.alphaNumeric(5),
    //   createdAt: '2019-03-29T17:37:11.000Z',
    //   updatedAt: '2019-03-29T17:37:11.000Z',

      // fs.createWriteStream('mockData.json', JSON.stringify(mockData), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('file write successful!');
  // });
  // const file = await fs.readFile('mockData.json', 'utf8');
  // await write(file, JSON.stringify(mockData));