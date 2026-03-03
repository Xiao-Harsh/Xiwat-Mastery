import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CartSummary = ({ totalAmount }) => {
    return (
        <div className="bg-xiwat-white p-8 border border-xiwat-lightgray animate-in fade-in duration-700">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 border-b border-xiwat-lightgray pb-4">Bag Summary</h2>

            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                    <span className="text-xiwat-gray">Subtotal</span>
                    <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-xiwat-gray">Priority Shipping</span>
                    <span className="text-xiwat-gold font-bold text-[10px] uppercase tracking-widest">Complementary</span>
                </div>
            </div>

            <div className="border-t border-xiwat-black pt-6 mb-10 flex justify-between items-end">
                <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-xiwat-gray mb-1 text-center">Final Total</p>
                    <p className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</p>
                </div>
            </div>

            <Link
                to="/checkout"
                className="w-full bg-xiwat-black text-white py-5 uppercase text-xs font-bold tracking-widest flex items-center justify-center space-x-3 hover:bg-xiwat-gold hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg"
            >
                <span>Secure Checkout</span>
                <ArrowRight size={16} />
            </Link>

            <div className="mt-8 text-center space-y-2">
                <p className="text-[10px] text-gray-400 font-light italic">
                    Experience the luxury of premium curation.
                </p>
                <div className="w-10 h-[1px] bg-xiwat-lightgray mx-auto"></div>
            </div>
        </div>
    );
};

export default CartSummary;
