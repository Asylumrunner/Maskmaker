const rewire = require('rewire')
const markovGen = rewire('../../markov/markov')

beforeAll(() => {
    require('../../setup/logging')();
});

describe("Markov", () => {
    test("Generate markov chain", () => {

    });
    test("Run Markov Chain", () => {

    });
    test("Validate Markov Chain", () => {
        expect(markovGen.testChain([])).toBe(false);
        expect(markovGen.testChain(4)).toBe(false);
        expect(markovGen.testChain([[0.0891089108910891,0.0594059405940594,0.06930693069306931,0.1485148514851485,0.039603960396039604,0,0.0594059405940594,0.06930693069306931,0.019801980198019802,0.0297029702970297,0.039603960396039604,0.0594059405940594,0.07920792079207921,0.019801980198019802,0,0.009900990099009901,0.009900990099009901,0.0297029702970297,0.039603960396039604,0.0297029702970297,0,0.009900990099009901,0.07920792079207921,0,0,0.009900990099009679],
            [0,0,0.03389830508474576,0.05084745762711865,0.01694915254237288,0,0,0.01694915254237288,0.01694915254237288,0,0,0.1694915254237288,0.03389830508474576,0.23728813559322035,0,0.01694915254237288,0,0.22033898305084745,0.0847457627118644,0.01694915254237288,0.01694915254237288,0.03389830508474576,0,0.01694915254237288,0.01694915254237288,2.220446049250313e-16],
            [0,0,0,0,0.2222222222222222,0,0,0,0.2222222222222222,0,0,0,0,0,0,0,0,0.4444444444444444,0,0,0,0,0,0,0.1111111111111111,0],
            [0.047619047619047616,0,0,0,0.047619047619047616,0,0,0.2857142857142857,0.09523809523809523,0,0.19047619047619047,0,0,0,0.2857142857142857,0,0,0,0,0.047619047619047616,0,0,0,0,0,0],
            [0.23333333333333334,0,0,0.03333333333333333,0.3,0,0,0,0.16666666666666666,0,0,0,0,0,0.2,0,0,0.03333333333333333,0,0,0,0,0.03333333333333333,0,0,0],
            [0,0,0.017543859649122806,0.05263157894736842,0,0.017543859649122806,0.017543859649122806,0,0.03508771929824561,0,0,0.14035087719298245,0,0.3157894736842105,0,0,0,0.19298245614035087,0.03508771929824561,0.07017543859649122,0.017543859649122806,0.017543859649122806,0.03508771929824561,0,0.03508771929824561,0],
            [0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0],
            [0.5,0,0,0,0.125,0,0,0,0,0,0,0,0,0,0.125,0,0,0.125,0,0,0.125,0,0,0,0,0],
            [0.6875,0,0,0,0.1875,0,0,0,0,0,0,0,0,0,0.0625,0,0,0,0,0,0.0625,0,0,0,0,0],
            [0.10256410256410256,0,0.1794871794871795,0.02564102564102564,0.05128205128205128,0.02564102564102564,0,0,0,0,0.02564102564102564,0.07692307692307693,0,0.28205128205128205,0,0,0,0.02564102564102564,0.07692307692307693,0.07692307692307693,0.05128205128205128,0,0,0,0,0],
            [0.6666666666666666,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3333333333333333,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0.8333333333333334,0,0,0,0.16666666666666666,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0.058823529411764705,0.029411764705882353,0.029411764705882353,0.08823529411764706,0.20588235294117646,0,0,0,0.14705882352941177,0,0.029411764705882353,0.17647058823529413,0.029411764705882353,0.029411764705882353,0.029411764705882353,0,0,0,0,0.058823529411764705,0.029411764705882353,0.029411764705882353,0,0,0.029411764705882353,0],
            [0.4166666666666667,0,0.08333333333333333,0,0.25,0,0,0,0.16666666666666666,0,0,0,0,0,0.08333333333333333,0,0,0,0,0,0,0,0,0,0,0],
            [0.06451612903225806,0,0.06451612903225806,0.12903225806451613,0.12903225806451613,0.03225806451612903,0,0,0.06451612903225806,0,0.03225806451612903,0.03225806451612903,0,0.06451612903225806,0.06451612903225806,0,0,0,0,0.25806451612903225,0,0,0.06451612903225806,0,0,2.220446049250313e-16],
            [0,0.02564102564102564,0,0.07692307692307693,0,0,0,0,0,0,0,0.1282051282051282,0.02564102564102564,0.46153846153846156,0.05128205128205128,0,0,0.15384615384615385,0,0.02564102564102564,0,0.02564102564102564,0,0,0.02564102564102564,0],
            [0,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
            [0.07142857142857142,0,0,0.09523809523809523,0.14285714285714285,0,0,0,0.16666666666666666,0,0.023809523809523808,0.07142857142857142,0.047619047619047616,0,0.09523809523809523,0,0,0.11904761904761904,0.047619047619047616,0.047619047619047616,0,0,0.023809523809523808,0,0.047619047619047616,0],
            [0.15384615384615385,0,0.15384615384615385,0,0.07692307692307693,0,0,0.07692307692307693,0,0,0,0,0,0,0.07692307692307693,0,0,0,0.07692307692307693,0.38461538461538464,0,0,0,0,0,0],
            [0.034482758620689655,0,0,0,0.1724137931034483,0,0,0.10344827586206896,0,0,0,0,0,0,0.3793103448275862,0,0,0.034482758620689655,0,0.1724137931034483,0.034482758620689655,0,0,0,0.06896551724137931,0],
            [0,0.1,0.1,0,0,0,0.1,0,0.1,0,0,0,0,0.1,0,0,0,0,0.5,0,0,0,0,0,0,0],
            [0.3333333333333333,0,0,0,0.3333333333333333,0,0,2,0.3333333333333333,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0.13333333333333333,0,0,0,0.26666666666666666,0,0,0,0.3333333333333333,0,0,0,0,0,0.13333333333333333,0,0,0,0,0.06666666666666667,0,0,0,0,0.06666666666666667,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
            [0.25,0,0,0.25,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0,0.25,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]])).toBe(false);

    });
    test("Convert sums chain to percentages chain", () => {
        const convertChain = markovGen.__get__("convertSumsToPercentages");
        const bigChain = convertChain([[9,6,7,15,4,0,6,7,2,3,4,6,8,2,0,1,1,3,4,3,0,1,8,0,0,1],
        [0,0,2,3,1,0,0,1,1,0,0,10,2,14,0,1,0,13,5,1,1,2,0,1,1,0],
        [0,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,1,0],
        [1,0,0,0,1,0,0,6,2,0,4,0,0,0,6,0,0,0,0,1,0,0,0,0,0,0],
        [7,0,0,1,9,0,0,0,5,0,0,0,0,0,6,0,0,1,0,0,0,0,1,0,0,0],
        [0,0,1,3,0,1,1,0,2,0,0,8,0,18,0,0,0,11,2,4,1,1,2,0,2,0],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [4,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0],
        [11,0,0,0,3,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0],
        [4,0,7,1,2,1,0,0,0,0,1,3,0,11,0,0,0,1,3,3,2,0,0,0,0,0],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,5,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [2,1,1,3,7,0,0,0,5,0,1,6,1,1,1,0,0,0,0,2,1,1,0,0,1,0],
        [5,0,1,0,3,0,0,0,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [2,0,2,4,4,1,0,0,2,0,1,1,0,2,2,0,0,0,0,8,0,0,2,0,0,0],
        [0,1,0,3,0,0,0,0,0,0,0,5,1,18,2,0,0,6,0,1,0,1,0,0,1,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
        [3,0,0,4,6,0,0,0,7,0,1,3,2,0,4,0,0,5,2,2,0,0,1,0,2,0],
        [2,0,2,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,5,0,0,0,0,0,0],
        [1,0,0,0,5,0,0,3,0,0,0,0,0,0,11,0,0,1,0,5,1,0,0,0,2,0],
        [0,1,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,5,0,0,0,0,0,0,0],
        [2,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [2,0,0,0,4,0,0,0,5,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,1,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]);

        expect(bigChain).toEqual([[0.0891089108910891,0.0594059405940594,0.06930693069306931,0.1485148514851485,0.039603960396039604,0,0.0594059405940594,0.06930693069306931,0.019801980198019802,0.0297029702970297,0.039603960396039604,0.0594059405940594,0.07920792079207921,0.019801980198019802,0,0.009900990099009901,0.009900990099009901,0.0297029702970297,0.039603960396039604,0.0297029702970297,0,0.009900990099009901,0.07920792079207921,0,0,0.009900990099009679],
            [0,0,0.03389830508474576,0.05084745762711865,0.01694915254237288,0,0,0.01694915254237288,0.01694915254237288,0,0,0.1694915254237288,0.03389830508474576,0.23728813559322035,0,0.01694915254237288,0,0.22033898305084745,0.0847457627118644,0.01694915254237288,0.01694915254237288,0.03389830508474576,0,0.01694915254237288,0.01694915254237288,2.220446049250313e-16],
            [0,0,0,0,0.2222222222222222,0,0,0,0.2222222222222222,0,0,0,0,0,0,0,0,0.4444444444444444,0,0,0,0,0,0,0.1111111111111111,0],
            [0.047619047619047616,0,0,0,0.047619047619047616,0,0,0.2857142857142857,0.09523809523809523,0,0.19047619047619047,0,0,0,0.2857142857142857,0,0,0,0,0.047619047619047616,0,0,0,0,0,0],
            [0.23333333333333334,0,0,0.03333333333333333,0.3,0,0,0,0.16666666666666666,0,0,0,0,0,0.2,0,0,0.03333333333333333,0,0,0,0,0.03333333333333333,0,0,0],
            [0,0,0.017543859649122806,0.05263157894736842,0,0.017543859649122806,0.017543859649122806,0,0.03508771929824561,0,0,0.14035087719298245,0,0.3157894736842105,0,0,0,0.19298245614035087,0.03508771929824561,0.07017543859649122,0.017543859649122806,0.017543859649122806,0.03508771929824561,0,0.03508771929824561,0],
            [0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0],
            [0.5,0,0,0,0.125,0,0,0,0,0,0,0,0,0,0.125,0,0,0.125,0,0,0.125,0,0,0,0,0],
            [0.6875,0,0,0,0.1875,0,0,0,0,0,0,0,0,0,0.0625,0,0,0,0,0,0.0625,0,0,0,0,0],
            [0.10256410256410256,0,0.1794871794871795,0.02564102564102564,0.05128205128205128,0.02564102564102564,0,0,0,0,0.02564102564102564,0.07692307692307693,0,0.28205128205128205,0,0,0,0.02564102564102564,0.07692307692307693,0.07692307692307693,0.05128205128205128,0,0,0,0,0],
            [0.6666666666666666,0,0,0,0,0,0,0,0,0,0,0,0,0,0.3333333333333333,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0.8333333333333334,0,0,0,0.16666666666666666,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0.058823529411764705,0.029411764705882353,0.029411764705882353,0.08823529411764706,0.20588235294117646,0,0,0,0.14705882352941177,0,0.029411764705882353,0.17647058823529413,0.029411764705882353,0.029411764705882353,0.029411764705882353,0,0,0,0,0.058823529411764705,0.029411764705882353,0.029411764705882353,0,0,0.029411764705882353,0],
            [0.4166666666666667,0,0.08333333333333333,0,0.25,0,0,0,0.16666666666666666,0,0,0,0,0,0.08333333333333333,0,0,0,0,0,0,0,0,0,0,0],
            [0.06451612903225806,0,0.06451612903225806,0.12903225806451613,0.12903225806451613,0.03225806451612903,0,0,0.06451612903225806,0,0.03225806451612903,0.03225806451612903,0,0.06451612903225806,0.06451612903225806,0,0,0,0,0.25806451612903225,0,0,0.06451612903225806,0,0,2.220446049250313e-16],
            [0,0.02564102564102564,0,0.07692307692307693,0,0,0,0,0,0,0,0.1282051282051282,0.02564102564102564,0.46153846153846156,0.05128205128205128,0,0,0.15384615384615385,0,0.02564102564102564,0,0.02564102564102564,0,0,0.02564102564102564,0],
            [0,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0.5,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
            [0.07142857142857142,0,0,0.09523809523809523,0.14285714285714285,0,0,0,0.16666666666666666,0,0.023809523809523808,0.07142857142857142,0.047619047619047616,0,0.09523809523809523,0,0,0.11904761904761904,0.047619047619047616,0.047619047619047616,0,0,0.023809523809523808,0,0.047619047619047616,0],
            [0.15384615384615385,0,0.15384615384615385,0,0.07692307692307693,0,0,0.07692307692307693,0,0,0,0,0,0,0.07692307692307693,0,0,0,0.07692307692307693,0.38461538461538464,0,0,0,0,0,0],
            [0.034482758620689655,0,0,0,0.1724137931034483,0,0,0.10344827586206896,0,0,0,0,0,0,0.3793103448275862,0,0,0.034482758620689655,0,0.1724137931034483,0.034482758620689655,0,0,0,0.06896551724137931,0],
            [0,0.1,0.1,0,0,0,0.1,0,0.1,0,0,0,0,0.1,0,0,0,0,0.5,0,0,0,0,0,0,0],
            [0.3333333333333333,0,0,0,0.3333333333333333,0,0,0,0.3333333333333333,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0.13333333333333333,0,0,0,0.26666666666666666,0,0,0,0.3333333333333333,0,0,0,0,0,0.13333333333333333,0,0,0,0,0.06666666666666667,0,0,0,0,0.06666666666666667,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
            [0.25,0,0,0.25,0,0,0,0,0,0,0,0,0,0.25,0,0,0,0,0,0.25,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0]]);

    });
    test("Create empty chain", () => {
        const createChain = markovGen.__get__("createEmptyChain");
        expect(createChain()).toEqual([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
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