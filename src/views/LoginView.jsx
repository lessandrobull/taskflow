import React, { useState } from 'react';
import { Lock, EnvelopeSimple, CircleNotch, SignIn } from '@phosphor-icons/react';
import { supabase } from '../services/supabase';
import { THEME } from '../colors';

export default function LoginView() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || !senha.trim()) return;

        setCarregando(true);
        setErro('');

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: senha,
            });

            if (error) {
                if (error.message.includes('Invalid login credentials')) {
                    setErro('E-mail ou senha incorretos.');
                } else {
                    setErro(error.message || 'Falha ao autenticar.');
                }
            }
        } catch (err) {
            setErro('Erro de conexão com o servidor.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={`h-dvh flex items-center justify-center p-4 font-sans ${THEME.app.bg} ${THEME.app.text}`}>
            <div className="w-full max-w-sm p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm space-y-5">
                <div className="text-center space-y-1">
                    <div className="inline-flex p-2.5 rounded-xl bg-zinc-100 text-zinc-800 mb-1">
                        <Lock size={22} weight="bold" />
                    </div>
                    <h1 className="text-base font-bold text-zinc-900 tracking-tight">
                        Acesso Restrito • TaskFlow
                    </h1>
                    <p className="text-xs text-zinc-500">
                        Inicie sessão para sincronizar suas tarefas
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider block">
                            E-mail
                        </label>
                        <div className="relative flex items-center">
                            <EnvelopeSimple size={16} className="absolute left-3 text-zinc-400" />
                            <input
                                type="email"
                                autoFocus
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-600 uppercase tracking-wider block">
                            Senha
                        </label>
                        <div className="relative flex items-center">
                            <Lock size={16} className="absolute left-3 text-zinc-400" />
                            <input
                                type="password"
                                required
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 transition-colors"
                            />
                        </div>
                    </div>

                    {erro && (
                        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
                            {erro}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={carregando || !email.trim() || !senha.trim()}
                        className="w-full py-2.5 rounded-xl bg-zinc-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-zinc-800 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                        {carregando ? (
                            <CircleNotch size={15} className="animate-spin" />
                        ) : (
                            <>
                                <SignIn size={15} weight="bold" />
                                <span>Entrar no TaskFlow</span>
                            </>
                        )}
                    </button>
                </form>

                <p className="text-[10px] text-zinc-400 text-center leading-relaxed">
                    Sessão persistente: suas credenciais ficarão salvas neste dispositivo para acesso automático.
                </p>
            </div>
        </div>
    );
}