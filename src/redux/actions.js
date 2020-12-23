import { LOAD, UPDATE, ADD, REMOVE, SEARCH } from './types';

export const load = payload => ({
  type: LOAD,
  payload
});

export const update = payload => ({
  type: UPDATE,
  payload
});

export const add = payload => ({
  type: ADD,
  payload
});

export const remove = payload => ({
  type: REMOVE,
  payload
});

export const search = payload => ({
  type: SEARCH,
  payload
});
