import { makeAddress } from "test/factories/make-address";
import { Farm } from "./farm";

const sut = Farm;

describe("Farm", () => {
  it("should create a valid farm", () => {
    const farm = sut.create({
      producerId: "producer-id",
      name: "Farm 1",
      address: makeAddress(),
      totalArea: 100,
      cultivatedArea: 50,
      vegetationArea: 50,
    });

    expect(farm.producerId).toBe("producer-id");
    expect(farm.name).toBe("Farm 1");
    expect(farm.address.city).toBe("São Paulo");
    expect(farm.address.state).toBe("SP");
    expect(farm.totalArea).toBe(100);
    expect(farm.cultivatedArea).toBe(50);
    expect(farm.vegetationArea).toBe(50);
  });

  it("should throw an error if name is missing", () => {
    expect(() =>
      sut.create({
        producerId: "producer-id",
        name: "",
        address: makeAddress(),
        totalArea: 100,
        cultivatedArea: 50,
        vegetationArea: 50,
      }),
    ).toThrow("Name is required and must be at least 2 characters");
  });

  it("should throw an error if total area is less than 0", () => {
    expect(() =>
      sut.create({
        producerId: "producer-id",
        name: "Farm 1",
        address: makeAddress(),
        totalArea: -1,
        cultivatedArea: 50,
        vegetationArea: 50,
      }),
    ).toThrow("Total area must be greater than 0");
  });

  it("should throw an error if cultivated or vegetation area is less than 0", () => {
    expect(() =>
      sut.create({
        producerId: "producer-id",
        name: "Farm 1",
        address: makeAddress(),
        totalArea: 100,
        cultivatedArea: -1,
        vegetationArea: 50,
      }),
    ).toThrow("Cultivated area must be greater or equal to 0");

    expect(() =>
      sut.create({
        producerId: "producer-id",
        name: "Farm 1",
        address: makeAddress(),
        totalArea: 100,
        cultivatedArea: 50,
        vegetationArea: -1,
      }),
    ).toThrow("Vegetation area must be greater or equal to 0");
  });

  it("should throw an error if total area is less than cultivated or vegetation area", () => {
    expect(() =>
      sut.create({
        producerId: "producer-id",
        name: "Farm 1",
        address: makeAddress(),
        totalArea: 100,
        cultivatedArea: 150,
        vegetationArea: 50,
      }),
    ).toThrow("Total area must be greater than cultivated area");
  });
});
