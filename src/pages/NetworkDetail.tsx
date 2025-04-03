
import { memo } from "react";
import StationList from "../components/StationList";
import LanguageSwitcher from "../components/LanguageSwitcher";

const NetworkDetail = () => {
  return (
    <div className="container py-10">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>
      <StationList />
    </div>
  );
};

export default memo(NetworkDetail);
