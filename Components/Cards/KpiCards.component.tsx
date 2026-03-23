import clsx from 'clsx';

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ size?: number }>;
  trend?: number;
  currency?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  gradient?: string;
  isCount?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  currency = 'NPR',
  color = 'blue',
  gradient,
  isCount = false,
}) => {
  const gradientClasses = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
    yellow: 'from-yellow-500 to-orange-600',
    purple: 'from-purple-500 to-violet-600',
  };

  const bgGradient = gradient || gradientClasses[color];

  return (
    <div className="relative group h-full">
      <div className={clsx(
        'absolute inset-0 rounded-2xl bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl',
        bgGradient
      )} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {isCount ? (
                value.toLocaleString()
              ) : (
                <>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">{currency}</span>{' '}
                  {value.toLocaleString()}
                </>
              )}
            </p>
            {trend !== undefined && (
              <div className="mt-2 flex items-center gap-1">
                <span
                  className={clsx(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    trend >= 0 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                  )}
                >
                  {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
              </div>
            )}
          </div>
          <div className={clsx(
            'p-3 rounded-xl bg-linear-to-br text-white shadow-lg',
            bgGradient
          )}>
            <Icon size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};
