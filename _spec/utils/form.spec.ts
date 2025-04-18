import { z } from 'zod';
import { createForm } from '../../src/utils/form';

describe('createForm', () => {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number().positive()
  });

  it('returns default fields and data for GET requests', async () => {
    const request = new Request('http://localhost', { method: 'GET' });
    const result = await createForm(schema, request);
    expect(result.isValid).toBe(false);
    expect(result.fields.name).toBeDefined();
    expect(result.fields.age).toBeDefined();
    expect(result.data).toEqual({ name: undefined, age: undefined });
  });

  it('validates and parses data for POST requests', async () => {
    const formData = new FormData();
    formData.append('name', 'Kim');
    formData.append('age', '33');
    formData.append('email', 'kim@fransman.se');
    const request = new Request('http://localhost', {
      method: 'POST',
      body: formData
    });
    // Patch: node-fetch Request does not support .formData(), so we mock it
    request.formData = async () => formData;
    request.clone = () => request;

    const result = await createForm(schema, request);
    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({
      name: 'Kim',
      age: 33,
      email: 'kim@fransman.se'
    });
    expect(result.errors).toEqual({});
  });

  it('returns errors for invalid POST data', async () => {
    const formData = new FormData();
    formData.append('name', '');
    formData.append('age', '-5');
    formData.append('email', 'kim.fransman.se');
    const request = new Request('http://localhost', {
      method: 'POST',
      body: formData
    });
    request.formData = async () => formData;
    request.clone = () => request;

    const result = await createForm(schema, request);
    expect([result.errors.name?.message]).toContain('This is required');
    expect(result.errors.age?.message).toContain('Number must be greater than 0');
    expect(result.errors.email?.message).toContain('Invalid email');
  });
});
