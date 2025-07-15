import useAuth from '../store/useAuth'; // adjust path as needed

const BASE_URL = 'http://192.168.1.132:80';

const request = async (path: string, options: RequestInit = {}) => {
  const token = useAuth.getState().tokens?.accessToken;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) throw new Error(`http error ${res.status}`);
  return res.json();
};

export default request;
