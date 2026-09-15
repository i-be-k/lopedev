'use client';
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPortal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useAuth();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setIsSubmitting(true);

        try {
            await login(email, password);
        } catch (err: any) {
            setErrorMsg(err.message || 'Unexpected login validation fault exception.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white tracking-tight">ALX Intranet</h1>
                    <p className="text-slate-400 text-sm mt-2">Sign in to unlock your active developer tier task curriculum.</p>
                </div>

                {errorMsg && (
                    <div className="mb-6 p-4 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-200 text-sm font-semibold">
                        ⚠️ {errorMsg}
                    </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors" placeholder="developer@intranet.io"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 font-mono mb-2">Secure Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors" placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" disabled={isSubmitting}
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800/50 disabled:text-slate-400 text-white rounded-xl font-bold text-sm transition-all shadow-lg transform active:scale-98"
                    >
                        {isSubmitting ? 'Verifying Identity Credentials...' : 'Authenticate Into Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
