import request from './client';

export const login = (username: string, password: string) =>
  request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const register = (username: string, password: string) =>
  request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

export const refresh = (refreshToken: string) =>
  request('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh: refreshToken }),
  });
