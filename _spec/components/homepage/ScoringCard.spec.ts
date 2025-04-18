import { createSession, renderAstroComponent } from '_spec/helpers';
import ScoringCard from 'src/components/homepage/ScoringCard.astro';
import * as getActiveSessions from 'src/db/queries/getActiveSessions';

vi.mock('src/db/queries/getActiveSessions');

const fakeActiveSession = {
  id: 1,
  ownerId: 1,
  courseId: 1,
  createdAt: null,
  special: 1,
  strokes: 1,
  teamEvent: 0,
  state: 'STARTED',
  currentHole: 2,
  partOfFinal: 0
};

describe('ScoringCard', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('if no user', async () => {
    const result = await renderAstroComponent(ScoringCard);
    expect(result).toContain('LOGGA IN');
  });

  // test('if user and no activeSession', async () => {
  //   const session = createSession();
  //   session.set('userId', '1');
  //   vi.mocked(getActiveSessions.userActiveSession).mockResolvedValue(null);
  //   const result = await renderAstroComponent(ScoringCard), {request };
  //   expect(result).toContain('LOGGA IN');
  //   expect(result).toContain('NY RUNDA');
  // });

  // test('accepts a custom initial count', async () => {
  //   const result = await renderAstroComponent(Counter, { props: { initialCount: '4' } });
  //   const currentCount = result.querySelector('[data-current-count]');

  //   expect(currentCount).not.toBeNull();
  //   expect(currentCount!.textContent).toEqual('4');
  // });
});
