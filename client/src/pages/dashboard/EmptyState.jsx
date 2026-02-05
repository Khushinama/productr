import { Plus } from 'lucide-react';
import React from 'react';

export default function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-16 h-16 border-4 border-blue-900 rounded-lg" />
          <div className="w-16 h-16 border-4 border-blue-900 rounded-lg" />
        </div>
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 border-4 border-blue-900 rounded-lg flex items-center justify-center">
            <Plus className="w-8 h-8 text-blue-900 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          No Published Products
        </h2>

        <p className="text-gray-500 mb-1">
          Your Published Products will appear here
        </p>
        <p className="text-gray-400">
          Create your first product to publish
        </p>
      </div>
    </div>
  );
}
