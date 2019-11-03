const rewire = require('rewire');
const markovGen = rewire('../../markov/markov');
const testConstants = require('./testConstants');

beforeAll(() => {
    require('../../setup/logging')();
});

describe("Markov", () => {
    test("Generate markov chain", () => {
        expect(markovGen.generateMarkovChain(testConstants.testData)).toEqual(testConstants.validChain);
    });
    test("Run Markov Chain", () => {
        var response = markovGen.runChain(testConstants.validChain, 5);
        expect(response.length).toBe(5);
        var response2 = markovGen.runChain(testConstants.validChain, 10);
        expect(response2.length).toBe(10);

    });
    test("Validate Markov Chain", () => {
        expect(markovGen.testChain([])).toBe(false);
        expect(markovGen.testChain(4)).toBe(false);
        var invalidChain = JSON.parse(JSON.stringify(testConstants.validChain));

        //Set a random value within the Markov Chain to be an invalid value
        invalidChain[1][11] = 4;
        expect(markovGen.testChain(invalidChain)).toBe(false);

    });
    test("Convert sums chain to percentages chain", () => {
        const convertChain = markovGen.__get__("convertSumsToPercentages");
        const bigChain = convertChain(testConstants.sumsChain);

        expect(bigChain).toEqual(testConstants.validChain);

    });
    test("Create empty chain", () => {
        const createChain = markovGen.__get__("createEmptyChain");
        expect(createChain()).toEqual(testConstants.emptyChain);
    });
    test("Character to array index", () => {
        const charToIndex = markovGen.__get__("charToArrayIndex");
        expect(charToIndex("a")).toEqual(1);
        expect(charToIndex("j")).toEqual(10);
        expect(charToIndex("z")).toEqual(26);
    });
    test("Array index to character", () => {
        const indexToChar = markovGen.__get__("arrayIndexToChar");
        expect(indexToChar(0)).toEqual('a');
        expect(indexToChar(9)).toEqual('j');
        expect(indexToChar(25)).toEqual('z');
    });
})