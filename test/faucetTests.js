const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Faucet', function () {
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory('Faucet');
    const faucet = await Faucet.deploy();
    const recepit = await faucet.deployed();
    const [owner, hacker] = await ethers.getSigners();
    let withdrawAmount = ethers.utils.parseUnits('1', 'ether');
    let withdrawLittleAmount = ethers.utils.parseUnits('0.1', 'ether');
    console.log('Signer 1 address: ', owner.address);
    return { faucet, owner, withdrawAmount,withdrawLittleAmount, hacker, contractAddr: recepit.address };
  }

  it('should deploy and set the owner correctly', async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);
    expect(await faucet.owner()).to.equal(owner.address);
  });

  it('should not allow withdrawals above .1 ETH at a time', async function () {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );
    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it('should not allow withdrawals above .1 ETH at a time', async function () {
    const { faucet, withdrawLittleAmount, contractAddr } = await loadFixture(
      deployContractAndSetVariables
    );
    console.log('contractAddr', contractAddr);
    await expect(faucet.withdraw(withdrawLittleAmount)).to.be.not.reverted;
  });

  it('should only owner can invoke withdrawAll', async function () {
    
  });

  it('should only owner can invoke destroyFaucet', async function () {
    
  });

  it('when destroyFaucet is invoked by owner, the bytes on address should be 0x', async function () {
  
  });
});
