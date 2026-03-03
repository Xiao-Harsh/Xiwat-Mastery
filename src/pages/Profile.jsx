import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { User, Mail, ShieldCheck, LogOut, X, ChevronRight, Camera } from 'lucide-react';

const Profile = () => {
    const { user, logout, updateProfileImage } = useAuth();
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const [pendingImage, setPendingImage] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const fileInputRef = useRef(null);

    if (!user) return null;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPendingImage(reader.result);
                setShowConfirm(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const confirmImageUpdate = () => {
        updateProfileImage(pendingImage);
        setPendingImage(null);
        setShowConfirm(false);
    };

    const cancelImageUpdate = () => {
        setPendingImage(null);
        setShowConfirm(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const triggerFilePicker = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="pt-40 pb-24 min-h-[80vh]">
            <Container className="max-w-2xl">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-4xl font-display font-bold uppercase tracking-tighter mb-4">Vault Account</h1>
                    <p className="text-xiwat-gray font-light text-sm tracking-wide">
                        Welcome back, <span className="text-xiwat-gold font-bold">{user.name}</span>. Your session is active.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {/* Sidebar / Avatar */}
                    <div className="md:col-span-1 space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000">
                        <div className="relative">
                            <div
                                onClick={triggerFilePicker}
                                className={`aspect-square bg-xiwat-offwhite border ${showConfirm ? 'border-xiwat-gold animate-pulse' : 'border-xiwat-gold'} flex items-center justify-center relative group overflow-hidden cursor-pointer transition-all hover:border-xiwat-black`}
                            >
                                {(pendingImage || user.profileImage) ? (
                                    <img src={pendingImage || user.profileImage} alt="Portrait" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <User size={64} className="text-xiwat-gold" strokeWidth={1} />
                                )}

                                {!showConfirm && (
                                    <div className="absolute inset-0 bg-xiwat-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white space-y-2">
                                        <Camera size={20} className="text-xiwat-gold" />
                                        <span className="text-[8px] font-bold uppercase tracking-widest text-xiwat-gold">Update Portrait</span>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>

                            {showConfirm && (
                                <div className="absolute -bottom-4 left-0 right-0 flex justify-center space-x-2 animate-in slide-in-from-top-2">
                                    <button
                                        onClick={confirmImageUpdate}
                                        className="bg-xiwat-black text-white p-2 rounded-full border border-xiwat-gold hover:bg-xiwat-gold transition-colors shadow-lg"
                                        title="Confirm Portrait"
                                    >
                                        <ShieldCheck size={14} />
                                    </button>
                                    <button
                                        onClick={cancelImageUpdate}
                                        className="bg-white text-red-500 p-2 rounded-full border border-red-200 hover:bg-red-50 transition-colors shadow-lg"
                                        title="Cancel"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="bg-xiwat-black p-4 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-between">
                                <span>Vault Status</span>
                                <span className="text-xiwat-gold">PREMIUM MEMBER</span>
                            </div>
                            <button
                                onClick={() => setIsLogoutConfirmOpen(true)}
                                className="w-full border border-red-200 text-red-500 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                            >
                                <LogOut size={14} />
                                <span>Terminate Session</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12 animate-in fade-in slide-in-from-right-4 duration-1000">
                        <div className="space-y-8">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-xiwat-gold border-b border-xiwat-lightgray pb-4">Personal Credentials</h2>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xiwat-gray">
                                        <User size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</p>
                                        <p className="text-sm font-medium tracking-tight uppercase">{user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xiwat-gray">
                                        <Mail size={18} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Identity (Email)</p>
                                        <p className="text-sm font-medium tracking-tight">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-xiwat-gold border-b border-xiwat-lightgray pb-4">Recent Activity</h2>
                            <div className="border border-xiwat-lightgray p-6 flex items-center justify-between group hover:border-xiwat-gold transition-colors cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <ShieldCheck size={20} className="text-xiwat-gold" />
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-tight">Order #V-7824</p>
                                        <p className="text-[10px] text-xiwat-gray font-bold uppercase tracking-widest">Processing Secure Transaction</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 group-hover:text-xiwat-gold group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Logout Confirmation Modal */}
            {isLogoutConfirmOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-xiwat-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsLogoutConfirmOpen(false)}
                    />
                    <div className="relative bg-xiwat-white border border-xiwat-gold p-8 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
                        <div className="text-center space-y-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-xiwat-gold/10 text-xiwat-gold mb-2">
                                <X size={24} />
                            </div>
                            <h3 className="text-xl font-display font-bold uppercase tracking-tight">End Session?</h3>
                            <p className="text-sm text-xiwat-gray font-light">
                                <span className="font-bold">{user.name}</span>, you are about to exit the secure passage. Would you like to terminate your vault access?
                            </p>
                            <div className="flex flex-col space-y-3 pt-4">
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsLogoutConfirmOpen(false);
                                    }}
                                    className="w-full bg-xiwat-black text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-xiwat-gold transition-colors"
                                >
                                    Confirm Logout
                                </button>
                                <button
                                    onClick={() => setIsLogoutConfirmOpen(false)}
                                    className="w-full border border-xiwat-lightgray py-3 text-[10px] font-bold uppercase tracking-widest hover:border-xiwat-gold transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
