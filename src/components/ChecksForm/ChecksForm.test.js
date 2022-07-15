import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ChecksForm from './ChecksForm';
import { useFetchChecksQuery } from '../../api';

const props = {
  onSubmit: () => {},
  disabled: false,
};

test('default state', async () => {
  render(<ChecksForm {...props} />);

  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  const { result, waitFor } = renderHook(() => useFetchChecksQuery(), {
    wrapper,
  });

  await waitFor(() => result.current.isSuccess);

  expect(result.current.data).toEqual('Hello');

  expect(screen.getByText('Yes')).not.toBeDisabled();
  expect(screen.getByText('No')).not.toBeDisabled();
});
