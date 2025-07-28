import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase-types";

// Define types for the fetched data
type SwatTeamData = {
  roles: Database["public"]["Tables"]["roles"]["Row"][];
  seniority_levels: Database["public"]["Tables"]["seniority_levels"]["Row"][];
  workloads: Database["public"]["Tables"]["workloads"]["Row"][];
  durations: Database["public"]["Tables"]["durations"]["Row"][];
};

// Hook to fetch data for SWAT Team Calculator
export function useSwatTeamData() {
  return useQuery<SwatTeamData, Error>({
    queryKey: ["swatTeamData"],
    queryFn: async () => {
      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from("roles")
        .select("*");
      if (rolesError) throw new Error(rolesError.message);

      // Fetch seniority levels
      const { data: seniority_levels, error: seniorityError } = await supabase
        .from("seniority_levels")
        .select("*");
      if (seniorityError) throw new Error(seniorityError.message);

      // Fetch workloads
      const { data: workloads, error: workloadsError } = await supabase
        .from("workloads")
        .select("*");
      if (workloadsError) throw new Error(workloadsError.message);

      // Fetch durations
      const { data: durations, error: durationsError } = await supabase
        .from("durations")
        .select("*");
      if (durationsError) throw new Error(durationsError.message);

      return { roles, seniority_levels, workloads, durations };
    },
    // Cache data for 1 hour to reduce API calls
    staleTime: 1000 * 60 * 60,
  });
}
