export async function retryPromise<T>(
  promise: () => Promise<T>,
  count = 3,
  timeBetweenInSeconds = 1,
  isResultValid: (t: T) => boolean = (t) => true,
) {
  let lastError = new Error();
  for (let i = 0; i < count; i++) {
    const lastTry = i === count - 1;
    try {
      const result = await promise();

      if (isResultValid(result) || lastTry) {
        return result;
      }
      await wait(timeBetweenInSeconds);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function wait<T = any>(seconds: number, t?: T) {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(t);
    }, seconds);
  });
}
