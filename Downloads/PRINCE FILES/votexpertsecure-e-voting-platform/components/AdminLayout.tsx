import React, { useState, useMemo, useEffect } from 'react';
import Logo from './common/Logo';

// --- Mock Data ---

const initialUsers = [
    { id: 1, name: 'Alice Johnson', username: 'alicej', email: 'alice@votexpert.com', role: 'Admin' },
    { id: 2, name: 'Bob Williams', username: 'bobw', email: 'bob@votexpert.com', role: 'Election Manager' },
    { id: 3, name: 'Prince Charming', username: 'prince', email: 'prince@votexpert.com', role: 'Super Admin' },
];

const mockAuditLogs = [
    { id: 1, timestamp: '2024-07-29 10:05:14', user: 'prince', action: 'Logged in successfully.' },
    { id: 2, timestamp: '2024-07-29 10:06:22', user: 'prince', action: 'Viewed User Management page.' },
    { id: 3, timestamp: '2024-07-28 15:30:00', user: 'alicej', action: 'Created new election: "Annual General Meeting 2025".' },
    { id: 4, timestamp: '2024-07-28 14:00:51', user: 'bobw', action: 'Updated profile password.' },
    { id: 5, timestamp: '2024-07-28 13:12:03', user: 'alicej', action: 'Ran a system self-audit.' },
];

const initialSecurityDocs = [
    { id: 1, title: 'ISO/IEC 27001 (Information Security)', type: 'link', content: 'https://www.iso.org/isoiec-27001-information-security.html', status: 'Active' },
    { id: 2, title: 'SOC 2 Type II', type: 'link', content: 'https://www.aicpa.org/soc4so', status: 'Active' },
];

const mockAdminElections = [
    { id: 'agm-2024', title: 'Annual General Meeting 2024', status: 'Active', endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), contestants: [] },
    { id: 'proj-x-lead', title: 'Project X Leadership Vote', status: 'Active', endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), contestants: [] },
    { id: 'benefits-poll', title: 'Employee Benefits Poll 2024', status: 'Closed', contestants: [] },
    { id: 'hq-location', title: 'New Headquarter Location Poll', status: 'Upcoming', startsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), contestants: [{id: 1, name: 'City A', position: 'Location', photo: '', manifesto: 'City A offers significant tax breaks and a vibrant tech community.'}, {id: 2, name: 'City B', position: 'Location', photo: '', manifesto: 'City B has superior transport links and access to a larger talent pool.'}] },
    { id: 'charity-drive', title: 'Annual Charity Drive Partner', status: 'Closed', contestants: [] },
];

// --- Sub-Components for Admin Pages ---

const Countdown: React.FC<{ date: Date }> = ({ date }) => {
    const [timeLeft, setTimeLeft] = useState(date.getTime() - Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(date.getTime() - Date.now());
        }, 1000);
        return () => clearInterval(timer);
    }, [date]);

    if (timeLeft <= 0) {
        return <span className="font-mono text-green-400">Live</span>;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <span className="font-mono text-amber-400 text-xs sm:text-sm">
            {days > 0 && `${days}d `}{hours.toString().padStart(2, '0')}h {minutes.toString().padStart(2, '0')}m {seconds.toString().padStart(2, '0')}s
        </span>
    );
};

const AdminDashboard = () => (
    <div>
        <p className="mb-6">An overview of ongoing elections, voter turnout, and system health.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-lg text-center">
                <h3 className="text-3xl sm:text-4xl font-bold text-green-400">2</h3>
                <p className="text-slate-400 mt-2">Ongoing Elections</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg text-center">
                <h3 className="text-3xl sm:text-4xl font-bold text-green-400">76%</h3>
                <p className="text-slate-400 mt-2">Average Voter Turnout</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg text-center">
                 <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 flex items-center justify-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    Healthy
                </h3>
                <p className="text-slate-400 mt-2">System Status</p>
            </div>
        </div>
    </div>
);

