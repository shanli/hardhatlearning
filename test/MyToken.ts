// import {
//   time,
//   loadFixture,
// } from "@nomicfoundation/hardhat-toolbox/network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await hre.ethers.getSigners();

//     const Lock = await hre.ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }
  const { ethers } = hre;
  const initialSupply = 10000;
  let myTokenContract;
  let account1, account2;
  describe("MyToken test", function () {
    beforeEach(async() => {
        
        [account1, account1] = await ethers.getSigners();
        // console.log(account1, '---------ssss----',account2);
        const MyToken = await ethers.getContractFactory("MyToken");
        myTokenContract = await MyToken.deploy(initialSupply);
        myTokenContract.waitForDeployment();
        const addr = await myTokenContract.getAddress()
        expect(addr).to.length.greaterThan(0);
        // console.log("wait 2s");
        // await new Promise((resolve) => {
        //     setTimeout(()=>{
        //         resolve(1)
        //     },2000)
        // });
        // console.log("run");
    })
    it("验证合约名字", async function () {
        const name = await myTokenContract.name();
        const symbol = await myTokenContract.symbol();
        const decimals = await myTokenContract.decimals();
        expect(name).to.equal("MyToken");
        expect(symbol).to.equal("MTK");
        expect(decimals).to.equal(18);
    });
    it("测试转账", async function () {
        // const  account1 = await myTokenContract.getBalance(account1);
        // const account1 = await myTokenContract.getBalance()
        // const banlance1 = await myTokenContract.getBalance;
        // expect(banlance1).to.equal(initialSupply)
        myTokenContract.transfer(account1, initialSupply/2);

        const balance2 = await myTokenContract.balanceOf(account2);
        console.log('balance2 is:',balance2);
        expect(balance2).to.equal(initialSupply/2);
            // console.log("i am test1");
        //   const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

        //   expect(await lock.unlockTime()).to.equal(unlockTime);
        });
        
    });
});
