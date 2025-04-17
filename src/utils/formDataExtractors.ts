export function extractPlayers(formData: FormData | null) {
  if (!formData) {
    return null;
  }

  const players: Record<string, { id?: string; strokes?: string }> = {};
  for (const [key, value] of formData.entries()) {
    // Match keys like players[0][id] or players[0]['strokes']
    const match = key.match(/^players\[(\d+)\]\[(?:'|")?(\w+)(?:'|")?\]$/);
    if (match) {
      const idx = match[1];
      const prop = match[2];
      players[idx] = players[idx] || {};
      (players[idx] as Record<'id' | 'strokes', string | undefined>)[prop as 'id' | 'strokes'] =
        value as string;
    }
  }
  // Convert to array and filter out incomplete entries
  return Object.values(players).filter((p) => p.id);
}
