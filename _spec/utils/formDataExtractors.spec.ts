import { extractPlayers, extractTeams } from '../../src/utils/formDataExtractors';

describe('extractPlayers', () => {
  it('returns null for null input', () => {
    expect(extractPlayers(null)).toBeNull();
  });

  it('extracts players from FormData', () => {
    const formData = new FormData();
    formData.append('players[0][id]', '1');
    formData.append("players[0]['strokes']", '5');
    formData.append('players[1][id]', '2');
    formData.append("players[1]['strokes']", '7');
    const result = extractPlayers(formData);
    expect(result).toEqual([
      { id: '1', strokes: '5' },
      { id: '2', strokes: '7' }
    ]);
  });

  it('filters out incomplete player entries', () => {
    const formData = new FormData();
    formData.append('players[0][id]', '1');
    // players[0]['strokes'] missing
    formData.append("players[1]['strokes']", '7');
    // players[1][id] missing
    const result = extractPlayers(formData);
    expect(result).toEqual([{ id: '1' }]);
  });
});

describe('extractTeams', () => {
  it('returns null for null input', () => {
    expect(extractTeams(null)).toBeNull();
  });

  it('extracts teams from FormData', () => {
    const formData = new FormData();
    formData.append('teams[0][strokes]', '10');
    formData.append('teams[0][players]', '1,2');
    formData.append('teams[1][strokes]', '5');
    formData.append('teams[1][players]', '3');
    const result = extractTeams(formData);
    expect(result).toEqual([
      { strokes: '10', players: ['1', '2'] },
      { strokes: '5', players: ['3'] }
    ]);
  });

  it('filters out teams with no players', () => {
    const formData = new FormData();
    formData.append('teams[0][strokes]', '10');
    formData.append('teams[0][players]', ''); // no players
    formData.append('teams[1][strokes]', '5');
    formData.append('teams[1][players]', '3');
    const result = extractTeams(formData);
    expect(result).toEqual([{ strokes: '5', players: ['3'] }]);
  });
});
