const solc = require("solc"); //compiler of solity file
const fs = require("fs")

const Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

let fileContent = fs.readFileSync("demo.sol").toString()
console.log(fileContent)

var input = {
    language: "Solidity",
    sources: {
        "demo.sol": {
            content: fileContent,
        },
    },

    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

let output = JSON.parse(solc.compile(JSON.stringify(input)))
console.log(output)

let ABI = output.contracts["demo.sol"]["demo"].abi;
let bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;

console.log("Bytecode: ", bytecode);
console.log("ABI: ", ABI);

let contract = new web3.eth.Contract(ABI)
web3.eth.getAccounts().then(accounts => {
    console.log(accounts)
    let defaultAccount = accounts[0];

    contract
        .deploy({ data: bytecode })
        .send({ from: defaultAccount, gas: 500000 })
        .on("receipt", (receipt) => {
            console.log("contract Address:", receipt.contractAddress)
        })
        .then((demoContracts) => {
            demoContracts.methods.x().call((err, data) => {
                console.log("Initial value:", data)
            })
        })
})