import React from 'react';

interface ProgressBarProps {
  nowStep: number;
  maxStep: number;
  description: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ nowStep, maxStep, description }) => {
  const progressPercentage = (nowStep / maxStep) * 100;

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="w-full bg-gray-300 rounded-full h-6">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-right text-gray-500 mt-2">
        Step {nowStep} of {maxStep}
      </p>
    </div>
  );
};

export default ProgressBar;
