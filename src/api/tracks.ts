import request from './client';

export const getNextTrack = () =>
  request('/next_track');
