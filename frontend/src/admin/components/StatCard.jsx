import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({
  title,
  value,
  subtitle,
  trend,
  trendValue,
  icon: Icon,
  color = "blue",
  loading = false,
}) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      trend: "text-blue-600",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-200",
      trend: "text-green-600",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      trend: "text-orange-600",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
      trend: "text-red-600",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      trend: "text-purple-600",
    },
  };

  const colors = colorClasses[color];

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-4 h-4" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-600";
    if (trend === "down") return "text-red-600";
    return "text-gray-600";
  };

  if (loading) {
    return (
      <div
        className={`bg-white rounded-xl p-6 border-2 ${colors.border} animate-pulse`}>
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl p-6 border-2 ${colors.border} hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>

          {subtitle && (
            <div className="flex items-center gap-1 mt-2">
              <div className={`flex items-center gap-1 ${getTrendColor()}`}>
                {getTrendIcon()}
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
              <span className="text-sm text-gray-500">{subtitle}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-full ${colors.bg}`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
