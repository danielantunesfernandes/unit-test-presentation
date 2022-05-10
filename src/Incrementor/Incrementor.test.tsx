import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Incrementor from "./Incrementor";

const mockCalcPowerTwo = jest.fn();

jest.mock("../hooks/useCalc", () => ({
  __esModule: true,
  default: () => ({ calcPowerTwo: mockCalcPowerTwo }),
}));
describe("Incrementor.tsx", () => {
  test("Component Incrementor should rendered correctly", () => {
    render(<Incrementor />);
    const keyTextElem = screen.getByText("Incrementor");
    expect(keyTextElem).toBeInTheDocument();
    const elem = screen.getByTestId("result");
    expect(elem).toBeInTheDocument();
    const buttonIncrement = screen.getByText("Increment");
    expect(buttonIncrement).toBeInTheDocument();

    const buttonCalc = screen.getByText("Power of two");
    expect(buttonCalc).toBeInTheDocument();
  });

  test("When component is rendered should have as default value 0", () => {
    render(<Incrementor />);
    const elem = screen.getByTestId("result");
    expect(elem).toBeInTheDocument();
    expect(elem.innerHTML).toBe("0");
  });

  test("When push the button the value should be incremented", () => {
    render(<Incrementor />);
    const elem = screen.getByTestId("result");
    expect(elem).toBeInTheDocument();
    expect(elem.innerHTML).toBe("0");

    const button = screen.getByText("Increment");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(elem.innerHTML).toBe("1");

    fireEvent.click(button);
    expect(elem.innerHTML).toBe("2");
  });

  test("When the user push the button to calculate the power of two should the input value be updated with the power of two of the value", () => {
    mockCalcPowerTwo.mockReturnValue(4);

    render(<Incrementor />);
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
