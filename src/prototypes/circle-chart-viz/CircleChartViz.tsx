import { useState } from 'react';
import { motion } from 'framer-motion';

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

  // Create SVG path for pie slice with rounded corners
  const createSlicePath = (startAngle: number, endAngle: number, radius: number) => {
    const centerX = 150;
    const centerY = 150;
    const innerRadius = radius - 40; // 40px wide sections
    const cornerRadius = 8; // Radius for rounded corners

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    // Calculate angle offsets for the rounded corners
    const outerCornerAngle = cornerRadius / radius;
    const innerCornerAngle = cornerRadius / innerRadius;

    // Outer arc start/end with corner offset
    const outerStartRad = startRad + outerCornerAngle;
    const outerEndRad = endRad - outerCornerAngle;

    // Inner arc start/end with corner offset
    const innerStartRad = startRad + innerCornerAngle;
    const innerEndRad = endRad - innerCornerAngle;

    // Outer arc points (with offset for corners)
    const ox1 = centerX + radius * Math.cos(outerStartRad);
    const oy1 = centerY + radius * Math.sin(outerStartRad);
    const ox2 = centerX + radius * Math.cos(outerEndRad);
    const oy2 = centerY + radius * Math.sin(outerEndRad);

    // Inner arc points (with offset for corners)
    const ix1 = centerX + innerRadius * Math.cos(innerStartRad);
    const iy1 = centerY + innerRadius * Math.sin(innerStartRad);
    const ix2 = centerX + innerRadius * Math.cos(innerEndRad);
    const iy2 = centerY + innerRadius * Math.sin(innerEndRad);

    // Corner control points
    const outerStart = { x: centerX + radius * Math.cos(startRad), y: centerY + radius * Math.sin(startRad) };
    const outerEnd = { x: centerX + radius * Math.cos(endRad), y: centerY + radius * Math.sin(endRad) };
    const innerStart = { x: centerX + innerRadius * Math.cos(startRad), y: centerY + innerRadius * Math.sin(startRad) };
    const innerEnd = { x: centerX + innerRadius * Math.cos(endRad), y: centerY + innerRadius * Math.sin(endRad) };

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${outerStart.x} ${outerStart.y}
      Q ${outerStart.x} ${outerStart.y} ${ox1} ${oy1}
      A ${radius} ${radius} 0 ${largeArc} 1 ${ox2} ${oy2}
      Q ${outerEnd.x} ${outerEnd.y} ${outerEnd.x} ${outerEnd.y}
      L ${innerEnd.x} ${innerEnd.y}
      Q ${innerEnd.x} ${innerEnd.y} ${ix2} ${iy2}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}
      Q ${innerStart.x} ${innerStart.y} ${innerStart.x} ${innerStart.y}
      Z
    `;
  };

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
        {/* Traffic Source Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6"
          style={{ borderWidth: '1px', borderOpacity: 0.8, borderRadius: '12px' }}
        >
          <h2 className="text-lg font-mono font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Traffic Distribution
          </h2>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Circle Chart */}
            <div className="relative flex-shrink-0">
              <svg
                width="280"
                height="280"
                viewBox="0 0 300 300"
                className="filter drop-shadow-sm"
              >
                {/* Pie slices */}
                {sliceData.map((slice) => {
                  const isHovered = hoveredId === slice.id;
                  const isOtherHovered = hoveredId !== null && hoveredId !== slice.id;

                  return (
                    <motion.g
                      key={slice.id}
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: 'easeOut',
                      }}
                      style={{
                        transformOrigin: '150px 150px',
                      }}
                    >
                      <motion.path
                        d={createSlicePath(slice.startAngle, slice.endAngle, 140)}
                        fill={slice.color}
                        stroke="rgba(243, 244, 246, 0.5)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        className="cursor-pointer dark:stroke-gray-950/50"
                        onMouseEnter={() => setHoveredId(slice.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        animate={{
                          opacity: isOtherHovered ? 0.3 : 1,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                      />
                    </motion.g>
                  );
                })}

                {/* Center text */}
                {hoveredId && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <text
                      x="150"
                      y="145"
                      textAnchor="middle"
                      className="text-3xl font-mono font-bold fill-gray-900 dark:fill-gray-100"
                    >
                      {sliceData.find((s) => s.id === hoveredId)?.percentage.toFixed(1)}%
                    </text>
                    <text
                      x="150"
                      y="165"
                      textAnchor="middle"
                      className="text-xs font-mono fill-gray-500 dark:fill-gray-400"
                    >
                      {sliceData.find((s) => s.id === hoveredId)?.label}
                    </text>
                  </motion.g>
                )}
              </svg>
            </div>

            {/* Data List */}
            <div className="w-full flex-1">
              <div className="space-y-1">
                {sliceData.map((item) => {
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
                      <div className="flex items-center justify-between gap-3">
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Dashboard Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Total Visitors Card */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6" style={{ borderWidth: '1px', borderOpacity: 0.8, borderRadius: '12px' }}>
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6" style={{ borderWidth: '1px', borderOpacity: 0.8, borderRadius: '12px' }}>
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
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6" style={{ borderWidth: '1px', borderOpacity: 0.8, borderRadius: '12px' }}>
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
      </div>
    </div>
  );
};

export default CircleChartViz;
