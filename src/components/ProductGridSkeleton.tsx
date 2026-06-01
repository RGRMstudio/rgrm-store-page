import { motion } from 'framer-motion';

export default function ProductGridSkeleton() {
  // Create 6 skeleton items (matching your grid layout)
  const skeletons = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 gap-y-20 gap-x-12 md:grid-cols-2 lg:grid-cols-3">
      {skeletons.map((index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`group ${index % 3 === 0 ? 'md:mt-20' : ''}`}
        >
          {/* Image Skeleton */}
          <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-darkGray">
            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
            
            {/* Skeleton overlay with shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-transparent animate-shimmer" 
                 style={{
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 2s infinite'
                 }} 
            />
          </div>

          {/* Text Skeleton */}
          <div className="text-center space-y-3">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-900 rounded animate-pulse mx-auto w-3/4" />
            
            {/* Price skeleton */}
            <div className="h-4 bg-gray-900 rounded animate-pulse mx-auto w-1/2" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
