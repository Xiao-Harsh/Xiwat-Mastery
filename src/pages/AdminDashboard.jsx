import { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Plus, Edit2, Trash2, DollarSign, TrendingUp, ShieldAlert, Clock } from 'lucide-react';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import api from '../config/api';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [attackLogs, setAttackLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('inventory');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodRes, logRes] = await Promise.all([
                    api.get('/api/products'),
                    api.get('/api/admin/logs')
                ]);
                setProducts(prodRes.data);
                setAttackLogs(logRes.data);
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Deauthorize this model from the public catalog?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const stats = [
        { label: 'Security Alerts', value: attackLogs.length, icon: ShieldAlert, color: 'text-red-600' },
        { label: 'Authorized Products', value: products.length, icon: Package, color: 'text-xiwat-gold' },
        { label: 'System Integrity', value: 'OPTIMAL', icon: TrendingUp, color: 'text-green-600' },
    ];

    return (
        <div className="pt-32 pb-24 bg-xiwat-white min-h-screen">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.5em] text-xiwat-gold">Internal Access</p>
                        <h1 className="text-5xl font-display font-bold uppercase tracking-tighter">Command Center</h1>
                        <div className="w-12 h-[2px] bg-xiwat-gold"></div>
                    </div>

                    <Button className="flex items-center space-x-3 text-[10px] shadow-lg">
                        <Plus size={16} />
                        <span>Provision New Model</span>
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-10 border border-xiwat-lightgray relative overflow-hidden group hover:border-xiwat-gold transition-luxury">
                            <stat.icon size={60} className={`absolute -right-6 -bottom-6 opacity-[0.03] transform group-hover:scale-125 transition-transform duration-700`} />
                            <div className="relative z-10 space-y-2">
                                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-xiwat-gray">{stat.label}</p>
                                <div className="flex items-baseline space-x-3">
                                    <p className="text-4xl font-bold">{stat.value}</p>
                                    <TrendingUp size={14} className="text-green-500 opacity-50" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Management Interface */}
                <div className="bg-white border border-xiwat-lightgray shadow-sm overflow-hidden">
                    <div className="flex bg-xiwat-lightgray/30 p-2">
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`px-10 py-4 uppercase text-[10px] font-bold tracking-[0.3em] transition-luxury ${activeTab === 'inventory' ? 'bg-white text-xiwat-black shadow-sm' : 'text-gray-400 hover:text-xiwat-black'}`}
                        >
                            Global Inventory
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`px-10 py-4 uppercase text-[10px] font-bold tracking-[0.3em] transition-luxury ${activeTab === 'logs' ? 'bg-white text-xiwat-black shadow-sm' : 'text-gray-400 hover:text-xiwat-black'}`}
                        >
                            Security Events (WAF)
                        </button>
                    </div>

                    <div className="p-10">
                        {loading ? (
                            <div className="py-24 text-center text-gray-400 animate-pulse">Initializing Command Center...</div>
                        ) : activeTab === 'inventory' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] uppercase font-bold tracking-[0.4em] text-xiwat-gray border-b border-xiwat-lightgray">
                                            <th className="pb-6">Model Identity</th>
                                            <th className="pb-6">Category</th>
                                            <th className="pb-6">Authorization</th>
                                            <th className="pb-6">Vault Stock</th>
                                            <th className="pb-6 text-right">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-xiwat-lightgray">
                                        {products.map((product) => (
                                            <tr key={product.id} className="group hover:bg-xiwat-lightgray/10 transition-colors">
                                                <td className="py-8">
                                                    <div className="flex items-center space-x-6">
                                                        <div className="w-12 h-16 bg-xiwat-lightgray overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                                                            <img src={product.image} className="w-full h-full object-cover grayscale" />
                                                        </div>
                                                        <span className="font-display font-bold text-lg italic">{product.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 text-[10px] font-bold uppercase tracking-widest text-xiwat-gold">{product.category}</td>
                                                <td className="py-8 text-sm font-medium">₹{product.price.toLocaleString()}</td>
                                                <td className="py-8">
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`}></div>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{product.stock} Units</span>
                                                    </div>
                                                </td>
                                                <td className="py-8 text-right">
                                                    <div className="flex justify-end space-x-6 text-xiwat-gray">
                                                        <button className="hover:text-xiwat-gold transition-luxury"><Edit2 size={18} strokeWidth={1.5} /></button>
                                                        <button onClick={() => handleDelete(product.id)} className="hover:text-red-500 transition-luxury"><Trash2 size={18} strokeWidth={1.5} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : activeTab === 'logs' ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] uppercase font-bold tracking-[0.4em] text-xiwat-gray border-b border-xiwat-lightgray">
                                            <th className="pb-6">Identity IP</th>
                                            <th className="pb-6">Tactical Thread</th>
                                            <th className="pb-6">Payload Detected</th>
                                            <th className="pb-6 text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-xiwat-lightgray">
                                        {attackLogs.map((log) => (
                                            <tr key={log.id} className="group hover:bg-red-50/50 transition-colors">
                                                <td className="py-6 font-mono text-xs">{log.ipAddress}</td>
                                                <td className="py-6">
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-[9px] font-bold uppercase tracking-widest rounded-full">
                                                        {log.attackType}
                                                    </span>
                                                </td>
                                                <td className="py-6">
                                                    <code className="text-[10px] bg-gray-100 p-1 px-2 text-xiwat-black rounded">{log.payload}</code>
                                                </td>
                                                <td className="py-6 text-right text-[10px] text-xiwat-gray font-mono">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                        {attackLogs.length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="py-24 text-center">
                                                    <ShieldAlert size={40} className="mx-auto text-gray-200 mb-6" />
                                                    <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gray-400 italic">No security breaches detected.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <ShoppingCart size={40} className="mx-auto text-gray-200 mb-6" />
                                <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-gray-400 italic">No authenticated sessions detected.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AdminDashboard;
