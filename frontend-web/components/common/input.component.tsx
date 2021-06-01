import React, { useState } from "react";

interface Props {
  title: string;
  className?: string;
  autocomplete?: string;
}

export const TextInput: React.FC<Props> = ({
  title,
  className,
  autocomplete,
}) => {
  const [id] = useState(String(Math.random()));

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        autoComplete={autocomplete}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
      />
    </div>
  );
};
