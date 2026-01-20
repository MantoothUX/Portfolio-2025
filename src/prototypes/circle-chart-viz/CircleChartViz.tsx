import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataPoint {
  id: string;
  label: string;
  value: number;
  color: string;
}

// Sample tech stack data
const sampleData: DataPoint[] = [
  { id: '1', label: 'Frontend Development', value: 35, color: '#3b82f6' },
  { id: '2', label: 'Backend Development', value: 25, color: '#8b5cf6' },
  { id: '3', label: 'UI/UX Design', value: 20, color: '#ec4899' },
  { id: '4', label: 'DevOps & Cloud', value: 12, color: '#10b981' },
  { id: '5', label: 'Data Visualization', value: 8, color: '#f59e0b' },
];

const CircleChartViz = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

  // Create SVG path for pie slice
  const createSlicePath = (startAngle: number, endAngle: number, radius: number) => {
    const centerX = 150;
    const centerY = 150;
    const innerRadius = radius * 0.5; // Donut chart

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const x3 = centerX + innerRadius * Math.cos(endRad);
    const y3 = centerY + innerRadius * Math.sin(endRad);
    const x4 = centerX + innerRadius * Math.cos(startRad);
    const y4 = centerY + innerRadius * Math.sin(startRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
      L ${x3} ${y3}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
      Z
    `;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-mono font-bold text-gray-900 dark:text-gray-100 mb-3">
            Interactive Circle Chart
          </h1>
          <p className="text-sm font-mono text-gray-600 dark:text-gray-400">
            Hover over sections to explore the data
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-16 lg:gap-24">
          {/* Circle Chart */}
          <div className="relative">
            <svg
              width="300"
              height="300"
              viewBox="0 0 300 300"
              className="filter drop-shadow-sm"
            >
              {/* Background circle with border */}
              <circle
                cx="150"
                cy="150"
                r="145"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.8"
                className="text-gray-300 dark:text-gray-700"
              />

              {/* Pie slices */}
              {sliceData.map((slice) => {
                const isHovered = hoveredId === slice.id;
                const isOtherHovered = hoveredId !== null && hoveredId !== slice.id;

                return (
                  <motion.g
                    key={slice.id}
                    animate={{
                      opacity: isOtherHovered ? 0.3 : 1,
                      scale: isHovered ? 1.08 : 1,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                    style={{
                      transformOrigin: '150px 150px',
                    }}
                  >
                    <motion.path
                      d={createSlicePath(slice.startAngle, slice.endAngle, 140)}
                      fill={slice.color}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer dark:stroke-gray-950"
                      onMouseEnter={() => setHoveredId(slice.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      animate={{
                        filter: isHovered
                          ? 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3))'
                          : 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    />
                  </motion.g>
                );
              })}

              {/* Center circle */}
              <circle
                cx="150"
                cy="150"
                r="70"
                fill="white"
                className="dark:fill-gray-950"
              />
              <circle
                cx="150"
                cy="150"
                r="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.8"
                className="text-gray-300 dark:text-gray-700"
              />

              {/* Center text */}
              <text
                x="150"
                y="145"
                textAnchor="middle"
                className="text-2xl font-mono font-bold fill-gray-900 dark:fill-gray-100"
              >
                {hoveredId
                  ? `${sliceData.find((s) => s.id === hoveredId)?.percentage.toFixed(1)}%`
                  : '100%'}
              </text>
              <text
                x="150"
                y="165"
                textAnchor="middle"
                className="text-xs font-mono fill-gray-500 dark:fill-gray-400"
              >
                {hoveredId
                  ? sliceData.find((s) => s.id === hoveredId)?.label.split(' ')[0]
                  : 'Total'}
              </text>
            </svg>
          </div>

          {/* Data List */}
          <div className="w-full max-w-md">
            <div className="space-y-3">
              {sliceData.map((item) => {
                const isHovered = hoveredId === item.id;
                const isOtherHovered = hoveredId !== null && hoveredId !== item.id;

                return (
                  <motion.div
                    key={item.id}
                    className="relative cursor-pointer"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    animate={{
                      opacity: isOtherHovered ? 0.4 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="relative border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-950"
                      style={{
                        borderColor: isHovered ? item.color : undefined,
                        borderOpacity: 0.8,
                      }}
                      animate={{
                        scale: isHovered ? 1.02 : 1,
                        borderColor: isHovered ? item.color : undefined,
                        boxShadow: isHovered
                          ? `0 8px 24px ${item.color}40, 0 0 0 1px ${item.color}cc`
                          : '0 2px 4px rgba(0, 0, 0, 0.05)',
                      }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Color indicator */}
                          <motion.div
                            className="w-4 h-4 rounded-full border"
                            style={{
                              backgroundColor: item.color,
                              borderColor: item.color,
                              borderOpacity: 0.8,
                            }}
                            animate={{
                              scale: isHovered ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          />
                          <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                            {item.label}
                          </span>
                        </div>
                        <motion.span
                          className="font-mono text-lg font-bold"
                          style={{ color: item.color }}
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.percentage.toFixed(1)}%
                        </motion.span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            <motion.div
              className="mt-6 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
              style={{ borderOpacity: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between font-mono text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Categories</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {sampleData.length}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between font-mono text-sm">
                <span className="text-gray-600 dark:text-gray-400">Total Value</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{total}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CircleChartViz;
