const Input = ({ label, className = '', ...props }) => {
    return (
        <div className="space-y-1 w-full">
            {label && (
                <label className="text-xs uppercase font-bold tracking-widest text-xiwat-gray">
                    {label}
                </label>
            )}
            <input
                className={`w-full bg-transparent border-b border-xiwat-lightgray focus:border-xiwat-gold outline-none py-2 text-sm transition-colors placeholder:text-gray-300 ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
