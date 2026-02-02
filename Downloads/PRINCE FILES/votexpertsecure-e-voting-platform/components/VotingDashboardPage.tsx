import React, { useState } from 'react';
import Card from './common/Card';

interface VotingDashboardPageProps {
    electionId: string;
    onVoteCasted: () => void;
}

const mockCandidates = {
    'agm-2024': [
        { position: 'President', candidates: [{ id: 'p1', name: 'Alice Johnson', slogan: 'Leading with Integrity', photo: 'https://i.pravatar.cc/150?u=p1' }, { id: 'p2', name: 'Bob Williams', slogan: 'A Future of Growth', photo: 'https://i.pravatar.cc/150?u=p2' }] },
        { position: 'Vice President', candidates: [{ id: 'vp1', name: 'Charlie Brown', slogan: 'Experience You Can Trust', photo: 'https://i.pravatar.cc/150?u=vp1' }] },
    ],
    'proj-x-lead': [
        { position: 'Project Lead', candidates: [{ id: 'pl1', name: 'Diana Prince', slogan: 'Innovation in Action', photo: 'https://i.pravatar.cc/150?u=pl1' }, { id: 'pl2', name: 'Eve Adams', slogan: 'Delivering Excellence', photo: 'https://i.pravatar.cc/150?u=pl2' }, { id: 'pl3', name: 'Frank Castle', slogan: 'Strategic Execution', photo: 'https://i.pravatar.cc/150?u=pl3' }] },
    ],
};

const VotingDashboardPage: React.FC<VotingDashboardPageProps> = ({ electionId, onVoteCasted }) => {
    const electionData = mockCandidates[electionId] || [];
    const [selections, setSelections] = useState<{ [key: string]: string }>({});

    const handleSelect = (position: string, candidateId: string) => {
        setSelections(prev => ({ ...prev, [position]: candidateId }));
    };

    const allPositionsVoted = electionData.length === Object.keys(selections).length;

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Cast Your Vote</h2>
            <div className="space-y-8">
                {electionData.map(({ position, candidates }) => (
                    <Card key={position}>
                        <h3 className="text-2xl font-semibold text-green-400 mb-4">{position}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {candidates.map(candidate => (
                                <div
                                    key={candidate.id}
                                    onClick={() => handleSelect(position, candidate.id)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selections[position] === candidate.id ? 'border-green-500 bg-green-900/50' : 'border-slate-600 bg-slate-700 hover:border-green-600'}`}
                                >
                                    <img src={candidate.photo} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto mb-3" />
                                    <h4 className="text-lg font-bold text-center text-white">{candidate.name}</h4>
                                    <p className="text-sm text-slate-400 text-center italic">"{candidate.slogan}"</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <button
                    onClick={onVoteCasted}
                    disabled={!allPositionsVoted}
                    className="bg-green-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-green-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all text-lg focus:outline-none focus:ring-4 focus:ring-green-500/50"
                >
                    Cast Final Vote
                </button>
            </div>
        </div>
    );
};

export default VotingDashboardPage;
