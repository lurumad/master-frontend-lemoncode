import React from "react";
import { useState } from "react";

export const Numbers = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-2xl w-64">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{value}</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Increment
          </button>
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Decrement
          </button>
        </div>
      </div>
    </div>
  );
};
