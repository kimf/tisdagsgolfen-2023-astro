import { cacheable } from './cacheable';
import standardCompRank from './standardCompetitionRanking';

function buildLeaderboardItems(sessions: ScoringSession[], players: Player[]) {
  const leaderboardItems: LeaderboardItem[] = [];

  const specialSessions = sessions.filter((s) => s.special);
  const regularSessions = sessions.filter((s) => !s.special);

  const scorecards = sessions.flatMap((session) => session.scorecards);
  const specialScorecards = specialSessions.flatMap((session) => session.scorecards);
  const regularScorecards = regularSessions.flatMap((session) => session.scorecards);

  for (const player of players) {
    const playerScorecards = scorecards.filter((s) =>
      s.players.flatMap((p) => p.player).find((p) => p.id === player.id)
    );

    if (playerScorecards.length === 0) {
      continue;
    }

    const allPlayerRegularScorecards = regularScorecards.filter((s) =>
      s.players.flatMap((p) => p.player).find((p) => p.id === player.id)
    );

    const playerRegularScorecards = regularScorecards
      .filter((s) => s.players.flatMap((p) => p.player).find((p) => p.id === player.id))
      .sort((a, b) => b.week_points - a.week_points)
      .slice(0, 4);
    const playerSpecialScorecards = specialScorecards
      .filter((s) => s.players.flatMap((p) => p.player).find((p) => p.id === player.id))
      .sort((a, b) => b.week_points - a.week_points)
      .slice(0, 2);

    const playerRegularPointsArray = playerRegularScorecards.map((s) => s.week_points);
    const playerSpecialPointsArray = playerSpecialScorecards.map((s) => s.week_points);

    const beers = playerScorecards.length
      ? playerScorecards.reduce((a, b) => a + b.players.reduce((a, b) => a + b.beers, 0), 0)
      : 0;

    const ciders = playerScorecards.length
      ? playerScorecards.reduce((a, b) => a + b.players.reduce((a, b) => a + b.ciders, 0), 0)
      : 0;

    const fines = playerScorecards.length
      ? playerScorecards.reduce((a, b) => a + b.players.reduce((a, b) => a + b.fines, 0), 0)
      : 0;

    const totalFines = fines - beers * 50 - ciders * 25;

    leaderboardItems.push({
      id: player.id,
      player,
      points: [...playerRegularPointsArray, ...playerSpecialPointsArray].reduce((a, b) => a + b, 0),
      average: allPlayerRegularScorecards.length
        ? allPlayerRegularScorecards.reduce((a, b) => a + b.points, 0) /
          allPlayerRegularScorecards.length
        : 0,
      beers,
      ciders,
      fines,
      totalFines,
      events: playerScorecards.length,
      points_array: playerRegularPointsArray,
      special_array: playerSpecialPointsArray,
    });
  }

  const finesPlayers = standardCompRank(leaderboardItems, 'totalFines') as LeaderboardItem[];
  const sortedPlayers = standardCompRank(leaderboardItems, 'points', false) as LeaderboardItem[];

  return {
    kr: finesPlayers,
    rank: sortedPlayers,
  };
}

const cachedBuilder = cacheable((sessions: ScoringSession[], players: Player[]) =>
  buildLeaderboardItems(sessions, players)
);

export default cachedBuilder;
