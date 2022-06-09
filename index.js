import { ethers } from './ethers-5.2.esm.min.js';
import { abi, contractAddress } from './constants.js';

const connectButton = document.getElementById('connectButton');
const fundButton = document.getElementById('fundButton');

connectButton.onclick = connect;
fundButton.onclick = fund;

console.log(ethers);
console.log(abi);

async function connect() {
	let statusMessage = 'Status Unknown';
	if (typeof window.ethereum !== 'undefined') {
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		console.log('connected.');
		statusMessage = 'Connected to Metamask';
		connectButton.disabled = true;
	} else {
		console.log('No metamask!');
		statusMessage = 'Matamask is not installed';
	}
	document.getElementById('statusMessage').innerHTML = statusMessage;
}

async function fund() {
	// const ethAmount = document.getElementById('ethAmount').value;
	// console.log(`Funding with ${ethAmount}...`);
	const ethAmount = '0.01';
	if (typeof window.ethereum !== 'undefined') {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();
		console.log(signer);
		const contract = new ethers.Contract(contractAddress, abi, signer);
		console.log(contract);
		const transactionResponse = await contract.fund({ value: ethers.utils.parseEther(ethAmount) });
		console.log(transactionResponse);
	}
}
