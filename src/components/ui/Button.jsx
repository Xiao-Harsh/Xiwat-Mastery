import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, variant = 'primary', ...props }) => {
    const variants = {
        primary: 'bg-xiwat-black text-white hover:bg-xiwat-gold',
        outline: 'border border-xiwat-lightgray hover:border-xiwat-gold hover:text-xiwat-gold',
        ghost: 'hover:text-xiwat-gold',
    };

    return (
        <button
            className={twMerge(
                'px-8 py-4 uppercase text-xs font-bold tracking-widest transition-luxury disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
