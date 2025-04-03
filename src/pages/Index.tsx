
import { memo } from "react";
import NetworkList from "../components/NetworkList";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container py-10 ">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-bici-blue mb-4">{t('app.title')}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t('app.description')}
        </p>
      </div>
      
      <NetworkList />
    </div>
  );
};

export default memo(Index);
