async function main() {
  const [deployer] = await ethers.getSigners();

  // 1) Deploy USDC.e mock with 1,000,000 tokens
  const USDCe = await ethers.getContractFactory("USDCeMock");
  const initialMint = ethers.utils.parseUnits("1000000", 6);
  const usdc = await USDCe.deploy(initialMint);
  await usdc.deployed();
  console.log("USDC.e mock deployed to:", usdc.address);

  // 2) Deploy Vault pointing at the mock token
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy(usdc.address);
  await vault.deployed();
  console.log("Vault deployed to:", vault.address);

  // 3) Create a vault
  const tx = await vault.createVault();
  const receipt = await tx.wait();
  const vaultId = receipt.events.find(e => e.event === "VaultCreated").args.vaultId;
  console.log("Vault ID created:", vaultId.toString());
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
