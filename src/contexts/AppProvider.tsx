import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

import queryClient from '../utils/queryClient';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const localStoragePersister = createSyncStoragePersister({ storage: window.localStorage });
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: localStoragePersister }}>
      {children}
    </PersistQueryClientProvider>
  );
}
