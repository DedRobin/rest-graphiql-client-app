import React, { useState } from "react";

interface ToggleSwitchProps {
  isChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isChecked = false,
  onToggle,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  return (
    <div className="flex items-center gap-2 mr-2">
      {/* Left label */}
      <h5 className="text-mediumGray">Eng</h5>

      {/* Toggle button */}
      <button
        className="relative inline-flex items-center h-0.5 w-11 transition-colors duration-300 bg-mediumGray"
        onClick={handleToggle}
      >
        <span
          className={`inline-block w-2 h-3 transform border-2 border-green rounded-full transition-transform duration-300 ${
            checked ? "translate-x-8" : "translate-x-1"
          }`}
        />
      </button>

      {/* Right label */}
      <h5 className="text-mediumGray">Ru</h5>
    </div>
  );
};
