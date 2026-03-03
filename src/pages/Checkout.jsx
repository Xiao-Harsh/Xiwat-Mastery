import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ShieldCheck, CreditCard } from 'lucide-react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Checkout = () => {
    const { cart, totalAmount, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Info, 2: Success
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi'
    const [cardData, setCardData] = useState({
        number: '',
        name: '',
        expiry: '',
        cvv: ''
    });

    const handleCardInput = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            formattedValue = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
        } else if (name === 'expiry') {
            formattedValue = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').replace(/\/$/, '').substring(0, 5);
        } else if (name === 'cvv') {
            formattedValue = value.substring(0, 3);
        }

        setCardData(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setStep(2);
        setTimeout(() => {
            clearCart();
        }, 100);
    };

    if (cart.length === 0 && step === 1) {
        return (
            <Container className="pt-40 pb-24 text-center">
                <h2 className="text-2xl font-display mb-4">Your bag is empty.</h2>
                <Link to="/shop" className="text-xiwat-gold hover:underline">Back to shop</Link>
            </Container>
        );
    }

    if (step === 2) {
        return (
            <Container className="pt-40 pb-24 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-700">
                <div className="mb-8 flex justify-center">
                    <div className="p-4 rounded-full border border-xiwat-gold animate-bounce">
                        <CheckCircle size={60} className="text-xiwat-gold" strokeWidth={1} />
                    </div>
                </div>
                <h2 className="text-5xl font-display font-bold mb-6 italic uppercase tracking-tighter">Confederated Order</h2>
                <p className="text-xiwat-gray font-light leading-relaxed mb-10 text-lg">
                    Thank you for choosing XIWAT. Your timepiece is being prepared with utmost care. You will receive a confirmation email shortly.
                </p>
                <Link to="/">
                    <Button>Return to Main Origin</Button>
                </Link>
            </Container>
        );
    }

    return (
        <div className="pt-32 pb-24">
            <Container>
                <div className="mb-12">
                    <Link to="/cart" className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-xiwat-gray hover:text-xiwat-black transition-colors">
                        <ArrowLeft size={16} />
                        <span>Return to Bag</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Checkout Form */}
                    <div className="animate-in slide-in-from-left-8 duration-700">
                        <h1 className="text-4xl font-display font-bold mb-10 uppercase tracking-tighter">Secure Passage</h1>

                        <form onSubmit={handlePlaceOrder} className="space-y-12">
                            <div className="space-y-8">
                                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-xiwat-gold border-b border-xiwat-lightgray pb-4">Shipping Destination</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="First Name" placeholder="xiwat" required />
                                    <Input label="Last Name" placeholder="xyz" required />
                                </div>
                                <Input label="Email Address" type="email" placeholder="xyz@gmail.com" required />
                                <Input label="Street Address" placeholder="123 New Delhi" required />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <Input label="City" placeholder="Delhi" required />
                                    <Input label="Region" placeholder="India" required />
                                    <Input label="Postal Code" placeholder="101112" required />
                                </div>
                            </div>

                            <div className="space-y-8">
                                <h2 className="text-xs font-bold uppercase tracking-[0.5em] text-xiwat-gold border-b border-xiwat-lightgray pb-4">Payment Selection</h2>

                                {/* Payment Tabs */}
                                <div className="flex space-x-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex-1 py-4 text-xs uppercase font-bold tracking-widest border transition-all duration-300 ${paymentMethod === 'card' ? 'border-xiwat-gold bg-xiwat-gold/5 text-xiwat-gold' : 'border-xiwat-lightgray text-gray-400 hover:border-gray-400'}`}
                                    >
                                        Credit / Debit Card
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('upi')}
                                        className={`flex-1 py-4 text-xs uppercase font-bold tracking-widest border transition-all duration-300 ${paymentMethod === 'upi' ? 'border-xiwat-gold bg-xiwat-gold/5 text-xiwat-gold' : 'border-xiwat-lightgray text-gray-400 hover:border-gray-400'}`}
                                    >
                                        Unified Payments (UPI)
                                    </button>
                                </div>

                                {paymentMethod === 'card' ? (
                                    <div className="p-8 border border-xiwat-gold bg-xiwat-white/50 space-y-6 animate-in fade-in duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <CreditCard size={24} className="text-xiwat-gold" strokeWidth={1.5} />
                                                <span className="text-xs font-bold uppercase tracking-widest">Vault Credit / Debit Card</span>
                                            </div>
                                            <div className="flex space-x-2 opacity-70 grayscale transition-all hover:grayscale-0">
                                                <div className="w-10 h-6 bg-black rounded-sm flex items-center justify-center text-[8px] text-white font-bold tracking-tighter">VISA</div>
                                                <div className="w-10 h-6 bg-orange-600 rounded-sm flex items-center justify-center text-[8px] text-white font-bold tracking-tighter">MC</div>
                                                <div className="w-10 h-6 bg-blue-800 rounded-sm flex items-center justify-center text-[7px] text-white font-bold tracking-tighter">AMEX</div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <Input
                                                label="Card Number"
                                                name="number"
                                                placeholder="0000 0000 0000 0000"
                                                value={cardData.number}
                                                onChange={handleCardInput}
                                                required
                                            />
                                            <Input
                                                label="Cardholder Name"
                                                name="name"
                                                placeholder="NAME ON CARD"
                                                value={cardData.name}
                                                onChange={handleCardInput}
                                                required
                                            />
                                            <div className="grid grid-cols-2 gap-8">
                                                <Input
                                                    label="Expiry Date"
                                                    name="expiry"
                                                    placeholder="MM/YY"
                                                    value={cardData.expiry}
                                                    onChange={handleCardInput}
                                                    required
                                                />
                                                <Input
                                                    label="Security Code"
                                                    name="cvv"
                                                    type="password"
                                                    placeholder="CVV"
                                                    value={cardData.cvv}
                                                    onChange={handleCardInput}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 border border-xiwat-gold bg-xiwat-white/50 space-y-8 animate-in fade-in duration-500">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-8 h-8 bg-xiwat-gold/10 rounded-full flex items-center justify-center">
                                                    <CreditCard size={18} className="text-xiwat-gold" strokeWidth={1.5} />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-widest">Instant UPI Authorization</span>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                {/* GPay Multi-color */}
                                                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-default">
                                                    <span className="text-xs font-black tracking-tighter">
                                                        <span className="text-[#4285F4]">G</span>
                                                        <span className="text-[#EA4335]">P</span>
                                                        <span className="text-[#FBBC05]">a</span>
                                                        <span className="text-[#34A853]">y</span>
                                                    </span>
                                                </div>

                                                {/* PhonePe Purple */}
                                                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-default">
                                                    <span className="text-xs font-black italic tracking-tighter text-[#5f259f]">PhonePe</span>
                                                </div>

                                                {/* Paytm Two-tone */}
                                                <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity cursor-default">
                                                    <span className="text-xs font-black tracking-tighter">
                                                        <span className="text-[#002E6E]">Pay</span>
                                                        <span className="text-[#00BAF2]">tm</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <Input label="UPI Address" placeholder="username@bank" required />
                                            <p className="text-xs text-xiwat-gray font-medium uppercase tracking-widest">
                                                A secure payment request will be sent to your UPI app.
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-100 italic text-xs text-xiwat-gray">
                                            <ShieldCheck size={14} className="text-xiwat-gold" />
                                            <span>Securely encrypted by Vault Bharat Gateway</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button type="submit" className="w-full py-6 text-sm shadow-2xl hover:scale-105 hover:shadow-xl transition-all duration-300">
                                Authorize Transaction — ₹{totalAmount.toLocaleString()}
                            </Button>

                            <div className="flex items-center justify-center space-x-3 text-xs text-gray-400 uppercase font-bold tracking-widest pt-4">
                                <ShieldCheck size={16} className="text-green-500" />
                                <span>Encrypted 256-bit SSL Connection</span>
                            </div>
                        </form>
                    </div>

                    {/* Order Preview */}
                    <div className="bg-xiwat-white p-12 border border-xiwat-lightgray h-fit animate-in slide-in-from-right-8 duration-1000 sticky top-32">
                        <h2 className="text-xs font-bold uppercase tracking-[0.5em] mb-10 pb-4 border-b border-xiwat-lightgray">Vault Inventory</h2>
                        <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 no-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center group">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-20 bg-xiwat-lightgray overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                                            <img src={item.image} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-display font-bold italic text-sm">{item.name}</p>
                                            <p className="text-xs text-xiwat-gold uppercase tracking-[0.2em] font-bold">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-xiwat-lightgray space-y-4">
                            <div className="flex justify-between text-xs text-xiwat-gray font-medium">
                                <span>Subtotal</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-xiwat-gray font-medium">Logistics</span>
                                <span className="text-xiwat-gold font-bold uppercase tracking-widest text-xs">Complementary Premium</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold pt-6 border-t border-xiwat-black">
                                <span className="uppercase tracking-tighter">Total</span>
                                <span>₹{totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Checkout;
