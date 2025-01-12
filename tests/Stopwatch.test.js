import React from 'react';
import {fireEvent, render, within} from '@testing-library/react-native';
import Stopwatch from '../src/Stopwatch';

describe('Stopwatch', () => {
  test('renders initial state correctly', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });

  test('starts and stops the stopwatch', () => {
    const { getByText, queryByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeTruthy();

    fireEvent.press(getByText('Stop'));
    expect(queryByText(/(\d{2}:){2}\d{2}/)).toBeNull();
  });

  test('pauses and resumes the stopwatch', async () => {
    const { getByText } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Pause'));
    const pausedTime = getByText(/(\d{2}:){2}\d{2}/).props.children;

    fireEvent.press(getByText('Resume'));

    // Wait for 2 seconds before checking the expectation (checks if timer actually resumed)
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(getByText(/(\d{2}:){2}\d{2}/).props.children).not.toBe(pausedTime);
  });

  test('records and displays lap times', () => {
    const { getByText, getByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));

    // update test to use react-native testing library methods instead of web-based methods like .toContainElement()
    expect(within(getByTestId('lap-list')).getByText(/(\d{2}:){2}\d{2}/));
    // Should only be one lap time in lap-list
    expect(within(getByTestId('lap-list')).getAllByText(/(\d{2}:){2}\d{2}/).length).toBe(1);

    fireEvent.press(getByText('Lap'));
    expect(within(getByTestId('lap-list')).getAllByText(/(\d{2}:){2}\d{2}/).length).toBe(2);
  });

  test('resets the stopwatch', () => {
    const { getByText, queryByTestId } = render(<Stopwatch />);
    
    fireEvent.press(getByText('Start'));
    fireEvent.press(getByText('Lap'));
    fireEvent.press(getByText('Reset'));

    expect(getByText('00:00:00')).toBeTruthy();
    expect(queryByTestId('lap-list')).toBeNull();
  });
});