const AdminElections = () => {
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'create'
    const [creationStep, setCreationStep] = useState(1); // 1 for details, 2 for voters
    const [elections, setElections] = useState(mockAdminElections);
    const [electionTitle, setElectionTitle] = useState('');
    const [contestants, setContestants] = useState([]);
    const [currentContestant, setCurrentContestant] = useState({ name: '', position: '', photo: '', manifesto: '' });
    const [voterDataFile, setVoterDataFile] = useState(null);
    const [editingElectionId, setEditingElectionId] = useState(null);

    const resetForm = () => {
        setElectionTitle('');
        setContestants([]);
        setCurrentContestant({ name: '', position: '', photo: '', manifesto: '' });
        setVoterDataFile(null);
        setEditingElectionId(null);
        setCreationStep(1);
        setViewMode('list');
    };

    const handleAddContestant = () => {
        if (currentContestant.name && currentContestant.position && currentContestant.manifesto) {
            setContestants([...contestants, { ...currentContestant, id: Date.now() }]);
            setCurrentContestant({ name: '', position: '', photo: '', manifesto: '' });
        } else {
            alert('Please fill in the name, position, and manifesto for the contestant.');
        }
    };
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setVoterDataFile(e.target.files[0]);
        }
    };

    const handleSubmitElection = () => {
        if (!electionTitle || contestants.length === 0) {
            alert('Please provide an election title and at least one contestant.');
            return;
        }
         if (!voterDataFile && !editingElectionId) { // Only require file on create
            alert('Please upload the voter data file.');
            return;
        }

        if (editingElectionId) {
            // Update existing election
            setElections(elections.map(e => 
                e.id === editingElectionId 
                ? { ...e, title: electionTitle, contestants: contestants }
                : e
            ));
            alert(`Election "${electionTitle}" updated successfully.`);
        } else {
            // Create new election
            const newElection = {
                id: electionTitle.toLowerCase().replace(/\s/g, '-'),
                title: electionTitle,
                status: 'Upcoming',
                startsAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                contestants: contestants
            };
            setElections([...elections, newElection]);
            alert(`Election "${electionTitle}" created with ${contestants.length} contestants.`);
        }
        resetForm();
    };

    const handleEdit = (election) => {
        setEditingElectionId(election.id);
        setElectionTitle(election.title);
        setContestants(election.contestants || []);
        setViewMode('create');
        setCreationStep(1);
    };

    const activeElections = elections.filter(e => e.status === 'Active');
    const upcomingElections = elections.filter(e => e.status === 'Upcoming');
    const closedElections = elections.filter(e => e.status === 'Closed');

    return (
        <div>
            <div className="flex border-b border-slate-700 mb-6">
                <button onClick={() => { setViewMode('list'); resetForm(); }} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'list' ? 'border-b-2 border-green-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                    Election List
                </button>
                 <button onClick={() => { setViewMode('create'); setEditingElectionId(null); }} className={`px-4 py-2 text-sm font-medium transition-colors ${viewMode === 'create' ? 'border-b-2 border-green-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                    {editingElectionId ? 'Edit Election' : 'Create New'}
                </button>
            </div>

            {viewMode === 'create' ? (
                 <div className="animate-fade-in">
                    <p className="mb-6">{editingElectionId ? `Editing election: ${electionTitle}` : 'Create a new election in two steps.'}</p>
                    <div className="bg-slate-900/50 p-6 rounded-lg">
                        
                        {/* Step 1: Election Details */}
                        {creationStep === 1 && (
                            <div>
                                <h3 className="font-bold text-xl mb-4 text-white border-b border-slate-700 pb-3">Step 1: Election Details</h3>
                                <div className="space-y-4">
                                    <input type="text" placeholder="Election Title" value={electionTitle} onChange={e => setElectionTitle(e.target.value)} className="w-full bg-slate-700 p-2 rounded-md border border-slate-600 focus:ring-green-500 focus:outline-none" />
                                    
                                    <div className="border border-slate-700 p-4 rounded-lg">
                                        <h4 className="font-semibold text-lg mb-3 text-white">Add Contestant</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Full Name" value={currentContestant.name} onChange={e => setCurrentContestant({...currentContestant, name: e.target.value})} className="bg-slate-700 p-2 rounded-md border border-slate-600" />
                                            <input type="text" placeholder="Position" value={currentContestant.position} onChange={e => setCurrentContestant({...currentContestant, position: e.target.value})} className="bg-slate-700 p-2 rounded-md border border-slate-600" />
                                            <input type="text" placeholder="Photo URL" value={currentContestant.photo} onChange={e => setCurrentContestant({...currentContestant, photo: e.target.value})} className="md:col-span-2 bg-slate-700 p-2 rounded-md border border-slate-600" />
                                            <textarea placeholder="Contestant Manifesto / Policy Statements" value={currentContestant.manifesto} onChange={e => setCurrentContestant({...currentContestant, manifesto: e.target.value})} className="md:col-span-2 bg-slate-700 p-2 rounded-md border border-slate-600 h-24 resize-y"></textarea>
                                        </div>
                                         <button onClick={handleAddContestant} className="mt-4 bg-blue-600 hover:bg-blue-700 p-2 px-4 rounded-md transition">Add Contestant</button>
                                    </div>

                                    {contestants.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-lg mt-4 mb-2 text-white">Contestants Added</h4>
                                            <div className="space-y-2">
                                                {contestants.map(c => (
                                                    <div key={c.id} className="flex justify-between items-center bg-slate-700/50 p-2 rounded-md">
                                                        <div>
                                                            <p>{c.name} ({c.position})</p>
                                                            <p className="text-xs text-slate-400 italic">Manifesto Added</p>
                                                        </div>
                                                        <button onClick={() => setContestants(contestants.filter(con => con.id !== c.id))} className="text-red-400 text-xs hover:underline">Remove</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <button onClick={() => setCreationStep(2)} className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-md transition font-bold mt-4" disabled={!electionTitle || contestants.length === 0}>Next: Upload Voters</button>
                                </div>
                            </div>
                        )}
                        
                        {/* Step 2: Voter Data */}
                        {creationStep === 2 && (
                             <div>
                                <h3 className="font-bold text-xl mb-4 text-white border-b border-slate-700 pb-3">Step 2: Voters Data</h3>
                                 <p className="mb-4 text-sm text-slate-400">Upload the CSV or Excel file containing voter details (ID, Name, Email, Photo URL). {editingElectionId && "Uploading a new file will replace the existing one."}</p>
                                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                                    <input type="file" id="voterFile" onChange={handleFileChange} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="hidden" />
                                    <label htmlFor="voterFile" className="cursor-pointer text-green-400 hover:underline">
                                        {voterDataFile ? `Selected file: ${voterDataFile.name}` : 'Choose a file to upload...'}
                                    </label>
                                    <p className="text-xs text-slate-500 mt-2">CSV or Excel files only</p>
                                </div>
                                <div className="flex gap-4 mt-6">
                                    <button onClick={() => setCreationStep(1)} className="w-full bg-slate-600 hover:bg-slate-700 p-3 rounded-md transition font-bold">Back</button>
                                    <button onClick={handleSubmitElection} className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-md transition font-bold">{editingElectionId ? 'Update Election' : 'Create Election'}</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-fade-in">
                    {/* Active Elections */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-green-400">Active Elections</h3>
                        <div className="space-y-4">
                            {activeElections.map(e => (
                                <div key={e.id} className="bg-slate-900/50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <p className="font-semibold text-white">{e.title}</p>
                                    <div className="text-sm">Ends in: <Countdown date={e.endsAt} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Upcoming Elections */}
                     <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">Upcoming Elections</h3>
                        <div className="space-y-4">
                             {upcomingElections.map(e => (
                                <div key={e.id} className="bg-slate-900/50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <div className="flex-1">
                                        <p className="font-semibold text-white">{e.title}</p>
                                        <div className="text-sm mt-1">Starts in: <Countdown date={e.startsAt} /></div>
                                    </div>
                                    <button onClick={() => handleEdit(e)} className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition self-start sm:self-center">Edit</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Closed Elections */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-slate-400">Closed Elections</h3>
                        <div className="space-y-4">
                             {closedElections.map(e => (
                                <div key={e.id} className="bg-slate-900/50 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                    <p className="font-semibold text-white">{e.title}</p>
                                    <div className="flex gap-2 mt-3 sm:mt-0 w-full sm:w-auto">
                                        <button onClick={() => alert(`Viewing results for ${e.title}`)} className="flex-1 sm:flex-none text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md transition">View Results</button>
                                        <button onClick={() => alert(`Downloading report for ${e.title}`)} className="flex-1 sm:flex-none text-sm bg-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-md transition">Download Report</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const AdminAudit = ({ searchQuery }) => {
    const filteredLogs = useMemo(() =>
        mockAuditLogs.filter(log =>
            log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.action.toLowerCase().includes(searchQuery.toLowerCase())
        ), [searchQuery]);

    return (
        <div>
            <p className="mb-6">Review a detailed log of all administrative actions performed on the platform. Use the search bar to filter by user or action.</p>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs.map(log => (
                            <tr key={log.id} className="bg-slate-800/50 border-b border-slate-700 hover:bg-slate-700/50">
                                <td className="px-6 py-4 font-mono">{log.timestamp}</td>
                                <td className="px-6 py-4">{log.user}</td>
                                <td className="px-6 py-4">{log.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const AdminUsers = ({ users, setUsers, searchQuery }) => {
    const [newUser, setNewUser] = useState({ name: '', email: '', username: '', password: '', role: 'Admin' });

    const handleCreateUser = () => {
        if(newUser.name && newUser.email && newUser.username && newUser.password && newUser.role) {
            const userToAdd = { ...newUser, id: Date.now() };
            setUsers([...users, userToAdd]);
            setNewUser({ name: '', email: '', username: '', password: '', role: 'Admin' });
             alert(`User "${userToAdd.name}" created successfully with role ${userToAdd.role}.`);
        } else {
            alert("Please fill out all fields.");
        }
    };
    
    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        ), [searchQuery, users]);

    return (
        <div>
            <p className="mb-6">Add, remove, or edit administrator roles and permissions.</p>
            <div className="bg-slate-900/50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl mb-4 text-white">Add New Administrator</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Full Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="bg-slate-700 p-2 rounded-md border border-slate-600" />
                    <input type="email" placeholder="Email Address" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="bg-slate-700 p-2 rounded-md border border-slate-600" />
                    <input type="text" placeholder="Username" value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} className="bg-slate-700 p-2 rounded-md border border-slate-600" />
                    <input type="password" placeholder="Password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} className="bg-slate-700 p-2 rounded-md border border-slate-600" />
                    <div className="md:col-span-2">
                        <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">Role</label>
                        <select id="role" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full bg-slate-700 p-2 rounded-md border border-slate-600">
                            <option>Admin</option>
                            <option>Super Admin</option>
                            <option>Election Manager</option>
                        </select>
                    </div>
                </div>
                 <button onClick={handleCreateUser} className="mt-4 w-full md:w-auto bg-green-600 hover:bg-green-700 p-2 px-6 rounded-md transition font-semibold">Create User</button>
            </div>
            <h3 className="font-bold text-lg mt-6 mb-4 text-white">Current Users</h3>
            <div className="space-y-2">
                {filteredUsers.map(user => (
                    <div key={user.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-slate-700/50 p-3 rounded-md gap-2">
                        <div>
                            <p className="font-semibold text-white">{user.name} (@{user.username})</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                        </div>
                        <span className="text-xs font-medium bg-green-800/70 text-green-300 px-2 py-1 rounded-full self-start sm:self-center">{user.role}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminSecurity = () => {
    const [documents, setDocuments] = useState(initialSecurityDocs);
    const [newDoc, setNewDoc] = useState({ title: '', type: 'link', content: '' });

    const handleAddDocument = () => {
        if (newDoc.title && newDoc.content) {
            setDocuments([...documents, { ...newDoc, id: Date.now(), status: 'Active' }]);
            setNewDoc({ title: '', type: 'link', content: '' });
        } else {
            alert('Please provide a title and content/link for the document.');
        }
    };
    
    return (
        <div>
            <p className="mb-6">Manage compliance certifications and run self-audits to ensure the integrity of the voting process.</p>
            <div className="bg-slate-900/50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl mb-4 text-white">Compliance Certificates</h3>
                 <div className="space-y-3">
                    {documents.map(doc => (
                        <div key={doc.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-slate-700/50 p-3 rounded-md gap-3">
                            <p className="flex-1">{doc.title}</p>
                            <div className="flex items-center gap-4 self-end sm:self-center">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${doc.status === 'Active' ? 'bg-green-800/70 text-green-300' : 'bg-slate-600 text-slate-300'}`}>{doc.status}</span>
                                <a href={doc.content} target="_blank" rel="noopener noreferrer" className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md transition">View</a>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
             <div className="bg-slate-900/50 p-6 rounded-lg mb-8">
                <h3 className="font-bold text-xl mb-4 text-white">Add New Compliance Document</h3>
                <div className="space-y-4">
                    <input type="text" placeholder="Document Title" value={newDoc.title} onChange={e => setNewDoc({ ...newDoc, title: e.target.value })} className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                    <div className="flex gap-4">
                        <label className="flex items-center"><input type="radio" name="docType" value="link" checked={newDoc.type === 'link'} onChange={() => setNewDoc({ ...newDoc, type: 'link' })} className="mr-2" /> Link</label>
                        <label className="flex items-center"><input type="radio" name="docType" value="text" checked={newDoc.type === 'text'} onChange={() => setNewDoc({ ...newDoc, type: 'text' })} className="mr-2" /> Text</label>
                    </div>
                    {newDoc.type === 'link' ? (
                        <input type="url" placeholder="https://example.com/document.pdf" value={newDoc.content} onChange={e => setNewDoc({ ...newDoc, content: e.target.value })} className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                    ) : (
                        <textarea placeholder="Type or paste compliance text here..." value={newDoc.content} onChange={e => setNewDoc({ ...newDoc, content: e.target.value })} className="w-full h-24 bg-slate-700 p-2 rounded-md border border-slate-600"></textarea>
                    )}
                    <button onClick={handleAddDocument} className="w-full md:w-auto bg-green-600 hover:bg-green-700 p-2 px-6 rounded-md transition font-semibold">Add Document</button>
                </div>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-lg">
                 <h3 className="font-bold text-xl mb-4 text-white">System Integrity Audit</h3>
                 <p className="mb-4">Perform a comprehensive self-audit of the system to check for vulnerabilities and ensure data integrity.</p>
                 <button onClick={() => alert('Initiating system self-audit...')} className="bg-blue-600 hover:bg-blue-700 p-2 px-6 rounded-md transition font-semibold">Run Self-Audit</button>
            </div>
        </div>
    );
};

