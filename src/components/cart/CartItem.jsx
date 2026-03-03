import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex space-x-6 pb-8 border-b border-xiwat-lightgray relative group animate-in slide-in-from-left-4 duration-500">
            <div className="w-24 h-32 md:w-32 md:h-40 bg-xiwat-lightgray overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[20%]" />
            </div>

            <div className="flex-grow space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-display font-medium">{item.name}</h3>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-xiwat-gold">{item.category}</p>
                    </div>
                    <p className="font-medium">₹{item.price.toLocaleString()}</p>
                </div>

                <p className="text-xs text-xiwat-gray line-clamp-2 max-w-md font-light">
                    {item.description}
                </p>

                <div className="flex items-center space-x-6 pt-4">
                    <div className="flex items-center border border-xiwat-lightgray">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-xiwat-lightgray transition-colors"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-xiwat-lightgray transition-colors"
                            aria-label="Increase quantity"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-xs text-red-500 hover:text-red-700 transition-colors uppercase font-bold tracking-widest flex items-center space-x-2"
                    >
                        <Trash2 size={14} />
                        <span className="hidden md:inline">Remove Item</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
