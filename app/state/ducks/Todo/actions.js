import type from './types';
export const Todo = payload => ({
  type: type.TODO,
  payload,
});
