export interface Sensor<T> {
  read(): T;
  subscribe(onValueChange: () => void): () => void;
}
