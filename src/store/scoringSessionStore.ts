import { observable } from '@legendapp/state';
import { configureSynced } from '@legendapp/state/sync';
import { syncedFetch } from '@legendapp/state/sync-plugins/fetch';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';

interface Course {
  id: number;
  name: string;
  club: string;
  par: number;
  holesCount: number;
}

// Type your Store interface
interface ScoringSession {
  id: string;
  course: Course;
  special: boolean;
  strokes: boolean;
  teamEvent: boolean;
  state: string;
  currentHole: number;
  partOfFinal: boolean;
}

interface Store {
  activeSession: ScoringSession | null;
  completedHoles: number;
  createScoringSession: (
    course: Course,
    special?: boolean,
    strokes?: boolean,
    teamEvent?: boolean,
    partOfFinal?: boolean
  ) => void;
  deleteScoringSession: () => void;
}

// TODO: Change to real implementation
const uuid = () => Math.floor(Math.random() * 1000).toString();

const mySyncedFetch = configureSynced(syncedFetch, {
  persist: {
    plugin: ObservablePersistLocalStorage,
    retrySync: true
  },
  retry: {
    infinite: true
  }
});

export const store$ = observable<Store>({
  activeSession: mySyncedFetch({
    get: '/api/activesession.json',
    set: '/api/activesession.json',
    setInit: { method: 'PUT' },
    persist: {
      name: 'activeSession'
    },
    mode: 'assign'
  }),

  completedHoles: (): number => {
    return store$.activeSession.get()?.currentHole || 0;
  },
  createScoringSession: (
    course: Course,
    special = false,
    strokes = false,
    teamEvent = false,
    partOfFinal = false
  ) => {
    store$.activeSession.set({
      id: uuid(),
      course,
      special,
      strokes,
      teamEvent,
      state: 'active',
      currentHole: 1,
      partOfFinal
    });
  },
  deleteScoringSession: () => {
    store$.activeSession.set(null);
  }
});