const AdminProfile = () => {
    const [profilePic, setProfilePic] = useState('https://i.pravatar.cc/150?u=prince');
    const [newProfilePicUrl, setNewProfilePicUrl] = useState('');

    const handleUpdatePicture = () => {
        if (newProfilePicUrl) {
            setProfilePic(newProfilePicUrl);
            setNewProfilePicUrl('');
            alert('Profile picture updated!');
        }
    };
    
    return (
        <div>
            <p className="mb-6">Update your personal information, username, and password.</p>
             <div className="bg-slate-900/50 p-6 rounded-lg max-w-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex flex-col items-center">
                    <h3 className="font-bold text-xl mb-4 text-white">Profile Picture</h3>
                    <img src={profilePic} alt="Admin profile" className="w-32 h-32 rounded-full mb-4 border-4 border-slate-600" />
                    <input type="text" placeholder="Enter new image URL" value={newProfilePicUrl} onChange={e => setNewProfilePicUrl(e.target.value)} className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                    <button onClick={handleUpdatePicture} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-md transition font-semibold">Update Picture</button>
                 </div>
                 <div>
                    <h3 className="font-bold text-xl mb-4 text-white">Update Details</h3>
                    <div className="space-y-4">
                         <input type="text" placeholder="Username" defaultValue="prince" className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                        <input type="password" placeholder="Current Password" className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                        <input type="password" placeholder="New Password" className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                        <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-700 p-2 rounded-md border border-slate-600" />
                        <button onClick={() => alert('Profile updated!')} className="w-full bg-green-600 hover:bg-green-700 p-2 rounded-md transition font-semibold">Update Profile</button>
                    </div>
                 </div>
            </div>
        </div>
    );
};

