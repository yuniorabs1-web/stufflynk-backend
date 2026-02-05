import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const StatCard = ({ 
  title, 
  value, 
  subtitle,
  change, 
  changeType = 'neutral',
  icon: Icon,
  trend,
  onClick,
  loading = false,
  size = 'default' // small, default, large
}) => {
  const { settings, isCompact, radiusClass } = useTheme();

  const sizes = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  const iconSizes = {
    small: 16,
    default: 24,
    large: 32
  };

  const valueSizes = {
    small: 'text-xl',
    default: 'text-3xl',
    large: 'text-4xl'
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-gray-400" />;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-emerald-600 bg-emerald-50';
    if (changeType === 'negative') return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-100';
  };

  if (loading) {
    return (
      <div className={`${sizes[size]} ${radiusClass} bg-white border border-gray-200 animate-pulse`}>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`
        ${sizes[size]} 
        ${radiusClass} 
        bg-white 
        border border-gray-200 
        hover:shadow-lg 
        transition-all 
        duration-300 
        ${onClick ? 'cursor-pointer hover:border-sky-200' : ''}
        ${isCompact ? 'space-y-2' : 'space-y-4'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div 
          className={`${radiusClass} p-3 flex items-center justify-center`}
          style={{ 
            backgroundColor: `${settings.primaryColor}15`,
            color: settings.primaryColor
          }}
        >
          <Icon size={iconSizes[size]} />
        </div>
        
        {(change || trend) && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getChangeColor()}`}>
            {getTrendIcon()}
            {change && <span>{change}</span>}
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
        <p className={`${valueSizes[size]} font-bold text-gray-900 tracking-tight`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>

      {/* Progress bar (optional) */}
      {trend && !change && (
        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
          <div 
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ 
              width: trend === 'up' ? '75%' : trend === 'down' ? '35%' : '50%',
              backgroundColor: settings.primaryColor
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StatCard;