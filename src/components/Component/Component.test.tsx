import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Component from "./Component";

const mockCalcPowerTwo = jest.fn();

jest.mock("../../hooks/useCalc", () => ({
  __esModule: true,
  default: () => ({ calcPowerTwo: mockCalcPowerTwo }),
}));
describe("Component.tsx", () => {
  //OTHERS TESTS
  test("When the user push the button to calculate the power of two should the input value be updated with the power of two of the value", () => {
    mockCalcPowerTwo.mockReturnValue(4);

    render(<Component />);
    const elem = screen.getByTestId("result");
    expect(elem).toBeInTheDocument();
    expect(elem.innerHTML).toBe("0");

    const button = screen.getByText("Increment");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(elem.innerHTML).toBe("1");

    fireEvent.click(button);
    expect(elem.innerHTML).toBe("2");

    const buttonCalc = screen.getByText("Power of two");
    expect(buttonCalc).toBeInTheDocument();

    fireEvent.click(buttonCalc);

    expect(mockCalcPowerTwo).toBeCalled();
    expect(mockCalcPowerTwo).toBeCalledWith(2);
    expect(elem.innerHTML).toBe("4");
  });
});
