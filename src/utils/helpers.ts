
import { AvailabilityLevel, Station } from "../types";

/**
 * Determines the availability level of bicycles at a station
 */
export const getAvailabilityLevel = (station: Station): AvailabilityLevel => {
  const { free_bikes, empty_slots } = station;
  const total = free_bikes + empty_slots;
  
  if (total === 0) return AvailabilityLevel.LOW;
  
  const percentage = (free_bikes / total) * 100;
  
  if (percentage < 30) return AvailabilityLevel.LOW;
  if (percentage < 70) return AvailabilityLevel.MEDIUM;
  return AvailabilityLevel.HIGH;
};

/**
 * Returns a relative time string (e.g., "10 minutes ago")
 */
export const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `hace ${diffInSeconds} segundos`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `hace ${diffInMinutes} minutos`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `hace ${diffInHours} horas`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `hace ${diffInDays} días`;
};

/**
 * Creates a Google Maps URL for a location
 */
export const createGoogleMapsUrl = (latitude: number, longitude: number): string => {
  return `https://www.google.com/maps?q=${latitude},${longitude}`;
};
