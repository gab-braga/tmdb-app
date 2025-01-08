import React from 'react';
import './ProgressCircle.css';

export default ({ progress, size }) => {
  const [circle, setCircle] = React.useState(0);
  const [radius, setRadius] = React.useState(0);

  React.useEffect(() => {
    const radius = Math.floor((size - 10) / 2);
    const perimeter = Math.ceil(Math.PI * 2 * radius);
    setRadius(radius);
    setCircle(perimeter);
  }, [size]);

  if (!progress || !size || size < 10 || progress < 0 || progress > 100)
    return <></>;

  return (
    <div
      style={{
        '--progress': progress,
        '--circle': `${circle}px`,
        width: size,
        height: size,
      }}
      className="progress-circle rounded-full bg-[#00000080] backdrop-blur-sm relative"
    >
      <svg width={size} height={size}>
        <circle cx="50%" cy="50%" r={radius}></circle>
        <circle cx="50%" cy="50%" r={radius}></circle>
      </svg>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <span className="text-2xl text-[#FFE000] font-semibold">
          {progress}
          <span className="text-sm text-white">%</span>
        </span>
      </div>
    </div>
  );
};
