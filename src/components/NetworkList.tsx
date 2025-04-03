import { useState, useCallback, memo } from "react";
import { useNetworks } from "../hooks/useNetworks";
import NetworkCard from "../components/NetworkCard";
import { Input } from "../components/ui/input";
import { Network } from "../types";
import { useTranslation } from "react-i18next";

const NetworkList = () => {
  const { t } = useTranslation();
  const { data: networks, isLoading, error } = useNetworks();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNetworks = networks?.filter(network => 
    network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    network.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (network.company?.some(company => 
      company.toLowerCase().includes(searchTerm.toLowerCase())) ?? false)
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive">{t('network.list.error')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('network.list.title')}</h2>
          <p className="text-muted-foreground">
            {!isLoading && filteredNetworks 
              ? t('network.list.showing', { count: filteredNetworks.length })
              : t('network.list.loading')}
          </p>
        </div>
        <div className="w-full md:w-64">
          <Input 
            placeholder={t('network.list.searchPlaceholder')}
            value={searchTerm}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNetworks?.length ? (
            filteredNetworks.map((network: Network) => (
              <MemoizedNetworkCard key={network.id} network={network} />
            ))
          ) : (
            <div className="col-span-3 p-8 text-center">
              <p className="text-muted-foreground">{t('network.list.noResults')}</p>
            </div>
          )}
        </div>
    </div>
  );
};

// Memoized version of NetworkCard to prevent re-renders
const MemoizedNetworkCard = memo(NetworkCard);

export default NetworkList;
