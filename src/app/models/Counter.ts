export interface Counter {
  type: string;
  value: number;
  max: number;
}

export const EMPTY_COUNTER: Counter = {
  type: '',
  value: 0,
  max: 0,
};