// --- Main Layout Component ---

interface AdminLayoutProps {
    onLogout: () => void;
    role: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout, role }) => {
    const [activePage, setActivePage] = useState('Dashboard');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState(initialUsers);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const baseMenuItems = ['Dashboard', 'Elections', 'User Management', 'Security Compliance', 'Profile'];
    const menuItems = role === 'super-admin' ? [...baseMenuItems, 'Audit Log'] : baseMenuItems;

    const handleMenuClick = (item: string) => {
        setActivePage(item);
        setSearchQuery('');
        setIsSidebarOpen(false); // Close sidebar on navigation
    };

    const renderPage = () => {
        switch (activePage) {
            case 'Dashboard': return <AdminDashboard />;
            case 'Elections': return <AdminElections />;
            case 'User Management': return <AdminUsers users={users} setUsers={setUsers} searchQuery={searchQuery} />;
            case 'Audit Log': return role === 'super-admin' ? <AdminAudit searchQuery={searchQuery} /> : null;
            case 'Security Compliance': return <AdminSecurity />;
            case 'Profile': return <AdminProfile />;
            default: return <AdminDashboard />;
        }
    }
    
    const searchablePages = ['User Management', 'Audit Log'];

    return (
        <div className="relative md:flex min-h-screen w-full bg-transparent animate-fade-in">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                 <div 
                    className="fixed inset-0 bg-black/60 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
           
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-800/80 backdrop-blur-lg text-white flex flex-col border-r border-slate-700 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-center h-20 border-b border-slate-700 flex-shrink-0">
                    <Logo className="w-10 h-10" />
                    <h1 className="text-xl font-bold ml-2">Admin Panel</h1>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {menuItems.map(item => (
                        <button
                            key={item}
                            onClick={() => handleMenuClick(item)}
                            className={`w-full text-left flex items-center px-4 py-2 rounded-lg transition-colors ${activePage === item ? 'bg-green-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-700 flex-shrink-0">
                     <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/50 transition-colors"
                    >
                       Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-y-auto">
                 <header className="flex justify-between items-center mb-6 pb-6 border-b border-slate-700 sticky top-0 bg-blue-950/80 backdrop-blur-sm z-20 px-4 sm:px-6 lg:px-10 pt-6">
                    <div className="flex items-center">
                        <button className="text-white mr-4 md:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h1 className="text-xl sm:text-3xl font-bold text-white">{activePage}</h1>
                    </div>
                     {searchablePages.includes(activePage) && (
                        <div className="w-full max-w-xs hidden sm:block">
                           <input 
                                type="search" 
                                placeholder={`Search in ${activePage}...`}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            />
                        </div>
                    )}
                </header>
                {searchablePages.includes(activePage) && (
                     <div className="w-full px-4 sm:hidden mb-4">
                       <input 
                            type="search" 
                            placeholder={`Search...`}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                        />
                    </div>
                )}
                <div className="flex-1 bg-slate-800/50 backdrop-blur-md rounded-lg p-4 sm:p-6 text-slate-300 m-4 sm:m-6 lg:m-10 mt-0">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;