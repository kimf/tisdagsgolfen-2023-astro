export function cacheable<T, TProducer extends Producer<T>>(producer: TProducer): TProducer {
  /* May store args and result on fn like this:
   * fn.lastArgs = ...
   * fn.lastResult = ...
   */
  let lastArgs: Parameters<TProducer> | undefined[] = [];
  let lastResult = null;

  const eq = (args1, args2) => {
    if (!args1 || !args2 || args1.length !== args2.length) {
      return false;
    }
    return args1.every((arg, index) => arg === args2[index]);
  };

  const wrapper = (...args: Parameters<TProducer>) => {
    if (eq(args, lastArgs)) {
      // tslint:disable:next-line no-console
      // console.log(`> from cache - ${args.join(',')} - ${lastResult}`);
      return lastResult;
    }

    const result = producer(...args);
    lastArgs = args;
    lastResult = result;
    return result;
  };

  return wrapper as TProducer;
}
