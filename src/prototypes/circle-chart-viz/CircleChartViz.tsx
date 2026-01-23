import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DataPoint {
  id: string;
  label: string;
  value: number;
  color: string;
}

// Website traffic by country data - sequential green palette
const sampleData: DataPoint[] = [
  { id: '1', label: 'United States', value: 32.5, color: '#166534' }, // green-800
  { id: '2', label: 'United Kingdom', value: 18.3, color: '#15803d' }, // green-700
  { id: '3', label: 'Germany', value: 12.7, color: '#16a34a' }, // green-600
  { id: '4', label: 'Canada', value: 10.2, color: '#22c55e' }, // green-500
  { id: '5', label: 'France', value: 8.4, color: '#4ade80' }, // green-400
  { id: '6', label: 'Australia', value: 6.8, color: '#86efac' }, // green-300
  { id: '7', label: 'Japan', value: 4.5, color: '#bbf7d0' }, // green-200
  { id: '8', label: 'Netherlands', value: 3.2, color: '#dcfce7' }, // green-100
  { id: '9', label: 'Spain', value: 2.1, color: '#f0fdf4' }, // green-50
  { id: '10', label: 'Italy', value: 1.3, color: '#f7fee7' }, // green-50/lime
];

const CircleChartViz = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate total for percentages
  const total = sampleData.reduce((sum, item) => sum + item.value, 0);

  // Calculate angles for pie chart
  const getSliceData = () => {
    let currentAngle = -90; // Start from top
    return sampleData.map((item) => {
      const percentage = (item.value / total) * 100;
      const sliceAngle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sliceAngle;
      currentAngle = endAngle;

      return {
        ...item,
        percentage,
        startAngle,
        endAngle,
        sliceAngle,
      };
    });
  };

  const sliceData = getSliceData();

  // Prepare data for Recharts
  const chartData = sliceData.map(slice => ({
    id: slice.id,
    name: slice.label,
    value: slice.value,
    percentage: slice.percentage,
    color: slice.color
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      {/* Analytics Dashboard Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
          Website Traffic by Country
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Additional Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Total Visitors Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6" style={{ borderWidth: '1px', borderRadius: '12px' }}>
            <h3 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
              Total Visitors
            </h3>
            <p className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
              124,583
            </p>
            <p className="text-xs font-mono text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <span className="text-[10px]">↑</span>
              <span>12.5% from last month</span>
            </p>
          </div>

          {/* Page Views Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6" style={{ borderWidth: '1px', borderRadius: '12px' }}>
            <h3 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
              Page Views
            </h3>
            <p className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
              342,891
            </p>
            <p className="text-xs font-mono text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
              <span className="text-[10px]">↑</span>
              <span>8.3% from last month</span>
            </p>
          </div>

          {/* Avg Session Duration Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6" style={{ borderWidth: '1px', borderRadius: '12px' }}>
            <h3 className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-2">
              Avg. Session Duration
            </h3>
            <p className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
              4m 32s
            </p>
            <p className="text-xs font-mono text-red-600 dark:text-red-400 mt-1 flex items-center gap-1">
              <span className="text-[10px]">↓</span>
              <span>2.1% from last month</span>
            </p>
          </div>
        </motion.div>

        {/* Traffic Source Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6"
          style={{ borderWidth: '1px', borderRadius: '12px' }}
        >
          <h2 className="text-lg font-mono font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Traffic Distribution
          </h2>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Circle Chart */}
            <div className="relative flex-shrink-0" style={{ width: 280, height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    onMouseEnter={(_, index) => setHoveredId(chartData[index].id)}
                    onMouseLeave={() => setHoveredId(null)}
                    animationDuration={300}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry) => {
                      const isHovered = hoveredId === entry.id;
                      const isOtherHovered = hoveredId !== null && hoveredId !== entry.id;

                      return (
                        <Cell
                          key={entry.id}
                          fill={entry.color}
                          opacity={isOtherHovered ? 0.3 : 1}
                          style={{
                            cursor: 'pointer',
                            transition: 'opacity 0.3s ease-out',
                            outline: 'none'
                          }}
                        />
                      );
                    })}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center text overlay */}
              {hoveredId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                  <div className="text-3xl font-mono font-bold text-gray-900 dark:text-gray-100">
                    {chartData.find((s) => s.id === hoveredId)?.percentage.toFixed(1)}%
                  </div>
                  <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    {chartData.find((s) => s.id === hoveredId)?.name}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Data List */}
            <div className="w-full flex-1">
              <div className="space-y-1">
                {/* First 6 items */}
                {sliceData.slice(0, 6).map((item) => {
                  const isHovered = hoveredId === item.id;
                  const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

                  return (
                    <motion.div
                      key={item.id}
                      className="relative cursor-pointer py-2 px-3 border border-transparent"
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      animate={{
                        borderColor: isHovered
                          ? 'rgba(0, 0, 0, 0.08)'
                          : 'rgba(0, 0, 0, 0)',
                        boxShadow: isHovered
                          ? '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
                          : '0 0 0 rgba(0, 0, 0, 0)',
                        borderRadius: '12px',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2.5">
                          {/* Color indicator - square with rounded corners */}
                          <motion.div
                            className="w-3 h-3 rounded"
                            style={{
                              backgroundColor: item.color,
                            }}
                            animate={{
                              scale: isHovered ? 1.15 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                          <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Other countries - collapsed/expanded */}
                {sliceData.length > 6 && (
                  <>
                    {/* Other countries summary row */}
                    <motion.div
                      className="relative cursor-pointer py-2 px-3 border border-transparent"
                      onClick={() => setIsExpanded(!isExpanded)}
                      animate={{
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderRadius: '12px',
                      }}
                      whileHover={{
                        borderColor: 'rgba(0, 0, 0, 0.08)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between gap-1.5">
                        <div className="flex items-center gap-2.5">
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                          </motion.div>
                          <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                            Other countries
                          </span>
                        </div>
                        <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                          {sliceData.slice(6).reduce((sum, item) => sum + item.percentage, 0).toFixed(1)}%
                        </span>
                      </div>
                    </motion.div>

                    {/* Expanded items */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pl-5">
                            {sliceData.slice(6).map((item) => {
                              const isHovered = hoveredId === item.id;
                              const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

                              return (
                                <motion.div
                                  key={item.id}
                                  className="relative cursor-pointer py-2 px-3 border border-transparent"
                                  onMouseEnter={() => setHoveredId(item.id)}
                                  onMouseLeave={() => setHoveredId(null)}
                                  animate={{
                                    borderColor: isHovered
                                      ? 'rgba(0, 0, 0, 0.08)'
                                      : 'rgba(0, 0, 0, 0)',
                                    boxShadow: isHovered
                                      ? '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)'
                                      : '0 0 0 rgba(0, 0, 0, 0)',
                                    borderRadius: '12px',
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="flex items-center justify-between gap-1.5">
                                    <div className="flex items-center gap-2.5">
                                      <motion.div
                                        className="w-3 h-3 rounded"
                                        style={{
                                          backgroundColor: item.color,
                                        }}
                                        animate={{
                                          scale: isHovered ? 1.15 : 1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                      />
                                      <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                                        {item.label}
                                      </span>
                                    </div>
                                    <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                                      {item.percentage.toFixed(1)}%
                                    </span>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CircleChartViz;
