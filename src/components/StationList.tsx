import { useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { useStations } from "../hooks/useStations";
import StationCard from "../components/StationCard";
import BackButton from "../components/BackButton";
import { Input } from "../components/ui/input";
import { Station } from "../types";
import { useTranslation } from "react-i18next";

const StationList = () => {
  const { t } = useTranslation();
  const { networkId } = useParams<{ networkId: string }>();
  const { data, isLoading, error } = useStations(networkId);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStations = data?.stations.filter(station => 
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (station.extra?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (error) {
    return (
      <div className="container p-8">
        <BackButton />
        <p className="text-destructive">{t('station.list.error')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackButton />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {data?.networkName ?? t('station.list.title')}
          </h2>
          <p className="text-muted-foreground">
            {data ? `${data.city} - ${filteredStations?.length || 0} ${t('station.list.stations')}` : t('station.list.loading')}
          </p>
        </div>
        <div className="w-full md:w-64">
          <Input 
            placeholder={t('station.list.searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-sm"
            disabled={isLoading}
          />
        </div>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations?.length ? (
            filteredStations.map((station: Station) => (
              <MemoizedStationCard key={station.id} station={station} />
            ))
          ) : (
            <div className="col-span-3 p-8 text-center">
              <p className="text-muted-foreground">{t('station.list.noResults')}</p>
            </div>
          )}
        </div>
    </div>
  );
};

// Memoized version of StationCard to prevent re-renders
const MemoizedStationCard = memo(StationCard);

export default StationList;
