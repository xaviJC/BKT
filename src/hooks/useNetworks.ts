import { useQuery } from "@tanstack/react-query";
import { Network, NetworkResponse } from "../types";

const fetchNetworks = async (): Promise<Network[]> => {
  const response = await fetch("https://api.citybik.es/v2/networks");
  if (!response.ok) {
    throw new Error("Failed to fetch networks");
  }
  const data: NetworkResponse = await response.json();
  return data.networks;
};

export const useNetworks = () => {
  return useQuery({
    queryKey: ["networks"],
    queryFn: async () => {
      const networks = await fetchNetworks();
      return networks.filter(network => network.location.country === "ES");
    },
  });
};
