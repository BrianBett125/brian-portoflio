/** @jest-environment node */

import { POST } from '../app/api/contact/route';

const sendMock = jest.fn();

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: sendMock,
    },
  })),
}));

describe('POST /api/contact', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...originalEnv };
    delete process.env.RESEND_API_KEY;
    delete process.env.RESEND_FROM_EMAIL;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('returns a mailto fallback when the resend env is not configured', async () => {
    const request = {
      json: async () => ({
        email: 'hello@example.com',
        message: 'This is a test message that is long enough.',
      }),
    } as unknown as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({
      error: 'Email service is not configured.',
      fallback: 'mailto',
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('returns a mailto fallback when the resend sender is not configured', async () => {
    process.env.RESEND_API_KEY = 'test-key';

    const request = {
      json: async () => ({
        email: 'hello@example.com',
        message: 'This is a test message that is long enough.',
      }),
    } as unknown as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({
      error: 'Email sender is not configured.',
      fallback: 'mailto',
    });
    expect(sendMock).not.toHaveBeenCalled();
  });
});
