export interface Network {
    id: string;
    name: string;
    company?: string[];
    gbfs_href?: string;
    href: string;
    location: {
      city: string;
      country: string;
      latitude: number;
      longitude: number;
    };
  }
  
  export interface NetworkResponse {
    networks: Network[];
  }
  
  export interface Station {
    id: string;
    name: string;
    empty_slots: number;
    free_bikes: number;
    latitude: number;
    longitude: number;
    timestamp: string;
    extra?: {
      address?: string;
      slots?: number;
    };
  }
  
  export interface StationResponse {
    network: {
      stations: Station[];
      company?: string[];
      name: string;
      id: string;
      location: {
        city: string;
        country: string;
        latitude: number;
        longitude: number;
      };
    };
  }
  
  export enum AvailabilityLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
  }
  