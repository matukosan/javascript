import { useEffect, useState } from 'react';

export function useDelayUnmount<T>(isMounted: T, delayTime: number) {
  const [shouldRender, setShouldRender] = useState<T | undefined>();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(isMounted), delayTime);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(undefined), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}
