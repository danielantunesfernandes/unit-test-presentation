
import useCalc from "./useCalc";
describe("useCalc.ts", () => {
    test("When the calcPowerTwo its called with 2 should return the power of 2 of the value 4", () => {
        const { calcPowerTwo } = useCalc();
        expect(calcPowerTwo(2)).toBe(4);
    });

    test("When the calcPowerTwo its called with 4 should return the power of 2 of the value 16", () => {
        const { calcPowerTwo } = useCalc();
        expect(calcPowerTwo(4)).toBe(16);
    });
});