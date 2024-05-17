export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      courses: {
        Row: {
          club: string
          created_at: string
          events_count: number
          holes_count: number
          id: number
          name: string
          par: number
          updated_at: string
        }
        Insert: {
          club: string
          created_at?: string
          events_count?: number
          holes_count: number
          id?: number
          name: string
          par: number
          updated_at: string
        }
        Update: {
          club?: string
          created_at?: string
          events_count?: number
          holes_count?: number
          id?: number
          name?: string
          par?: number
          updated_at?: string
        }
        Relationships: []
      }
      event_sessions: {
        Row: {
          created_at: string | null
          event_id: number
          id: number
          session_id: number
        }
        Insert: {
          created_at?: string | null
          event_id: number
          id?: number
          session_id: number
        }
        Update: {
          created_at?: string | null
          event_id?: number
          id?: number
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_sessions_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          course_id: number
          created_at: string | null
          id: number
          season_id: number
          special: boolean
          strokes: boolean
          team_event: boolean
        }
        Insert: {
          course_id: number
          created_at?: string | null
          id?: number
          season_id: number
          special: boolean
          strokes: boolean
          team_event: boolean
        }
        Update: {
          course_id?: number
          created_at?: string | null
          id?: number
          season_id?: number
          special?: boolean
          strokes?: boolean
          team_event?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "events_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_events_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "season"
            referencedColumns: ["id"]
          },
        ]
      }
      holes: {
        Row: {
          course_id: number
          created_at: string
          id: number
          index: number
          number: number
          par: number
          updated_at: string
        }
        Insert: {
          course_id: number
          created_at?: string
          id?: number
          index: number
          number: number
          par: number
          updated_at: string
        }
        Update: {
          course_id?: number
          created_at?: string
          id?: number
          index?: number
          number?: number
          par?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "holes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active: boolean
          avatar_url: string | null
          full_name: string | null
          guest: boolean
          id: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          avatar_url?: string | null
          full_name?: string | null
          guest?: boolean
          id: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          avatar_url?: string | null
          full_name?: string | null
          guest?: boolean
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      scorecard_player: {
        Row: {
          beers: number | null
          ciders: number | null
          created_at: string | null
          fines: number | null
          id: number
          player_id: string | null
          scorecard_id: number | null
        }
        Insert: {
          beers?: number | null
          ciders?: number | null
          created_at?: string | null
          fines?: number | null
          id?: number
          player_id?: string | null
          scorecard_id?: number | null
        }
        Update: {
          beers?: number | null
          ciders?: number | null
          created_at?: string | null
          fines?: number | null
          id?: number
          player_id?: string | null
          scorecard_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scorecard_player_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scorecard_player_scorecard_id_fkey"
            columns: ["scorecard_id"]
            isOneToOne: false
            referencedRelation: "scorecards"
            referencedColumns: ["id"]
          },
        ]
      }
      scorecards: {
        Row: {
          course_id: number
          created_at: string | null
          given_strokes: number
          id: number
          points: number | null
          putts: number | null
          session_id: number
          strokes: number | null
          team_index: number | null
          through: number | null
          to_par: number | null
          week_points: number | null
        }
        Insert: {
          course_id: number
          created_at?: string | null
          given_strokes: number
          id?: number
          points?: number | null
          putts?: number | null
          session_id: number
          strokes?: number | null
          team_index?: number | null
          through?: number | null
          to_par?: number | null
          week_points?: number | null
        }
        Update: {
          course_id?: number
          created_at?: string | null
          given_strokes?: number
          id?: number
          points?: number | null
          putts?: number | null
          session_id?: number
          strokes?: number | null
          team_index?: number | null
          through?: number | null
          to_par?: number | null
          week_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "scorecards_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scorecards_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      scores: {
        Row: {
          beers: number | null
          ciders: number | null
          created_at: string | null
          extra_strokes: number
          fines: number
          hole: number
          id: number
          points: number
          putts: number | null
          scorecard_id: number
          strokes: number
          to_par: number
        }
        Insert: {
          beers?: number | null
          ciders?: number | null
          created_at?: string | null
          extra_strokes?: number
          fines?: number
          hole: number
          id?: number
          points?: number
          putts?: number | null
          scorecard_id: number
          strokes: number
          to_par?: number
        }
        Update: {
          beers?: number | null
          ciders?: number | null
          created_at?: string | null
          extra_strokes?: number
          fines?: number
          hole?: number
          id?: number
          points?: number
          putts?: number | null
          scorecard_id?: number
          strokes?: number
          to_par?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_scorecard_id_fkey"
            columns: ["scorecard_id"]
            isOneToOne: false
            referencedRelation: "scorecards"
            referencedColumns: ["id"]
          },
        ]
      }
      season: {
        Row: {
          closed_at: string | null
          created_at: string | null
          id: number
          name: string
          state: string | null
          updated_at: string
          winners_array: string[] | null
        }
        Insert: {
          closed_at?: string | null
          created_at?: string | null
          id?: number
          name?: string
          state?: string | null
          updated_at: string
          winners_array?: string[] | null
        }
        Update: {
          closed_at?: string | null
          created_at?: string | null
          id?: number
          name?: string
          state?: string | null
          updated_at?: string
          winners_array?: string[] | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          course_id: number
          created_at: string
          current_hole: number
          id: number
          owner_id: string
          part_of_final: boolean
          special: boolean
          state: string
          strokes: boolean
          team_event: boolean
        }
        Insert: {
          course_id: number
          created_at?: string
          current_hole?: number
          id?: number
          owner_id?: string
          part_of_final?: boolean
          special?: boolean
          state?: string
          strokes?: boolean
          team_event?: boolean
        }
        Update: {
          course_id?: number
          created_at?: string
          current_hole?: number
          id?: number
          owner_id?: string
          part_of_final?: boolean
          special?: boolean
          state?: string
          strokes?: boolean
          team_event?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "sessions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
