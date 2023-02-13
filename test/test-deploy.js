const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, SimpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
        await SimpleStorage.deployed()
    })
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = 0
        assert.equal(
            currentValue,
            expectedValue,
            "The favorite number should be 0"
        )
    })
    it("Should be able to change the favorite number", async function () {
        const transactionResponse = await SimpleStorage.store(10)
        await transactionResponse.wait(1)
        const newValue = await SimpleStorage.retrieve()
        const expectedValue = 10
        assert.equal(
            newValue,
            expectedValue,
            "The favorite number should be 10"
        )
    })
    it("Should be able to add person", async function () {
        const transactionResponse = await SimpleStorage.addPerson("Erik", 7)
        await transactionResponse.wait(1)
        const newValue = await SimpleStorage.people(0)
        const expectedValue = [7, "Erik"]
        assert.equal(
            newValue[0],
            expectedValue[0],
            `The name should be ${expectedValue[0]}`
        )
        assert.equal(
            newValue[1],
            expectedValue[1],
            `The value should be ${expectedValue[1]}`
        )
    })
})
