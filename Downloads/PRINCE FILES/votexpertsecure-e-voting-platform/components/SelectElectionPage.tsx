import React, { useState, useMemo, useEffect } from 'react';
import AiAssistantModal from './AiAssistantModal';

interface SelectElectionPageProps {
    voterId: string;
    onVoteNow: (electionId: string) => void;
    onViewResults: (electionId: string) => void;
}

const mockElections = [
    { 
        id: 'agm-2024', 
        title: 'Annual General Meeting 2024', 
        description: 'Election of new board members.', 
        status: 'Active', 
        endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), 
        votesCast: 1204, 
        voted: false,
        contestants: [
            { id: 'p1', name: 'Alice Johnson', manifesto: 'My platform focuses on three key areas: fiscal responsibility, sustainable growth, and employee wellness. I will ensure our budget is balanced, invest in green technologies, and introduce comprehensive mental health support programs.' },
            { id: 'p2', name: 'Bob Williams', manifesto: 'I am committed to digital transformation and market expansion. My goal is to upgrade our entire IT infrastructure within two years and explore new markets in the Asia-Pacific region to drive revenue.' },
        ]
    },
    { 
        id: 'proj-x-lead', 
        title: 'Project X Leadership Vote', 
        description: 'Select the new lead for Project X.', 
        status: 'Active', 
        endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 
        votesCast: 850, 
        voted: false,
        contestants: [
            { id: 'pl1', name: 'Diana Prince', manifesto: 'As project lead, my focus will be on agile methodologies and transparent communication. We will have bi-weekly sprint reviews open to all stakeholders to ensure alignment and rapid progress.' },
            { id: 'pl2', name: 'Eve Adams', manifesto: 'My leadership style is data-driven. Every major decision for Project X will be backed by thorough analysis and performance metrics to guarantee we meet our targets efficiently and effectively.' },
        ]
    },
    { id: 'benefits-poll', title: 'Employee Benefits Poll 2024', description: 'Vote on proposed benefits changes.', status: 'Closed', voted: true },
    { id: 'hq-location', title: 'New Headquarter Location Poll', description: 'Help decide the location for our new HQ.', status: 'Upcoming', startsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
    { id: 'charity-drive', title: 'Annual Charity Drive Partner', description: 'Choose our official charity partner for this year.', status: 'Closed', voted: false },
];

type ElectionStatus = 'All' | 'Active' | 'Upcoming' | 'Closed';

const Countdown: React.FC<{ date: Date }> = ({ date }) => {
    const [timeLeft, setTimeLeft] = useState(date.getTime() - Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(date.getTime() - Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, [date]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <span className="font-mono text-amber-400">
            {days}d {hours.toString().padStart(2, '0')}h {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
        </span>
    );
};

const SelectElectionPage: React.FC<SelectElectionPageProps> = ({ voterId, onVoteNow, onViewResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<ElectionStatus>('All');
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [selectedElectionForAi, setSelectedElectionForAi] = useState(null);
    
    const filteredElections = useMemo(() => {
        return mockElections
            .filter(e => activeTab === 'All' || e.status === activeTab)
            .filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, activeTab]);
    
    const handleOpenAiModal = (election) => {
        setSelectedElectionForAi(election);
        setIsAiModalOpen(true);
    };

    const renderElectionCard = (election) => {
        const endsInDays = election.endsAt ? Math.ceil((election.endsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
        const canAskAi = (election.status === 'Active' || election.status === 'Upcoming') && election.contestants && election.contestants.length > 0;

        return (
             <div key={election.id} className="bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:border-green-500 hover:shadow-xl">
                <div className="text-left w-full">
                    <h3 className="text-lg md:text-xl font-bold text-white">{election.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{election.description}</p>
                    <div className="text-xs text-slate-500 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                        {election.status === 'Active' && <><span>Ends in: {endsInDays} day(s)</span><span>Votes Cast: {election.votesCast}</span></>}
                        {election.status === 'Upcoming' && <span>Starts in: <Countdown date={election.startsAt} /></span>}
                        {election.status === 'Closed' && <span>Election concluded.</span>}
                    </div>
                </div>
                <div className="flex-shrink-0 flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
                    {canAskAi && (
                         <button 
                          onClick={() => handleOpenAiModal(election)}
                          className="w-full md:w-auto bg-sky-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition"
                        >
                            Ask AI Assistant
                        </button>
                    )}
                    {election.status === 'Active' && (
                        <button 
                          onClick={() => onVoteNow(election.id)}
                          className="w-full md:w-auto bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-green-500 transition"
                        >
                            Vote Now
                        </button>
                    )}
                    {election.status === 'Closed' && (
                        <>
                            <button onClick={() => onViewResults(election.id)} className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition">View Result</button>
                            {election.voted && <span className="text-xs text-slate-400 px-3 py-1 bg-slate-700 rounded-full mt-2 sm:mt-0">Voted</span>}
                        </>
                    )}
                    {election.status === 'Upcoming' && <span className="text-xs font-bold text-amber-300 bg-amber-800/50 px-3 py-1.5 rounded-full">Upcoming</span>}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <input 
                    type="text"
                    placeholder="Search for elections..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full md:w-1/3 bg-slate-700 border border-slate-600 rounded-md p-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                />
                <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 overflow-x-auto">
                    {(['All', 'Active', 'Upcoming', 'Closed'] as ElectionStatus[]).map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors flex-shrink-0 ${activeTab === tab ? 'bg-green-600 text-white' : 'text-slate-400 hover:bg-slate-700'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="space-y-4">
                {filteredElections.length > 0 ? filteredElections.map(renderElectionCard) : <p className="text-center text-slate-500 py-8">No elections found.</p>}
            </div>

            {isAiModalOpen && (
                <AiAssistantModal
                    isOpen={isAiModalOpen}
                    onClose={() => setIsAiModalOpen(false)}
                    election={selectedElectionForAi}
                />
            )}
        </div>
    );
};

export default SelectElectionPage;