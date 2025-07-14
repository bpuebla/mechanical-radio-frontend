const BASE_URL = 'http://192.168.1.132:80';

const request = async (path: string, options: RequestInit = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) throw new Error(`http error ${res.status}`);
  return res.json();
};

export default request;
