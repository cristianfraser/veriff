import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckItem from './CheckItem';

const props = {
  check: {},
  disabled: false,
  onChange: () => {},
  value: undefined,
  setActive: () => {},
  isActive: false,
};

test('default state', async () => {
  render(<CheckItem {...props} />);

  expect(screen.getByText('Yes')).not.toBeDisabled();
  expect(screen.getByText('No')).not.toBeDisabled();
});

test('disabled state', async () => {
  render(<CheckItem {...props} disabled />);

  expect(screen.getByText('Yes')).toBeDisabled();
  expect(screen.getByText('No')).toBeDisabled();
});

test('yes state', async () => {
  render(<CheckItem {...props} value={'yes'} />);

  expect(screen.getByText('Yes')).toHaveClass('selected');
  expect(screen.getByText('No')).not.toHaveClass('selected');
});

test('no state', async () => {
  render(<CheckItem {...props} value={'no'} />);

  expect(screen.getByText('Yes')).not.toHaveClass('selected');
  expect(screen.getByText('No')).toHaveClass('selected');
});

test('clicking calls onChange and setActive prop', async () => {
  const handleChange = jest.fn();
  const setActive = jest.fn();
  render(
    <CheckItem {...props} onChange={handleChange} setActive={setActive} />
  );

  fireEvent.click(screen.getByText('Yes'));

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(setActive).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByText('No'));

  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(setActive).toHaveBeenCalledTimes(2);
});
