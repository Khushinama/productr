import { Plus } from "lucide-react";
import React from "react";

export default function EmptyState({
  title = "No Products",
  subtitle = "",
  hint = "",
}) {
  return (
    <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] px-4">

      <div className="text-center">
        {/* ICON */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-900 rounded-lg" />

         <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-900 rounded-lg" />

        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-900 rounded-lg flex items-center justify-center">

            <Plus className="w-8 h-8 text-blue-900 stroke-[3]" />
          </div>
        </div>

        {/* TEXT */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base text-gray-500 mb-1">{subtitle}</p>

        )}

        {hint && (
          <p className="text-sm text-gray-400">{hint}</p>

        )}
      </div>
    </div>
  );
}
