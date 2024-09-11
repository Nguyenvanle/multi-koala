// src/components/atoms/icons/ArrowDownAZIcon.tsx
import React from "react";
import { ArrowDownAZ, BookUser, DollarSign, Filter } from "lucide-react";

export const ArrowDownAZIcon: React.FC = () => (
  <ArrowDownAZ className="w-4 h-4" />
);
export const BookUserIcon: React.FC = () => <BookUser className="w-4 h-4" />;
export const DollarSignIcon: React.FC = () => (
  <DollarSign className="w-4 h-4" />
);
export const FilterIcon: React.FC = () => <Filter className="w-4 h-4" />;

// Create similar components for other icons: ArrowDownUpIcon, BookUserIcon, DollarSignIcon, FilterIcon
