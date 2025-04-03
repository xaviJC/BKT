
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = useCallback(() => {
    const newLang = i18n.language === "es" ? "en" : "es";
    i18n.changeLanguage(newLang);
  }, [i18n]);

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="rounded-full w-9 h-9 p-0"
      aria-label={i18n.language === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      <Globe className="h-4 w-4" />
    </Button>
  );
};

export default memo(LanguageSwitcher);
