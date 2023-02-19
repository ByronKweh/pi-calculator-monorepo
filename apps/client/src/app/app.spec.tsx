import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./App";
import { act } from "react-dom/test-utils";
import { getPiAndCircumference } from "../apiWebHooks/getPiAndCircumference";
import "@testing-library/jest-dom";
import { incrementPiValue } from "../apiWebHooks/incrementPiValue";

jest.mock("../apiWebHooks/getPiAndCircumference", () => ({
  getPiAndCircumference: jest.fn().mockReturnValue({
    isLoading: false,
    isError: false,
    data: {
      pi_value: String(3.14),
      circumference: String(10),
    },
    refetch: jest.fn(),
  }),
}));

jest.mock("../apiWebHooks/incrementPiValue", () => ({
  incrementPiValue: jest.fn(),
}));

describe("App component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the pi value and circumference", async () => {
    render(<App />);

    expect(
      await screen.findByText("Current Pi Value:3.14")
    ).toBeInTheDocument();

    expect(await screen.findByText("Circumference:10")).toBeInTheDocument();
  });

  it("calls incrementPiValue and refetch when the button is clicked", async () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "Increment pi value" });
    fireEvent.click(button);
    expect(incrementPiValue).toHaveBeenCalled();
    expect(getPiAndCircumference().refetch).toHaveBeenCalled();
  });

  // it("renders loading while data is being fetched", async () => {
  //   (getPiAndCircumference as jest.Mock).mockReturnValue({
  //     isLoading: true,
  //     isError: false,
  //     data: undefined,
  //     refetch: jest.fn(),
  //   });
  //   render(<App />);
  //   expect(await screen.findByText("Loading...")).toBeInTheDocument();
  // });

  // it("renders error message when there is an error", async () => {
  //   (getPiAndCircumference as jest.Mock).mockReturnValue({
  //     isLoading: false,
  //     isError: true,
  //     data: undefined,
  //     refetch: jest.fn(),
  //   });
  //   render(<App />);
  //   expect(
  //     await screen.findByText("An Error has occured, please refresh")
  //   ).toBeInTheDocument();
  // });
});
