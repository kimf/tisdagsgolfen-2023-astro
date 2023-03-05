/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type LeaderboardItem = {
  id: number
  average: number
  beers: number
  events: number
  fines: number
  fines_rank: number
  points: number
  points_array: number[]
  rank: number
  special_array: any[]
  player: Player | null
}

type Player = {
  full_name: string
  id: number
  avatar_url: string | null
  strokes?: number
}
