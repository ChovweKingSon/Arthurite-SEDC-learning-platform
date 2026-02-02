import React, { useState } from 'react';
import Card from './common/Card';

interface AdminLoginPageProps {
    onLoginSuccess: (role: string) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        // Simulate API call for admin login
        setTimeout(() => {
            if (username.toLowerCase() === 'admin' && password === 'password') {
                setIsLoading(false);
                onLoginSuccess('admin');
            } else if (username.toLowerCase() === 'prince' && password === '12345678') {
                setIsLoading(false);
                onLoginSuccess('super-admin');
            }
             else {
                setIsLoading(false);
                setError('Invalid administrator credentials.');
            }
        }, 1500);
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-center text-white mb-2">Administrator Login</h2>
            <p className="text-center text-slate-400 mb-6">Access the VoteXpert management panel.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        disabled={isLoading}
                    />
                </div>
                <div>
                     <div className="flex justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <a href="#" className="text-sm text-green-400 hover:underline">Forgot password?</a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        disabled={isLoading}
                    />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isLoading || !username || !password}
                >
                     {isLoading ? 'Authenticating...' : 'Login'}
                </button>
            </form>
        </Card>
    );
};

export default AdminLoginPage;