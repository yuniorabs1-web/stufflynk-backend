import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { LogIn, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.toString().toUpperCase());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2D3748] p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 transform transition-all">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-4">
                        <LogIn className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter">StuffLynk</h1>
                    <p className="text-[10px] text-cyan-500 font-black uppercase tracking-[0.2em] mt-1">Sistema de Gestión</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="admin@stufflynk.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700 font-medium"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2">Contraseña</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-slate-700 font-medium"
                            required
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold animate-pulse">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-4 rounded-2xl shadow-lg font-black text-sm tracking-widest transition-all flex items-center justify-center gap-3 uppercase
                            ${loading ? 'bg-slate-300 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/40'}`}
                    >
                        <ShieldCheck size={20} />
                        {loading ? 'Validando...' : 'Entrar al Sistema'}
                    </button>
                </form>

                <div className="mt-10 pt-6 border-t border-slate-50 text-center">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        Dominican Spirit & Tech
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;