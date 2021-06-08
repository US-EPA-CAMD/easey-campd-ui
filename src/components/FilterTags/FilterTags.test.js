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

  test('event handlers', () => {
    fireEvent.click(getByText('test: test'));
    expect(mockHandler.onClick).toHaveBeenCalled();

    fireEvent.click(getByTestId('remove'));
    expect(mockHandler.onRemove).toHaveBeenCalled();

    fireEvent.click(getByText('Clear All'));
    expect(mockHandler.onClearAll).toHaveBeenCalled();
  });
});
