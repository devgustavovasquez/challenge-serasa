import { Crop } from "./crop";

const sut = Crop;

describe("Crop VO", () => {
  it("should create a valid crop", () => {
    const crop = sut.create({
      name: "Tomate",
      year: 2022,
      production: 1000,
    });
    expect(crop.name).toBe("Tomate");
    expect(crop.year).toBe(2022);
    expect(crop.production).toBe(1000);
    expect(crop.slug).toBe("tomate-2022");
  });

  it("should throw an error if name is missing", () => {
    expect(() =>
      sut.create({
        name: "",
        year: 2022,
        production: 1000,
      }),
    ).toThrow("Name is required and must be at least 2 characters");
  });

  it("should throw an error if production is less than 0", () => {
    expect(() =>
      sut.create({
        name: "Tomate",
        year: 2022,
        production: -1,
      }),
    ).toThrow("Production must be greater than 0");
  });

  it("should throw an error if year is less than or equal to 0", () => {
    expect(() =>
      sut.create({
        name: "Tomate",
        year: 0,
        production: 1000,
      }),
    ).toThrow("Year must be greater than 0");
  });
});
