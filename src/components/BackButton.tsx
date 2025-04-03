import { memo } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BackButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => navigate(-1);

  return (
    <Button 
      variant="outline" 
      onClick={handleGoBack}
      className="mb-4"
    >
      {t('buttons.back')}
    </Button>
  );
};

export default memo(BackButton);
