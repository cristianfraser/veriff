import React, { ReactElement } from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  renderHook,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import CheckItem from './ChecksItem';

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

  // fireEvent.click(screen.getByText('Load Greeting'))

  // await waitFor(() => screen.getByRole('heading'))
  expect('sadf').toBeDefined();
  //expect(screen.getByText('yes')).not.toBeDisabled();
  //expect(screen.getByText('no')).not.toBeDisabled();
});
