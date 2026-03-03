const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-2 border-xiwat-lightgray border-t-xiwat-gold rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-xiwat-gray animate-pulse">
                Crafting Moments...
            </p>
        </div>
    );
};

export default Loader;
