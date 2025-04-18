import { describe, it, expect } from 'vitest';
import { shortName } from '../../src/utils/formatters';

describe('shortName', () => {
  it('returns first name and initial of last name', () => {
    expect(shortName('Anna Svensson')).toBe('Anna S');
    expect(shortName('Bo Li')).toBe('Bo L');
    expect(shortName('Carl Oskarsson')).toBe('Carl O');
  });

  it('handles names with more than two parts', () => {
    expect(shortName('Eva Maria Johansson')).toBe('Eva M');
  });

  it('handles names with just one part', () => {
    expect(shortName('Fredrik')).toBe('Fredrik');
  });
});
