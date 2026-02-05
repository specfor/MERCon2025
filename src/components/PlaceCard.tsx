import React from "react";

export interface Place {
    title: string;
    description: string;
    travelTime?: string;
    image: React.ReactNode;
}

const PlaceCard: React.FC<{ place: Place }> = ({ place }) => {
    return (
        <div className="group relative flex flex-col w-full max-w-[280px] bg-dark-900 rounded-xl overflow-hidden border border-secondary-500/60 hover:border-secondary-500 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-500/20">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                    {place.image}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5 text-center bg-gradient-to-b from-dark-800 to-dark-900">
                {/* Title */}
                <h3 className="text-lg font-bold text-white topic mb-3">
                    {place.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 para text-sm leading-relaxed mb-4 flex-grow">
                    {place.description}
                </p>

                {/* Travel Time (optional) */}
                {place.travelTime && (
                    <p className="text-secondary-500 para text-sm font-medium">
                        {place.travelTime}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PlaceCard;
