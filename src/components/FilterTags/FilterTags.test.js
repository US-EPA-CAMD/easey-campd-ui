import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as React from 'react';

import FilterTags from './FilterTags';

const mockHandler = {
    onClick: jest.fn(),
    onRemove: jest.fn(),
    onClearAll: jest.fn(),
}

describe('FilterTags', () => {
  test('event handlers', () => {
    const items = [{ key: 'test', values: ['test'] }];
    const query = render(
      <FilterTags
        items={items}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
        onClearAll={mockHandler.onClearAll}
      />
    );
    const { getByText, getByTestId } = query;

    fireEvent.click(getByText('test: test'));
    expect(mockHandler.onClick).toHaveBeenCalled();

    fireEvent.click(getByTestId('remove'));
    expect(mockHandler.onRemove).toHaveBeenCalled();

    fireEvent.click(getByText('Clear All'));
    expect(mockHandler.onClearAll).toHaveBeenCalled();
  });

  test('two items', () => {
    const items = [{ key: 'test', values: ['test', 'test2'] }];
    const query = render(
      <FilterTags
        items={items}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
        onClearAll={mockHandler.onClearAll}
      />
    );
    const { getByText } = query;
    expect(getByText('test (2)')).toBeTruthy();
  })

  test('time period', () => {
    const items = [{ key: 'Time Period', values: ['testing time period'] }];
    const query = render(
      <FilterTags
        items={items}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
        onClearAll={mockHandler.onClearAll}
      />
    );
    const { getByText } = query;

    expect(getByText('testing time period')).toBeTruthy();
  })

  test('multiple years', () => {
    const items = [{ key: 'Year', values: ['test1', 'test2'] }];
    const query = render(
      <FilterTags
        items={items}
        onClick={mockHandler.onClick}
        onRemove={mockHandler.onRemove}
        onClearAll={mockHandler.onClearAll}
      />
    );
    const { getByText } = query;

    expect(getByText('Year')).toBeTruthy();
  })
});
