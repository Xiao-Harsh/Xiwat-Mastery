import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-[120px] md:text-[200px] font-display font-bold leading-none text-xiwat-lightgray">404</h1>
            <div className="absolute space-y-6">
                <h2 className="text-3xl font-display font-bold">Lost in Time</h2>
                <p className="text-xiwat-gray max-w-sm mx-auto font-light leading-relaxed">
                    The page you are looking for has been misplaced or never existed in this dimension.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center space-x-3 bg-xiwat-black text-white px-10 py-4 uppercase text-xs font-bold tracking-widest hover:bg-xiwat-gold transition-luxury shadow-lg"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Origin</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
