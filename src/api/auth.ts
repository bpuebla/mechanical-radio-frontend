import request from './client';

export const login = (email: string, password: string) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const register = (email: string, password: string) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const refresh = (refreshToken: string) =>
  request('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
  });
