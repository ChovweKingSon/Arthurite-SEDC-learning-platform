
import React, { useState, useEffect, useRef } from 'react';
import Card from './common/Card';

interface FaceVerificationPageProps {
    onVerificationSuccess: () => void;
}

const FaceVerificationPage: React.FC<FaceVerificationPageProps> = ({ onVerificationSuccess }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cameraReady, setCameraReady] = useState(false);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setCameraReady(true);
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
                setError("Camera access was denied. Please enable camera permissions in your browser settings.");
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleVerify = () => {
        setIsLoading(true);
        setError(null);
        // Simulate face verification process
        setTimeout(() => {
            setIsLoading(false);
            onVerificationSuccess();
        }, 2500);
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-center text-white mb-2">Face Verification</h2>
            <p className="text-center text-slate-400 mb-6">Position your face within the frame.</p>

            <div className="relative w-full max-w-[300px] aspect-square rounded-full overflow-hidden mx-auto mb-6 border-4 border-slate-700 bg-slate-700 flex items-center justify-center">
                {error ? (
                    <div className="text-center text-red-400 px-4">{error}</div>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 ${cameraReady ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {!cameraReady && !error && (
                             <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="animate-spin h-10 w-10 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                             </div>
                        )}
                        <div className={`absolute inset-0 border-8 rounded-full transition-colors duration-500 ${isLoading ? 'border-green-500 animate-pulse' : 'border-transparent'}`}></div>
                    </>
                )}
            </div>
            
            <button
                onClick={handleVerify}
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isLoading || !cameraReady || !!error}
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying Face...
                    </>
                ) : 'Verify Face'}
            </button>
        </Card>
    );
};

export default FaceVerificationPage;