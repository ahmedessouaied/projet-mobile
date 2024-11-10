import React from "react";
import { Filter } from "lucide-react";

const EmptyState = () => (
    <div className="text-center py-12">
        <Filter size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No events found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
    </div>
);

export default EmptyState;