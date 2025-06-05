import { Document } from "./document";

const sut = Document;

describe("Document VO", () => {
  it("should create a valid CPF without mask", () => {
    const doc = sut.create("52998224725");
    expect(doc.isCpf()).toBe(true);
    expect(doc.value).toBe("52998224725");
    expect(doc.getFormatted()).toBe("529.982.247-25");
  });

  it("should create a valid CPF with mask", () => {
    const doc = sut.create("529.982.247-25");
    expect(doc.isCpf()).toBe(true);
    expect(doc.value).toBe("52998224725");
    expect(doc.getFormatted()).toBe("529.982.247-25");
  });

  it("should create a valid CNPJ without mask", () => {
    const doc = sut.create("27865757000102");
    expect(doc.isCnpj()).toBe(true);
    expect(doc.value).toBe("27865757000102");
    expect(doc.getFormatted()).toBe("27.865.757/0001-02");
  });

  it("should create a valid CNPJ with mask", () => {
    const doc = sut.create("27.865.757/0001-02");
    expect(doc.isCnpj()).toBe(true);
    expect(doc.value).toBe("27865757000102");
    expect(doc.getFormatted()).toBe("27.865.757/0001-02");
  });

  it("should throw an error if CPF is invalid", () => {
    expect(() => sut.create("123.456.789-00")).toThrow("Invalid Document");
    expect(() => sut.create("12345678900")).toThrow("Invalid Document");
  });

  it("should throw an error if CNPJ is invalid", () => {
    expect(() => sut.create("12.345.678/0001-00")).toThrow("Invalid Document");
    expect(() => sut.create("12345678000100")).toThrow("Invalid Document");
  });

  it("should throw an error if document has invalid length", () => {
    expect(() => sut.create("123456789")).toThrow("Invalid Document");
    expect(() => sut.create("123456789012")).toThrow("Invalid Document");
  });

  it("should compare two equal documents", () => {
    const doc1 = sut.create("529.982.247-25");
    const doc2 = sut.create("52998224725");

    expect(doc1.equals(doc2)).toBe(true);
  });

  it("should compare two different documents", () => {
    const doc1 = sut.create("529.982.247-25");
    const doc2 = sut.create("27865757000102");

    expect(doc1.equals(doc2)).toBe(false);
  });
});
