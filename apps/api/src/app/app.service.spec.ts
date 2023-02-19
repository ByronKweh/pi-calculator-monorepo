import { CACHE_MANAGER } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { AppService, PiValueWithSunCircumference } from "./app.service";

describe("getPiValue", () => {
  it("should return '3' if cache is empty", async () => {
    // Arrange
    const cacheManagerMock = {
      get: jest.fn().mockResolvedValue(null),
    };
    const sut = new AppService(cacheManagerMock);

    // Act
    const result = await sut.getPiValue();

    // Assert
    expect(result).toEqual("3");
    expect(cacheManagerMock.get).toHaveBeenCalledWith("pi_value");
  });

  it("should return cached value if available", async () => {
    // Arrange
    const cacheManagerMock = {
      get: jest.fn().mockResolvedValue("31415926"),
    };
    const sut = new AppService(cacheManagerMock);

    // Act
    const result = await sut.getPiValue();

    // Assert
    expect(result).toEqual("3.1415926");
    expect(cacheManagerMock.get).toHaveBeenCalledWith("pi_value");
  });
});

describe("longMultiply", () => {
  it("multiplies two decimal numbers correctly", () => {
    const app_service = new AppService(CACHE_MANAGER);
    expect(app_service.longMultiply("3.14", "2.5")).toBe("7.85");
    expect(app_service.longMultiply("0.1", "0.2")).toBe("0.02");
    expect(app_service.longMultiply("0.0001", "10000")).toBe("1");
  });

  it("handles integer inputs correctly", () => {
    const app_service = new AppService(CACHE_MANAGER);
    expect(app_service.longMultiply("123", "456")).toBe("56088");
    expect(app_service.longMultiply("9999999999", "9999999999")).toBe(
      "99999999980000000001"
    );
  });
});

describe("calculatePi", () => {
  it("calculates pi correctly", async () => {
    // Set up a mock implementation for the `getPiValue` and `setPiValue` methods
    const mockGetPiValue = jest.fn(() =>
      Promise.resolve("3.1415926535897932384")
    );
    const mockSetPiValue = jest.fn(() => Promise.resolve());

    // Create an instance of the class and set the mock implementations for `getPiValue` and `setPiValue`
    const app_service = new AppService(CACHE_MANAGER);
    app_service.getPiValue = mockGetPiValue;
    app_service.setPiValue = mockSetPiValue;

    // Call the `calculatePi` method and wait for it to complete
    const result = await app_service.calculatePi();

    // Expect the `getPiValue` method to have been called twice
    expect(mockGetPiValue).toHaveBeenCalledTimes(2);

    // Expect the `setPiValue` method to have been called once with the correct argument
    expect(mockSetPiValue).toHaveBeenCalledTimes(1);
    expect(mockSetPiValue).toHaveBeenCalledWith("314159265358979323846");
  });
});
