// Example for src/components/ProductGrid.tsx
export const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-4 border-l-4 border-black">
      <div className="md:col-span-2 p-10 bg-bauhaus-blue text-white bauhaus-border flex flex-col justify-end h-96">
        <h3 className="text-6xl font-black uppercase">Featured Drop</h3>
      </div>
      <div className="p-10 bg-bauhaus-yellow bauhaus-border h-96">
        <div className="geometric-card bg-white p-4">
          <p className="font-bold uppercase">New Items</p>
        </div>
      </div>
      <div className="p-10 bg-white bauhaus-border h-96">
         {/* Product info here */}
      </div>
    </div>
  );
};

