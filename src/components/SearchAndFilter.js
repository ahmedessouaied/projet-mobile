import React from "react";
import { Search } from "lucide-react";

const SearchAndFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }) => (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Category Buttons */}
        <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
                <button
                    key={category.id}
                    className={`px-4 py-2 rounded-lg ${selectedCategory === category.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    onClick={() => setSelectedCategory(category.id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    </div>
);

export default SearchAndFilter;