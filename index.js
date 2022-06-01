const express = require("express")
const Web3 = require('web3')

const app = express()
app.use(express.json)
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

app.get('/', async (req, res) => {
    let data = await web3.eth.getAccounts()
    res.send(data)
})
app.get('/getbalance', async (req, res) => {
    let result = await web3.eth.getBalance("0xFf258f6e583180f7204CbA284781c7dc58127a0a")
    result = web3.utils.fromWei(result, "ether")
    res.send(result)
})
app.get('/send/:e', async (req, res) => {
    const { e } = req.params
    web3.eth.sendTransaction({ from: "0xFf258f6e583180f7204CbA284781c7dc58127a0a", to: "0x4Ab1f73435693Fa6253267aBd382bb8De78e70A8", value: web3.utils.toWei("1", "ether") });
    res.send({ message: "transaction successful" })
})

app.listen(8080, () => {
    console.log("listening on 8080...")
})