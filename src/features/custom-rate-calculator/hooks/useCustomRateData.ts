import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase-types";

// Define types for the fetched data
type CustomRateData = {
  regions: Database["public"]["Tables"]["regions"]["Row"][];
  roles: Database["public"]["Tables"]["roles"]["Row"][];
  seniority_levels: Database["public"]["Tables"]["seniority_levels"]["Row"][];
};

// Hook to fetch data for Custom Rate Calculator
export function useCustomRateData() {
  return useQuery<CustomRateData, Error>({
    queryKey: ["customRateData"],
    queryFn: async () => {
      // Fetch regions
      const { data: regions, error: regionsError } = await supabase
        .from("regions")
        .select("*");
      if (regionsError) throw new Error(regionsError.message);

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

      return { regions, roles, seniority_levels };
    },
    // Cache data for 1 hour to reduce API calls
    staleTime: 1000 * 60 * 60,
  });
}
