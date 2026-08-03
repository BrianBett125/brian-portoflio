import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CopyEmail from '../components/CopyEmail';

// Mock sonner so the toast call does not require the Toaster to be mounted.
jest.mock('sonner', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));
import { toast } from 'sonner';

describe('CopyEmail', () => {
  const EMAIL = 'brianbett756@gmail.com';

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  test('renders the email in the button label', () => {
    render(<CopyEmail email={EMAIL} />);
    expect(screen.getByRole('button', { name: new RegExp(EMAIL) })).toBeInTheDocument();
  });

  test('copies the email and shows the copied state + toast', async () => {
    render(<CopyEmail email={EMAIL} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(EMAIL);
    });
    expect(await screen.findByText('Copied')).toBeInTheDocument();
    expect(toast.success).toHaveBeenCalledWith('Email copied to clipboard');
  });

  test('shows an error toast when the clipboard write fails', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValueOnce(new Error('denied'));
    render(<CopyEmail email={EMAIL} />);
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test('meets the 44px touch target via min-h-11', () => {
    render(<CopyEmail email={EMAIL} />);
    expect(screen.getByRole('button').className).toContain('min-h-11');
  });
});
