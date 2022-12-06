import '@testing-library/jest-dom/extend-expect';
import {
  useFocusTrapWithRef,
  convertToIntOrFallback,
} from './useFocusTrapWithRef';
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const MockComponent = () => {
  const [focusTrapRef] = useFocusTrapWithRef();
  return (
    <div >
      <button>exterior button</button>
      <div id="focusTrapContainer" ref={focusTrapRef}>
        <button>button1</button>
        <button>button2</button>
      </div>
    </div>
  );
};
describe('use focus trap', () => {
  test('should run 508 functions without error', () => {
    try {
      useFocusTrapWithRef();
      convertToIntOrFallback('11', 0);
      expect(true);
    } catch {
      expect(false);
    }
  });
  test('focus trap should keep focus within container', () => {
    const {getByText} = render(<MockComponent />)
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    userEvent.tab();
    expect(getByText('button1')).toHaveFocus();
  });

  test('convertToIntOrFallback should return fallback if first argument is not a number', () => {
    const result = convertToIntOrFallback('11', 0);
    expect(result).toBe(0);
  });

  test('convertToIntOrFallback should return parsed first argument if it is a number', () => {
    const result = convertToIntOrFallback(11, 0);
    expect(result).toBe(11);
  });

  test('convertToIntOrFallback should return fallback first argument if it is not a whole number', () => {
    const result = convertToIntOrFallback(11.5, 0);
    expect(result).toBe(0);
  });
});
