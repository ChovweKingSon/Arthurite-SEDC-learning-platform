import React, { useState } from 'react';
import VoterApp from './VoterApp';
import AdminApp from './AdminApp';
import Logo from './components/common/Logo';

type AppMode = 'voter' | 'admin';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('voter');

  return (
    <div className="relative min-h-screen text-white font-sans">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm overflow-y-auto">
        
        <div className="absolute top-4 right-4 z-50">
            <button 
                onClick={() => setAppMode(appMode === 'voter' ? 'admin' : 'voter')}
                className="bg-slate-700/50 backdrop-blur-md text-xs text-slate-300 py-1 px-3 rounded-full hover:bg-slate-600/50 transition border border-slate-600"
                aria-label={`Switch to ${appMode === 'voter' ? 'admin' : 'voter'} view`}
            >
                Switch to {appMode === 'voter' ? 'Admin' : 'Voter'}
            </button>
        </div>
        <div className="w-full max-w-md mx-auto text-center pt-8 sm:pt-12 pb-8 px-4">
             <header className="flex flex-col items-center justify-center">
                <Logo className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3" />
                <h1 className="text-3xl sm:text-4xl font-bold text-green-400">VoteXpert</h1>
                <p className="text-slate-400 mt-1 text-sm sm:text-base">Empowering Transparent Decisions.</p>
            </header>
        </div>

        {appMode === 'voter' ? <VoterApp /> : <AdminApp />}
      </div>
    </div>
  );
}

export default App;