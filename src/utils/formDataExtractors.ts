export function extractPlayers(formData: FormData | null) {
  if (!formData) {
    return null;
  }

  const players: Record<string, { id: string; strokes: string }> = {};
  for (const [key, value] of formData.entries()) {
    // Match keys like players[0][id] or players[0]['strokes']
    const match = key.match(/^players\[(\d+)\]\[(?:'|")?(\w+)(?:'|")?\]$/);
    if (match) {
      const idx = match[1];
      const prop = match[2];
      players[idx] = players[idx] || {};
      (players[idx] as Record<'id' | 'strokes', string>)[prop as 'id' | 'strokes'] =
        value as string;
    }
  }
  // Convert to array and filter out incomplete entries
  return Object.values(players).filter((p) => p.id);
}

export function extractTeams(formData: FormData | null) {
  if (!formData) {
    return null;
  }

  const teams: Record<string, { strokes: string; players: string[] }> = {};
  for (const [key, value] of formData.entries()) {
    // Match keys like teams[0][strokes] or teams[0][players]
    const match = key.match(/^teams\[(\d+)\]\[(?:'|")?(\w+)(?:'|")?\]$/);
    if (match) {
      const idx = match[1];
      const prop = match[2];
      teams[idx] = teams[idx] || {};
      if (prop === 'players') {
        teams[idx].players = (value as string).split(',').filter(Boolean);
      } else if (prop === 'strokes') {
        teams[idx].strokes = value as string;
      }
    }
  }
  // Convert to array and filter out incomplete entries
  return Object.values(teams).filter((t) => t.players && t.players.length > 0);
}
