async function connect() {
	let statusMessage = 'Status Unknown';
	if (typeof window.ethereum !== 'undefined') {
		console.log('trying to connect..');
		await window.ethereum.request({ method: 'eth_requestAccounts' });
		console.log('connected.');
		statusMessage = 'Connected to Metamask';
		document.getElementById('connectButton').disabled = true;
	} else {
		console.log('No metamask!');
		statusMessage = 'Matamask is not installed';
	}
	document.getElementById('statusMessage').innerHTML = statusMessage;
}
