import React from 'react';
import Card from './common/Card';

interface ResultsPageProps {
    electionId: string;
}

const mockResults = {
    'agm-2024': {
        title: 'Annual General Meeting 2024',
        totalVotes: 1204,
        positions: [
            { position: 'President', results: [{ name: 'Alice Johnson', votes: 750 }, { name: 'Bob Williams', votes: 454 }] },
            { position: 'Vice President', results: [{ name: 'Charlie Brown', votes: 1204 }] },
        ]
    },
    'proj-x-lead': {
        title: 'Project X Leadership Vote',
        totalVotes: 850,
        positions: [
             { position: 'Project Lead', results: [{ name: 'Diana Prince', votes: 400 }, { name: 'Eve Adams', votes: 350 }, { name: 'Frank Castle', votes: 100 }] },
        ]
    }
};


const ResultsPage: React.FC<ResultsPageProps> = ({ electionId }) => {
    const resultsData = mockResults[electionId] || { title: 'Results not available', totalVotes: 0, positions: [] };
    const { title, totalVotes, positions } = resultsData;

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
                <p className="text-slate-400">Total Votes Cast: <span className="text-green-400 font-bold">{totalVotes}</span></p>
            </div>
            <div className="space-y-6">
                {positions.map(({position, results}) => (
                    <Card key={position}>
                        <h3 className="text-xl sm:text-2xl font-semibold text-green-400 mb-4 border-b border-slate-700 pb-2">{position}</h3>
                        <div className="space-y-4">
                            {results.map(candidate => {
                                const percentage = totalVotes > 0 ? ((candidate.votes / results.reduce((acc, c) => acc + c.votes, 0)) * 100).toFixed(1) : 0;
                                return (
                                    <div key={candidate.name}>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 text-white">
                                            <span className="font-bold">{candidate.name}</span>
                                            <span className="text-sm">{candidate.votes} Votes ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-slate-600 rounded-full h-2.5">
                                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;