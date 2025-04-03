import { memo } from "react";
import { Station } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MapPin, Clock } from "lucide-react";
import { getAvailabilityLevel, getRelativeTime, createGoogleMapsUrl } from "../utils/helpers";
import AvailabilityBadge from "../components/AvailabilityBadge";
import { useTranslation } from "react-i18next";

interface StationCardProps {
  station: Station;
}

const StationCard = ({ station }: StationCardProps) => {
  const { t } = useTranslation();
  const availabilityLevel = getAvailabilityLevel(station);
  const relativeTime = getRelativeTime(station.timestamp);
  const googleMapsUrl = createGoogleMapsUrl(station.latitude, station.longitude);
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-2">{station.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <AvailabilityBadge level={availabilityLevel} />
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>{relativeTime}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-sm">
              <span className="font-medium">{t('station.card.freeBikes')}:</span> {station.free_bikes}
            </div>
            <div className="text-sm">
              <span className="font-medium">{t('station.card.emptySlots')}:</span> {station.empty_slots}
            </div>
            {station.extra?.address && (
              <div className="text-sm">
                <span className="font-medium">{t('station.card.address')}:</span> {station.extra.address}
              </div>
            )}
          </div>
          
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-bici-blue hover:underline"
          >
            <MapPin className="h-4 w-4 mr-1" />
            <span>{t('station.card.seeOnGoogleMaps')}</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(StationCard);
