import { Address } from "./address";

const sut = Address;

describe('Address VO', () => {
  it('should create a valid address', () => {
    const address = sut.create({ city: 'São Paulo', state: 'SP' });
    expect(address.city).toBe('São Paulo');
    expect(address.state).toBe('SP');
  });

  it('should throw an error if city is missing', () => {
    expect(() => sut.create({ city: '', state: 'SP' })).toThrow('City is required and must be at least 2 characters');
  });

  it('should throw an error if state is missing', () => {
    expect(() => sut.create({ city: 'São Paulo', state: '' })).toThrow('State is invalid or missing');
  });
});