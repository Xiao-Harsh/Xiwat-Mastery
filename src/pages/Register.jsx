import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, User, Lock, Mail, Loader2, AlertTriangle } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await register(name, email, password);
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="pt-40 pb-24 min-h-[90vh] flex flex-col items-center justify-center bg-xiwat-white px-4">
            <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <h1 className="text-5xl font-display font-bold uppercase tracking-tighter mb-2">Join the Vault</h1>
                <p className="text-xiwat-gray font-light text-xs tracking-[0.3em] uppercase">
                    Establish Strategic Identity
                </p>
            </div>

            <form onSubmit={handleSubmit} className={`vault-form ${error ? 'has-error' : ''} animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200`}>
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-[10px] uppercase font-bold tracking-widest text-center animate-shake flex items-center justify-center space-x-2">
                        <AlertTriangle size={14} />
                        <span>{error.message || 'INVALID DATA'}</span>
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 text-[10px] uppercase font-bold tracking-widest text-center">
                        Identity Established. Redirecting to Vault...
                    </div>
                )}

                <div className="vault-input-group">
                    <label>Vault Username</label>
                    <div className="vault-input-wrapper">
                        <User size={18} className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Your Full Name"
                            className="vault-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="vault-input-group">
                    <label>Vault Identity</label>
                    <div className="vault-input-wrapper">
                        <Mail size={18} className="text-gray-400 mr-3" />
                        <input
                            type="email"
                            placeholder="member@xiwat.com"
                            className="vault-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="vault-input-group">
                    <label>Security Key</label>
                    <div className="vault-input-wrapper">
                        <Lock size={18} className="text-gray-400 mr-3" />
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="vault-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="vault-button-submit flex items-center justify-center space-x-2 mt-4"
                    disabled={isLoading || success}
                >
                    {isLoading && <Loader2 size={18} className="animate-spin text-white mr-2" />}
                    <span>{isLoading ? 'Establishing Identity...' : 'Establish Identity'}</span>
                    {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </button>

                <p className="vault-footer">
                    Already a Member? <Link to="/login" className="text-xiwat-gold font-bold hover:text-xiwat-black transition-colors">Authorize Access</Link>
                </p>

                <div className="mt-6 pt-6 border-t border-xiwat-lightgray flex items-center justify-center space-x-3 text-[9px] text-gray-400 uppercase font-bold tracking-[0.2em]">
                    <ShieldCheck size={14} className="text-xiwat-gold" />
                    <span>Secure Authentication</span>
                </div>
            </form>
        </div>
    );
};

export default Register;
