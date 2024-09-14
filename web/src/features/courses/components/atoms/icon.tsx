import React from "react";
import { ArrowDown01, ArrowDown10, ArrowDownAZ, ArrowDownZA, BookUser, CalendarArrowDown, DollarSign, Filter, LucideIcon, Settings2, Star } from "lucide-react";

interface IconProps {
  IconComponent: LucideIcon;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ IconComponent, className }) => (
  <IconComponent className={`w-4 h-4 ${className}`} />
);

export const ArrowDownAZIcon: React.FC = () => <Icon IconComponent={ArrowDownAZ} />;
export const ArrowDownZAIcon: React.FC = () => <Icon IconComponent={ArrowDownZA} />;

export const ArrowDown01Icon: React.FC = () => <Icon IconComponent={ArrowDown01} />
export const ArrowDown10Icon: React.FC = () => <Icon IconComponent={ArrowDown10} />

export const StarIcon: React.FC = () => <Icon IconComponent={Star} />;

export const CalendarArrowDownIcon: React.FC = () => <Icon IconComponent={CalendarArrowDown} />;

export const Settings2Icon: React.FC = () => <Icon IconComponent={Settings2} />;


export const BookUserIcon: React.FC = () => <Icon IconComponent={BookUser} />;

export const DollarSignIcon: React.FC = () => <Icon IconComponent={DollarSign} />;

export const FilterIcon: React.FC = () => <Icon IconComponent={Filter} />;
