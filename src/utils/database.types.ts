//generate with this command
//npx supabase gen types typescript --project-id vzzqpxcodtidkegiuuxo > database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          candidate_id: string;
          candidate_name: string;
          created_at: string;
          education: string;
          experience: string;
          id: number;
          job_id: number;
          resume: string;
          skills: string;
          status: Database["public"]["Enums"]["status"];
        };
        Insert: {
          candidate_id?: string;
          candidate_name: string;
          created_at?: string;
          education: string;
          expirence: string;
          id?: number;
          job_id: number;
          resume: string;
          skills: string;
          status: Database["public"]["Enums"]["status"];
        };
        Update: {
          candidate_id?: string;
          candidate_name?: string;
          created_at?: string;
          education?: string;
          expirence?: string;
          id?: number;
          job_id?: number;
          resume?: string;
          skills?: string;
          status?: Database["public"]["Enums"]["status"];
        };
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
      companies: {
        Row: {
          company_logo_url: string | null;
          company_name: string;
          created_at: string;
          id: number;
        };
        Insert: {
          company_logo_url?: string | null;
          company_name: string;
          created_at?: string;
          id?: number;
        };
        Update: {
          company_logo_url?: string | null;
          company_name?: string;
          created_at?: string;
          id?: number;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          company_id: number;
          created_at: string;
          description: string;
          expected_salary: string;
          experience: string;
          id: number;
          isOpen: boolean;
          location: string;
          recruiter_id: string;
          requirements: string;
          title: string;
        };
        Insert: {
          company_id: number;
          created_at?: string;
          description: string;
          expected_salary?: string;
          experience: string;
          id?: number;
          isOpen?: boolean;
          location: string;
          recruiter_id?: string;
          requirements: string;
          title: string;
        };
        Update: {
          company_id?: number;
          created_at?: string;
          description?: string;
          expected_salary?: string;
          experience?: string;
          id?: number;
          isOpen?: boolean;
          location?: string;
          recruiter_id?: string;
          requirements?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Jobs_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          }
        ];
      };
      saved_jobs: {
        Row: {
          created_at: string;
          id: number;
          job_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          job_id: number;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          job_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Saved Jobs_job_id_fkey";
            columns: ["job_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
    };
    Enums: {
      status: "applied" | "interviewing" | "hired" | "rejected";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type JobWithCompany = Database["public"]["Tables"]["jobs"]["Row"] & {
  company: {
    company_name: string;
    company_logo_url: string;
  };
};
export type savedJobsWithJobDetails =
  Database["public"]["Tables"]["saved_jobs"]["Row"] & {
    job: JobWithCompany;
  };
export type applicationsType =
  Database["public"]["Tables"]["applications"]["Row"][];

export type Company = Database["public"]["Tables"]["companies"]["Row"];

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
