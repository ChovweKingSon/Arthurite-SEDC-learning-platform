import React from 'react';
import Card from './common/Card';

interface VoteSuccessPageProps {
    onBackToElections: () => void;
    onViewResults: () => void;
}

const VoteSuccessPage: React.FC<VoteSuccessPageProps> = ({ onBackToElections, onViewResults }) => {
    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in text-center">
            <Card>
                <div className="p-4 sm:p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 sm:h-20 sm:w-20 text-green-500 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Vote Cast Successfully!</h2>
                    <p className="text-slate-400 mb-6">Thank you for participating. Your vote has been securely recorded.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <button onClick={onViewResults} className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition">View Live Results</button>
                        <button onClick={onBackToElections} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition">Back to Elections</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default VoteSuccessPage;