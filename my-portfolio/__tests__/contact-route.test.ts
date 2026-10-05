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
    jest.clearAllMocks();
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

  test('returns 200 and calls resend when config is present and input is valid', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_FROM_EMAIL = 'sender@example.com';
    sendMock.mockResolvedValue({ id: 'test-id' });

    const request = {
      json: async () => ({
        email: 'hello@example.com',
        message: 'This is a test message that is long enough.',
      }),
    } as unknown as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ message: 'Message sent successfully!' });
    expect(sendMock).toHaveBeenCalledWith({
      from: 'sender@example.com',
      to: 'brianbett756@gmail.com',
      replyTo: 'hello@example.com',
      subject: 'New portfolio contact from hello@example.com',
      text: 'Email: hello@example.com\n\nNotes:\nThis is a test message that is long enough.',
    });
    expect(sendMock).toHaveBeenCalledWith({
      from: 'sender@example.com',
      to: 'hello@example.com',
      replyTo: 'brianbett756@gmail.com',
      subject: 'Thanks for reaching out to Brian',
      text: 'Thanks for your message. I received it and will get back to you as soon as I can.',
    });
  });

  test('returns 400 when validation fails', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_FROM_EMAIL = 'sender@example.com';

    const request = {
      json: async () => ({
        email: 'invalid-email',
        message: 'short',
      }),
    } as unknown as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBeDefined();
    expect(body.error.length).toBe(2); // Two validation errors
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('silently accepts honeypot submissions without sending email', async () => {
    const request = {
      json: async () => ({
        email: 'bot@example.com',
        message: 'This is a bot submission with enough characters.',
        website: 'https://spam.invalid',
      }),
    } as unknown as Request;

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  test('rate limits repeated requests by client address', async () => {
    process.env.RESEND_API_KEY = 'test-key';
    process.env.RESEND_FROM_EMAIL = 'sender@example.com';
    sendMock.mockResolvedValue({ id: 'test-id' });
    const makeRequest = () => ({
      headers: new Headers({ 'x-forwarded-for': '198.51.100.77' }),
      json: async () => ({ email: 'hello@example.com', message: 'This is a test message that is long enough.' }),
    }) as Request;

    let response: Response | undefined;
    for (let index = 0; index < 6; index += 1) response = await POST(makeRequest());
    expect(response?.status).toBe(429);
    expect(response?.headers.get('Retry-After')).toBeTruthy();
  });
});
