import { cacheable } from '../cacheable';
import standardCompRank from '../standardCompetitionRanking';

const WINNER_POINTS = [8, 5, 3, 1];

function buildFinalLeaderboardItems(
  scorecards: Scorecard[],
  players: Player[],
  seasonWinners: string[]
) {
  const leaderboardItems: FinalLeaderboardItem[] = [];

  for (const player of players) {
    const playerScorecards = scorecards.filter((s) =>
      s.players.flatMap((p) => p.player).find((p) => p.id === player.id)
    );

    if (playerScorecards.length === 0) {
      continue;
    }

    const winnerIndex = seasonWinners.findIndex((p) => p === player.id);
    const start_points = winnerIndex !== -1 ? WINNER_POINTS[winnerIndex] : 0;
    const toPar = playerScorecards.reduce((a, b) => a + (b.through * 2 - b.points), 0);
    leaderboardItems.push({
      id: player.id,
      player,
      points: playerScorecards.reduce((a, b) => a + b.points, 0) + start_points,
      rounds: playerScorecards.map((s) => s.points),
      start_points,
      to_par: toPar - start_points,
    });
  }

  const sortedPlayers = standardCompRank(leaderboardItems, 'to_par', 'rank', true, null);

  return sortedPlayers;
}

const cachedBuilder = cacheable(
  (scorecards: Scorecard[], players: Player[], seasonWinners: string[]) =>
    buildFinalLeaderboardItems(scorecards, players, seasonWinners)
);

export default cachedBuilder;
