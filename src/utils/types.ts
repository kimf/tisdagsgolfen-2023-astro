import type { Database } from './supabase_types';

export type SortingType = 'rank' | 'kr' | 'beers' | 'ciders';
export type SessionState = 'STARTED' | 'PENDING' | 'CLOSED' | 'FINALPENDING';
export type SeasonState = 'REGULAR' | 'FINAL' | 'CLOSED';

export type Player = Database['public']['Tables']['profiles']['Row'];

export type Hole = Database['public']['Tables']['holes']['Row'];

export type Course = Database['public']['Tables']['courses']['Row'] & {
  holes?: Hole[];
};

export type ScoringSession = Database['public']['Tables']['sessions']['Row'] & {
  state: SessionState;
  course: Omit<Course, 'events_count'>;
  scorecards: Scorecard[];
};

export type NewScoringSession = Omit<
  ScoringSession,
  'id' | 'course_id' | 'created_at' | 'current_hole' | 'owner_id' | 'scorecards'
> & {
  course?: Course;
  scorecards?: Scorecard[];
};

export type Score = Database['public']['Tables']['scores']['Row'];
export type NewScore = Database['public']['Tables']['scores']['Insert'];

export type ScorecardPlayerRow = Database['public']['Tables']['scorecard_player']['Row'];

export type Scorecard = Database['public']['Tables']['scorecards']['Row'] & {
  course_id: number;
  players: (ScorecardPlayerRow & { player: Player })[];
  scores: Score[];
};

export type ScorecardWithRank = Scorecard & { rank: number };

export type TourEvent = Database['public']['Tables']['events']['Row'] & {
  course: Course;
  event_sessions: {
    id: number;
    session: ScoringSession;
  }[];
};
export type NewScorecard = Omit<
  Scorecard,
  'id' | 'scores' | 'players' | 'created_at' | 'week_points' | 'team_index'
> & {
  player_ids?: string[];
  team_index?: number;
};

export type ActiveSession = Pick<
  ScoringSession,
  'id' | 'owner_id' | 'state' | 'special' | 'strokes' | 'team_event'
> & {
  state: string;
  scorecards: Pick<Scorecard, 'id'> & { players: { player_id: string }[] };
};

export type LeaderboardItem = {
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

export type FinalLeaderboardItem = {
  rank?: number;
  id: string;
  points: number;
  start_points: number;
  rounds: number[];
  player: Player;
  to_par: number;
};

export type PlayerWithStrokes = Player & { strokes: number };

export type EventItem = Database['public']['Tables']['events']['Row'] & {
  course: Course;
  event_sessions: {
    id: number;
    session: ScoringSession;
  }[];
};
