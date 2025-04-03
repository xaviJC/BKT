
import { memo } from "react";
import { Network } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NetworkCardProps {
  network: Network;
}

const NetworkCard = ({ network }: NetworkCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <Card 
      className="bg-blue-50 cursor-pointer hover:shadow-md "
      onClick={() => navigate(`/network/${network.id}`)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{network.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{t('network.card.company')}:</span> {network.company?.join(", ") || t('network.card.notAvailable')}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{t('network.card.system')}:</span> {network.gbfs_href ? "GBFS" : "API v2"}
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 text-bici-blue" />
            <span>{network.location.city}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(NetworkCard);