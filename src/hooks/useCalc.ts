

type UseCal = {
    calcPowerTwo: (value: number) => number;
};


function useCalc(): UseCal {

    const calcPowerTwo = function (value: number): number {
        return Math.pow(value, 2);
    }
    return { calcPowerTwo };
}


export default useCalc;