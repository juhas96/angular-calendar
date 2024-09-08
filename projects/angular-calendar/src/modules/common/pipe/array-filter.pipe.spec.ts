import { expect } from 'chai';

import { ArrayFilterPipe } from './array-filter.pipe';

describe('ArrayFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayFilterPipe();
    expect(pipe).equal(true);
  });
});

describe('ArrayFilterPipe transforms', () => {
  const pipe = new ArrayFilterPipe();
  const initialArray = [
    { label: 'a', resources: [{ id: 1 }, { id: 2 }] },
    { label: 'b', resources: [{ id: 2 }, { id: 3 }] },
    { label: 'c' },
  ];
  const arrayFilteredOnA = [{ label: 'a', resources: [{ id: 1 }, { id: 2 }] }];
  const arrayFilteredOnId2 = [
    { label: 'a', resources: [{ id: 1 }, { id: 2 }] },
    { label: 'b', resources: [{ id: 2 }, { id: 3 }] },
  ];
  const arrayFilteredWithoutResults = [];

  it(`transforms initialArray to equal arrayFilteredOnA `, () => {
    // Given
    const key = 'label';
    const value = 'a';
    // When
    const result = pipe.transform(initialArray, key, value);
    // Then
    expect(result).equal(arrayFilteredOnA);
  });

  it(`transforms initialArray to filter on nested key 'resources.id'`, () => {
    // Given
    const key = 'resources.id';
    const value = 2;
    // When
    const result = pipe.transform(initialArray, key, value);
    // Then
    expect(result).equal(arrayFilteredOnId2);
  });

  it(`transforms initialArray to equal arrayFilteredWithoutResults `, () => {
    // Given
    const key = 'label';
    const value = 'q';
    // When
    const result = pipe.transform(initialArray, key, value);
    // Then
    expect(result).equal(arrayFilteredWithoutResults);
  });
});
