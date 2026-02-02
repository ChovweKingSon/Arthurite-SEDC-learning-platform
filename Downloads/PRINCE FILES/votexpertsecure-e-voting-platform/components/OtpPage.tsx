import React, { useState, useRef, useEffect } from 'react';
import Card from './common/Card';

interface OtpPageProps {
    onOtpSuccess: () => void;
    onGoBack: () => void;
    email: string;
}

const OtpPage: React.FC<OtpPageProps> = ({ onOtpSuccess, onGoBack, email }) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(60);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        const timer = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleResend = () => {
        if (countdown === 0) {
            // Simulate resending OTP
            setCountdown(60);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }
        setError('');
        setIsLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            if (otp === '123456') { // Mock OTP
                setIsLoading(false);
                onOtpSuccess();
            } else {
                setIsLoading(false);
                setError('Invalid OTP. Please try again.');
            }
        }, 1500);
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-center text-white mb-2">Enter OTP</h2>
            <p className="text-center text-slate-400 mb-6">
                A 6-digit code has been sent to <br /> <span className="font-medium text-green-400">{email}</span>.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-slate-300 mb-2 sr-only">OTP</label>
                    <input
                        ref={inputRef}
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        placeholder="_ _ _ _ _ _"
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition text-center text-2xl tracking-[0.75rem] sm:tracking-[1.5rem]"
                        disabled={isLoading}
                    />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={isLoading || otp.length < 6}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </>
                    ) : 'Verify OTP'}
                </button>
            </form>
            <div className="text-center text-sm text-slate-400 mt-6 space-y-2">
                <p>Didn't receive the code?</p>
                <button onClick={handleResend} disabled={countdown > 0} className="font-medium text-green-400 hover:text-green-300 disabled:text-slate-500 disabled:cursor-not-allowed">
                    Resend OTP {countdown > 0 ? `in 00:${countdown.toString().padStart(2, '0')}` : ''}
                </button>
            </div>
            <div className="text-center mt-4">
                <button onClick={onGoBack} className="text-sm text-slate-400 hover:text-green-400 transition">
                    Back to Login
                </button>
            </div>
        </Card>
    );
};

export default OtpPage;