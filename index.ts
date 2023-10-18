export function builderFactory<R>(generator: () => R) {
  return () => {
    return generator()
  }
}
