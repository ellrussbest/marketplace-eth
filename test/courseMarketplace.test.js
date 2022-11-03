const CourseMarketplace = artifacts.require("CourseMarketplace");
const { catchRevert } = require("./utils/exceptions");

// Mocha testing framework
// Chai - assertion JS library
contract("CourseMarketplace", (accounts) => {
  let _contract = null;
  let contractOwner = null;
  let buyer = null;
  let courseHash = null;

  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";
  const value = "900000000";

  before(async () => {
    _contract = await CourseMarketplace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];
  });

  describe("Purchase the new course", () => {
    before(async () => {
      await _contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      });
    });

    it("should not allow to repurchase the already owned course", async () => {
      await catchRevert(_contract.purchaseCourse(courseId, proof, {
        from: buyer,
        value,
      }));

    })

    it("Can get the purchased course hash by index", async () => {
      const index = 0;
      courseHash = await _contract.getCourseHashAtIndex(index);

      const expectedHash = web3.utils.soliditySha3(
        {
          type: "bytes16",
          value: courseId,
        },
        {
          type: "address",
          value: buyer,
        }
      );

      assert.equal(
        courseHash,
        expectedHash,
        "course hash is not matching with the expected course hash"
      );
    });

    it("Should match the purchase data of the course purchased by buyer", async () => {
      const exptectedIndex = 0;
      const expectedState = 0;
      const course = await _contract.getCourseByHash(courseHash);

      assert.equal(course.id, exptectedIndex, "Course index should be 0!");
      assert.equal(course.price, value, `Course price should be ${value}`);
      assert.equal(course.proof, proof, `Course proof should be ${proof}`);
      assert.equal(course.owner, buyer, `Course buyer should be ${buyer}`);
      assert.equal(
        course.state,
        expectedState,
        `Course buyer should be ${expectedState}`
      );
    });
  });

  describe("Activate the purchased course", () => {
    it("Only owner can activate course", async () => {
      await catchRevert(_contract.activateCourse(courseHash, { from: buyer }));
    });

    it("Should activated status", async () => {
      await _contract.activateCourse(courseHash, { from: contractOwner });
      const course = await _contract.getCourseByHash(courseHash);
      const expectedState = 1;

      assert.equal(
        course.state,
        expectedState,
        "Course should have activated state"
      );
    });
  });

  describe("Transfer ownership", () => {
    let currentOwner = null;

    before(async () => {
      currentOwner = await _contract.getContractOwner();
    });

    it("getContract owner should return deployer address", async () => {
      assert.equal(
        contractOwner,
        currentOwner,
        "Contract owner is not matching with the one from getContract owner function"
      );
    });

    it("should NOT transfer ownership when contract owner is not sending transaction", async () => {
      await catchRevert(
        _contract.transferOwnership(accounts[3], { from: accounts[4] })
      );
    });

    it("should transer ownership to 3rd address from 'accounts'", async () => {
      await _contract.transferOwnership(accounts[2], { from: currentOwner });
      const owner = await _contract.getContractOwner();
      assert.equal(
        owner,
        accounts[2],
        "Contract owner is not the second account"
      );
    });

    it("should transer ownership to initial contract owner", async () => {
      await _contract.transferOwnership(contractOwner, { from: accounts[2] });
      const owner = await _contract.getContractOwner();
      assert.equal(owner, contractOwner, "Contract owner is not set!");
    });
  });
});

/**
 * before functions are executed before your texts
 * describe wraps groups of tests and uses 'it' keyword to test
 * the single feature of each description
 */
