// script.js

// --- Contract Info ---
// Replace with your deployed contract addresses and ABIs
const vaultContractAddress = 'YOUR_VAULT_CONTRACT_ADDRESS';
const collateralTokenAddress = 'YOUR_COLLATERAL_TOKEN_CONTRACT_ADDRESS';

const vaultContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_collateralToken",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "CollateralDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "VaultCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "collateralToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "createVault",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "depositCollateral",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "vaultId",
				"type": "uint256"
			}
		],
		"name": "getVault",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "collateral",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "debt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "vaults",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "collateral",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "debt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const erc20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

// --- Global variables ---
let provider;
let signer;
let vaultContract;
let collateralTokenContract;

// --- DOM elements ---
const connectButton = document.getElementById('connectButton');
const connectionStatus = document.getElementById('connectionStatus');
const account = document.getElementById('account');

const createVaultButton = document.getElementById('createVaultButton');
const newVaultId = document.getElementById('newVaultId');

const vaultIdInput = document.getElementById('vaultIdInput');
const depositAmountInput = document.getElementById('depositAmountInput');
const depositButton = document.getElementById('depositButton');

const viewVaultIdInput = document.getElementById('viewVaultIdInput');
const getVaultButton = document.getElementById('getVaultButton');
const vaultCollateral = document.getElementById('vaultCollateral');
const vaultDebt = document.getElementById('vaultDebt');

// --- Functions ---

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            
            vaultContract = new ethers.Contract(vaultContractAddress, vaultContractABI, signer);
            collateralTokenContract = new ethers.Contract(collateralTokenAddress, erc20ABI, signer);

            connectionStatus.textContent = 'Connected';
            account.textContent = userAddress;
            connectButton.disabled = true;

        } catch (error) {
            console.error('Connection failed:', error);
            connectionStatus.textContent = 'Connection Failed';
        }
    } else {
        connectionStatus.textContent = 'MetaMask is not installed!';
    }
}

async function createVault() {
    if (!vaultContract) return alert('Please connect your wallet first.');
    try {
        const tx = await vaultContract.createVault();
        const receipt = await tx.wait();
        const event = receipt.events?.find(e => e.event === 'VaultCreated');
        if (event) {
            const vaultId = event.args.vaultId.toString();
            newVaultId.textContent = vaultId;
            alert(`Vault created with ID: ${vaultId}`);
        } else {
            throw new Error("VaultCreated event not found");
        }
    } catch (error) {
        console.error('Could not create vault:', error);
        alert('Error creating vault. See console for details.');
    }
}

async function depositCollateral() {
    if (!vaultContract || !collateralTokenContract) return alert('Please connect your wallet first.');
    
    const vaultId = vaultIdInput.value;
    const amount = depositAmountInput.value;

    if (!vaultId || !amount) return alert('Please provide a Vault ID and an amount.');

    try {
        const amountWei = ethers.utils.parseUnits(amount, 18); // Assuming 18 decimals for the token

        // 1. Approve the Vault contract to spend tokens
        console.log(`Approving ${amount} tokens for the vault...`);
        const approveTx = await collateralTokenContract.approve(vaultContractAddress, amountWei);
        await approveTx.wait();
        console.log('Approval successful!');

        // 2. Deposit the collateral
        console.log('Depositing collateral...');
        const depositTx = await vaultContract.depositCollateral(vaultId, amountWei);
        await depositTx.wait();
        console.log('Deposit successful!');
        alert(`Successfully deposited ${amount} tokens into vault ${vaultId}.`);

    } catch (error) {
        console.error('Could not deposit collateral:', error);
        alert('Error depositing collateral. See console for details.');
    }
}

async function getVaultInfo() {
    if (!vaultContract) return alert('Please connect your wallet first.');

    const vaultId = viewVaultIdInput.value;
    if (!vaultId) return alert('Please provide a Vault ID.');

    try {
        const result = await vaultContract.getVault(vaultId);
        vaultCollateral.textContent = ethers.utils.formatUnits(result.collateral, 18); // Assuming 18 decimals
        vaultDebt.textContent = ethers.utils.formatUnits(result.debt, 18); // Assuming 18 decimals
    } catch (error) {
        console.error('Could not fetch vault info:', error);
        alert('Error fetching vault info. See console for details.');
        vaultCollateral.textContent = 'Error';
        vaultDebt.textContent = 'Error';
    }
}


// --- Event Listeners ---
connectButton.addEventListener('click', connectWallet);
createVaultButton.addEventListener('click', createVault);
depositButton.addEventListener('click', depositCollateral);
getVaultButton.addEventListener('click', getVaultInfo); 