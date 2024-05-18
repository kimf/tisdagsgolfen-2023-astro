export default function delayPromise<T>(promise: Promise<T>, delay: number): Promise<T> {
  return new Promise((resolve, reject) => {
    let status = 'pending';
    let result: any;
    promise
      .then((_result) => {
        if (timeout) {
          result = _result;
          status = 'success';
          return;
        }

        resolve(_result);
      })
      .catch((_result) => {
        if (timeout) {
          result = _result;
          status = 'error';

          return;
        }

        reject(_result);
      });

    let timeout: NodeJS.Timeout | null = setTimeout(() => {
      if (status === 'success') {
        resolve(result);
      } else if (status === 'error') {
        reject(result);
      }

      timeout = null;
    }, delay);
  });
}
