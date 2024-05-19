/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type SortingType = 'rank' | 'kr';
type SessionState = 'STARTED' | 'PENDING' | 'CLOSED' | 'FINALPENDING';
type SeasonState = 'REGULAR' | 'FINAL' | 'CLOSED';
type SeasonYear = '2023' | '2024';

type Player = Database['public']['Tables']['profiles']['Row'];

type Hole = Database['public']['Tables']['holes']['Row'];

type Course = Database['public']['Tables']['courses']['Row'] & {
  holes?: Hole[];
};

type ScoringSession = Database['public']['Tables']['sessions']['Row'] & {
  state: SessionState;
  course: Omit<Course, 'events_count'>;
  scorecards: Scorecard[];
};

type NewScoringSession = Omit<
  ScoringSession,
  'id' | 'course_id' | 'created_at' | 'current_hole' | 'owner_id' | 'scorecards'
> & {
  course?: Course;
  scorecards?: Scorecard[];
};

type Score = Database['public']['Tables']['scores']['Row'];
type NewScore = Database['public']['Tables']['scores']['Insert'];

type ScorecardPlayerRow = Database['public']['Tables']['scorecard_player']['Row'];

type Scorecard = Database['public']['Tables']['scorecards']['Row'] & {
  course_id: number;
  players: (ScorecardPlayerRow & { player: Player })[];
  scores: Score[];
};

type ScorecardWithRank = Scorecard & { rank: number };

type TourEvent = Database['public']['Tables']['events']['Row'] & {
  course: Course;
  event_sessions: {
    id: number;
    session: ScoringSession;
  }[];
};
type NewScorecard = Omit<
  Scorecard,
  'id' | 'scores' | 'players' | 'created_at' | 'week_points' | 'team_index'
> & {
  player_ids?: string[];
  team_index?: number;
};

type ActiveSession = Pick<
  ScoringSession,
  'id' | 'owner_id' | 'state' | 'special' | 'strokes' | 'team_event'
> & {
  state: string;
  scorecards: Pick<Scorecard, 'id'> & { players: { player_id: string }[] };
};

type LeaderboardItem = {
  rank?: number;
  id: string;
  points: number;
  average: number;
  beers: number;
  ciders: number;
  fines: number;
  totalFines: number;
  events: number;
  points_array: number[];
  special_array: number[];
  player: Player;
};

type FinalLeaderboardItem = {
  rank?: number;
  id: string;
  points: number;
  start_points: number;
  rounds: number[];
  player: Player;
  to_par: number;
};

type PlayerWithStrokes = Player & { strokes: number };
