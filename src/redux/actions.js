
import { INIT, UPDATE, ADD, REMOVE, SEARCH } from './types';

export function init(params) {
  return {
    type: INIT,
    params
  };
}

export function update(params) {
  return {
    type: UPDATE,
    params
  };
}


export function add(params) {
  return {
    type: ADD,
    params
  };
}


export function remove(params) {
  return {
    type: REMOVE,
    params
  };
}

export function search(params) {
  return {
    type: SEARCH,
    params
  };
}
