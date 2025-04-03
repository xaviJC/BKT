import { useQuery } from "@tanstack/react-query";
import { Station, StationResponse } from "../types";

/**
 * Fetches all stations for a given network ID
 */
const fetchStations = async (networkId: string): Promise<{
  stations: Station[];
  networkName: string;
  city: string;
}> => {
  const response = await fetch(`https://api.citybik.es/v2/networks/${networkId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch stations for network ${networkId}`);
  }
  const data: StationResponse = await response.json();
  
  return {
    stations: data.network.stations,
    networkName: data.network.name,
    city: data.network.location.city
  };
};

/**
 * Hook that provides stations for a given network ID
 */
export const useStations = (networkId?: string) => {
  return useQuery({
    queryKey: ["stations", networkId],
    queryFn: () => fetchStations(networkId || ""),
    enabled: !!networkId,
  });
};
