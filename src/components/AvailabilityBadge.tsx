
import { memo } from "react";
import { AvailabilityLevel } from "../types";
import { cn } from "../lib/utils";
import { useTranslation } from "react-i18next";

interface AvailabilityBadgeProps {
  level: AvailabilityLevel;
}

const AvailabilityBadge = ({ level }: AvailabilityBadgeProps) => {
  const { t } = useTranslation();

  const getLabel = () => {
    switch (level) {
      case AvailabilityLevel.LOW:
        return t('availability.low');
      case AvailabilityLevel.MEDIUM:
        return t('availability.medium');
      case AvailabilityLevel.HIGH:
        return t('availability.high');
      default:
        return t('availability.unknown');
    }
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium rounded-full",
        {
          "bg-availability-low/20 text-availability-low border border-availability-low/30": level === AvailabilityLevel.LOW,
          "bg-availability-medium/20 text-availability-medium border border-availability-medium/30": level === AvailabilityLevel.MEDIUM,
          "bg-availability-high/20 text-availability-high border border-availability-high/30": level === AvailabilityLevel.HIGH,
        }
      )}
    >
      {t('availability.label')}: {getLabel()}
    </span>
  );
};

export default memo(AvailabilityBadge);