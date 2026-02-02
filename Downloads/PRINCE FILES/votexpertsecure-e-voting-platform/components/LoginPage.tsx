import React, { useState } from 'react';
import Card from './common/Card';

interface LoginPageProps {
    onLoginSuccess: (id: string, email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const [voterId, setVoterId] = useState('');
    const [email, setEmail] = useState('');
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [isNotRobot, setIsNotRobot] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!voterId || !email) {
            setError('Both Voter ID and Email are required.');
            return;
        }
        if (!termsAgreed || !isNotRobot) {
            setError('Please complete all checks before proceeding.');
            return;
        }
        setError('');
        setIsLoading(true);
        // Simulate API call to send OTP
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess(voterId, email);
        }, 1500);
    };

    const isButtonDisabled = isLoading || !voterId || !email || !termsAgreed || !isNotRobot;

    return (
        <Card>
            <h2 className="text-2xl font-bold text-center text-white mb-2">Voter Login</h2>
            <p className="text-center text-slate-400 mb-6">Enter your credentials to begin.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="voterId" className="block text-sm font-medium text-slate-300 mb-2">Voter ID</label>
                    <input
                        id="voterId"
                        type="text"
                        value={voterId}
                        onChange={(e) => setVoterId(e.target.value)}
                        placeholder="e.g., CORP-12345"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        disabled={isLoading}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        disabled={isLoading}
                    />
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex items-center">
                        <input id="terms" name="terms" type="checkbox" checked={termsAgreed} onChange={() => setTermsAgreed(!termsAgreed)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label htmlFor="terms" className="ml-3 block text-sm text-slate-400">
                            I agree to the <a href="#" className="font-medium text-green-400 hover:text-green-300">Terms</a> and <a href="#" className="font-medium text-green-400 hover:text-green-300">Privacy Policy</a>.
                        </label>
                    </div>
                     <div className="flex items-center">
                        <input id="robot" name="robot" type="checkbox" checked={isNotRobot} onChange={() => setIsNotRobot(!isNotRobot)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <label htmlFor="robot" className="ml-3 block text-sm text-slate-400">I'm not a robot</label>
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm text-center pt-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center mt-4"
                    disabled={isButtonDisabled}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending OTP...
                        </>
                    ) : 'Send OTP'}
                </button>
            </form>
             <p className="text-center text-xs text-slate-500 mt-6">Only pre-registered voters can access this system.</p>
        </Card>
    );
};

export default LoginPage;
