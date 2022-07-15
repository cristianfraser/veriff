import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import ChecksForm from './ChecksForm';
import { useFetchChecksQuery } from '../../api';

const mockedUseFetchChecks = useFetchChecksQuery as jest.Mock<any>;

jest.mock('../../api');

const props = {
  onSubmit: () => {},
  disabled: false,
};

const CHECK_DATA = [
  {
    id: 'aaa',
    priority: 10,
    description: 'Face on the picture matches face on the document',
  },
  {
    id: 'bbb',
    priority: 5,
    description: 'Veriff supports presented document',
  },
];

const SORTED_CHECK_DATA = [...CHECK_DATA].sort(
  (a, b) => a.priority - b.priority
);

describe('ChecksForm', () => {
  beforeEach(() => {
    mockedUseFetchChecks.mockImplementation(() => ({
      isLoading: true,
      checks: [],
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ChecksForm {...props} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Loading')).toBeVisible();
  });

  test('renders checks in sorted order', async () => {
    mockedUseFetchChecks.mockImplementation(() => ({
      isLoading: false,
      checks: CHECK_DATA,
    }));

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ChecksForm {...props} />
      </QueryClientProvider>
    );

    expect(screen.queryByText('Loading')).toBeFalsy();

    const checkItems = screen.getAllByTestId('check-item');

    checkItems.forEach((checkItem, index) => {
      expect(
        checkItem.textContent?.includes(SORTED_CHECK_DATA[index].description)
      ).toBeTruthy();
    });

    expect(checkItems[0]).not.toHaveClass('disabled');
    expect(checkItems[1]).toHaveClass('disabled');
  });

  test('enables next check', async () => {
    mockedUseFetchChecks.mockImplementation(() => ({
      isLoading: false,
      checks: CHECK_DATA,
    }));

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ChecksForm {...props} />
      </QueryClientProvider>
    );

    const checkItems = screen.getAllByTestId('check-item');
    expect(checkItems[0]).not.toHaveClass('disabled');
    expect(checkItems[1]).toHaveClass('disabled');

    const firstCheck = within(checkItems[0]);
    fireEvent.click(firstCheck.getByText('No'));

    expect(checkItems[0]).not.toHaveClass('disabled');
    expect(checkItems[1]).toHaveClass('disabled');

    fireEvent.click(firstCheck.getByText('Yes'));

    expect(checkItems[0]).not.toHaveClass('disabled');
    expect(checkItems[1]).not.toHaveClass('disabled');
  });

  test('enables submit', async () => {
    mockedUseFetchChecks.mockImplementation(() => ({
      isLoading: false,
      checks: CHECK_DATA,
    }));

    const handleSubmit = jest.fn();

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ChecksForm {...props} onSubmit={handleSubmit} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Submit')).toBeDisabled();

    const checkItems = screen.getAllByTestId('check-item');

    const firstCheck = within(checkItems[0]);
    const secondCheck = within(checkItems[1]);

    fireEvent.click(firstCheck.getByText('No'));
    expect(screen.getByText('Submit')).not.toBeDisabled();

    fireEvent.click(firstCheck.getByText('Yes'));
    expect(screen.getByText('Submit')).toBeDisabled();

    fireEvent.click(secondCheck.getByText('Yes'));
    expect(screen.getByText('Submit')).not.toBeDisabled();

    fireEvent.click(secondCheck.getByText('No'));
    expect(screen.getByText('Submit')).not.toBeDisabled();

    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('disabled submit does nothing', async () => {
    const handleSubmit = jest.fn();

    mockedUseFetchChecks.mockImplementation(() => ({
      isLoading: false,
      checks: CHECK_DATA,
    }));

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <ChecksForm {...props} onSubmit={handleSubmit} />
      </QueryClientProvider>
    );

    expect(screen.getByText('Submit')).toBeDisabled();

    fireEvent.click(screen.getByText('Submit'));
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
});
