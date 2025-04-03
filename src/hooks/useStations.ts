import { useQuery } from "@tanstack/react-query";
import { Station, StationResponse } from "../types";

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

export const useStations = (networkId?: string) => {
  return useQuery({
    queryKey: ["stations", networkId],
    queryFn: () => fetchStations(networkId || ""),
    enabled: !!networkId,
  });
};
