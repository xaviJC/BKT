import { useQuery } from "@tanstack/react-query";
import { Network, NetworkResponse } from "../types";

/**
 * Fetches all networks from the API
 */
const fetchNetworks = async (): Promise<Network[]> => {
  const response = await fetch("https://api.citybik.es/v2/networks");
  if (!response.ok) {
    throw new Error("Failed to fetch networks");
  }
  const data: NetworkResponse = await response.json();
  return data.networks;
};

/**
 * Hook that provides Spanish bicycle networks
 */
export const useNetworks = () => {
  return useQuery({
    queryKey: ["networks"],
    queryFn: async () => {
      const networks = await fetchNetworks();
      // Filter only networks in Spain
      return networks.filter(network => network.location.country === "ES");
    },
  });
};
