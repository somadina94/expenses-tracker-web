import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@/utils/fetch-countries-currencies";

export function useCountriesQuery() {
  return useQuery({
    queryKey: ["countries", "currencies"],
    queryFn: async () => {
      const res = await fetchCountries();
      if (!res) {
        throw new Error("Could not load countries");
      }
      return res as {
        name: string;
        currencyCode: string;
      }[];
    },
    staleTime: 86_400_000,
  });
}
