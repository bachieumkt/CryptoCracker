import chalk from "chalk";
import figlet from "figlet";
import clear from "clear";
import inquirer from "inquirer";
import CoinKey from "coinkey";

function printLogo() {
  clear();
  console.log(
    chalk.blue(
      figlet.textSync('CryptoCracker', { horizontalLayout: 'full' }).trimEnd() + ' '.repeat(52) +'~ By Mrawsky ~ \n'
    )
  );
}

/*
  getRandomHex (len)
    len = length of randomly picked letters
*/
function getRandomHex(len) {
  let randomChars = 'ABCDF0123456789';
  let result = '';
  for ( let i = 0; i < len; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

function runWorker(public_address, logs) {
  // Generate Random Private Key Hex
  let privateKeyHex = getRandomHex(64);

  // Create New Bitcoin Key Pairs
  let coinkey = new CoinKey(Buffer.from(privateKeyHex, 'hex'));
  coinkey.compressed = false;

  // Print Logs
  if (logs) console.log(coinkey.publicAddress)

  // Check if generated public address matches given public address
  if (public_address == coinkey.publicAddress) {
    printLogo()
    console.log(chalk.green(`Success:`));
    console.log(chalk.green(`Wallet: ${public_address} | Seed: ${coinkey.privateWif}`));
    process.exit()
  }
}

printLogo();
const menu = await inquirer.prompt([
  {
    type: 'input',
    name: 'address',
    default: null,
    message: 'Enter Public Address:'
  },
  {
    type: 'confirm',
    name: 'logs',
    message: 'Enable Logs:',
    default: false
  }
]);

printLogo();
console.log(chalk.green(`Program Started...`));

while (true) {
  runWorker(menu.address, menu.logs)
}