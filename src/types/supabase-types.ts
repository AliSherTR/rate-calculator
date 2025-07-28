export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      regions: {
        Row: {
          id: string;
          name: string;
          multiplier: number;
        };
        Insert: {
          id?: string;
          name: string;
          multiplier: number;
        };
        Update: {
          id?: string;
          name?: string;
          multiplier?: number;
        };
      };
      roles: {
        Row: {
          id: string;
          name: string;
          base_rate: number;
        };
        Insert: {
          id?: string;
          name: string;
          base_rate: number;
        };
        Update: {
          id?: string;
          name?: string;
          base_rate?: number;
        };
      };
      seniority_levels: {
        Row: {
          id: string;
          name: string;
          multiplier: number;
        };
        Insert: {
          id?: string;
          name: string;
          multiplier: number;
        };
        Update: {
          id?: string;
          name?: string;
          multiplier?: number;
        };
      };
      workloads: {
        Row: {
          id: string;
          name: string;
          percentage: number;
        };
        Insert: {
          id?: string;
          name: string;
          percentage: number;
        };
        Update: {
          id?: string;
          name?: string;
          percentage?: number;
        };
      };
      durations: {
        Row: {
          id: string;
          name: string;
          discount: number;
        };
        Insert: {
          id?: string;
          name: string;
          discount: number;
        };
        Update: {
          id?: string;
          name?: string;
          discount?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
