import React, { useState, useCallback } from 'react';
import { AppStep } from './types';
import LoginPage from './components/LoginPage';
import OtpPage from './components/OtpPage';
import FaceVerificationPage from './components/FaceVerificationPage';
import SelectElectionPage from './components/SelectElectionPage';
import StepIndicator from './components/common/StepIndicator';
import VoterHeader from './components/VoterHeader';
import VotingDashboardPage from './components/VotingDashboardPage';
import VoteSuccessPage from './components/VoteSuccessPage';
import ResultsPage from './components/ResultsPage';


function VoterApp() {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.LOGIN);
  const [voterInfo, setVoterInfo] = useState({ id: '', email: '' });
  const [activeElection, setActiveElection] = useState<string | null>(null);

  const goTo = useCallback((step: AppStep) => setCurrentStep(step), []);

  const handleLoginSuccess = useCallback((id: string, email: string) => {
    setVoterInfo({ id, email });
    goTo(AppStep.OTP);
  }, [goTo]);

  const handleLogout = useCallback(() => {
    setVoterInfo({ id: '', email: '' });
    setActiveElection(null);
    goTo(AppStep.LOGIN);
  }, [goTo]);

  const handleVoteNow = useCallback((electionId: string) => {
    setActiveElection(electionId);
    goTo(AppStep.VOTING_DASHBOARD);
  }, [goTo]);

  const handleViewResults = useCallback((electionId: string) => {
    setActiveElection(electionId);
    goTo(AppStep.VIEW_RESULTS);
  }, [goTo]);

  const renderStep = () => {
    const commonPages = [
        AppStep.SELECT_ELECTION, 
        AppStep.VOTING_DASHBOARD, 
        AppStep.VOTE_SUCCESS, 
        AppStep.VIEW_RESULTS
    ];
    const showHeader = currentStep !== AppStep.LOGIN && currentStep !== AppStep.OTP && currentStep !== AppStep.FACE_VERIFICATION;
    
    const pageContent = () => {
        switch (currentStep) {
        case AppStep.LOGIN:
            return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        case AppStep.OTP:
            return <OtpPage onOtpSuccess={() => goTo(AppStep.FACE_VERIFICATION)} onGoBack={() => goTo(AppStep.LOGIN)} email={voterInfo.email} />;
        case AppStep.FACE_VERIFICATION:
            return <FaceVerificationPage onVerificationSuccess={() => goTo(AppStep.SELECT_ELECTION)} />;
        case AppStep.SELECT_ELECTION:
            return <SelectElectionPage voterId={voterInfo.id} onVoteNow={handleVoteNow} onViewResults={handleViewResults} />;
        case AppStep.VOTING_DASHBOARD:
            return <VotingDashboardPage electionId={activeElection!} onVoteCasted={() => goTo(AppStep.VOTE_SUCCESS)} />;
        case AppStep.VOTE_SUCCESS:
            return <VoteSuccessPage onBackToElections={() => goTo(AppStep.SELECT_ELECTION)} onViewResults={() => goTo(AppStep.VIEW_RESULTS)} />;
        case AppStep.VIEW_RESULTS:
            return <ResultsPage electionId={activeElection!} />;
        default:
            return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        }
    }
    
    return (
        <>
            {showHeader && <VoterHeader voterId={voterInfo.id} onLogout={handleLogout} onNavigate={goTo} />}
            <div className={`w-full ${commonPages.includes(currentStep) ? '' : 'max-w-md'} mx-auto px-4 sm:px-6 lg:px-8`}>
                 {pageContent()}
            </div>
        </>
    );
  };
  
  const steps = ['Login', 'OTP', 'Face ID', 'Vote'];
  const showStepIndicator = [AppStep.LOGIN, AppStep.OTP, AppStep.FACE_VERIFICATION].includes(currentStep);

  return (
    <div className="flex flex-col items-center justify-center">
        {showStepIndicator && (
             <div className="mb-8 w-full max-w-md px-4">
                <StepIndicator steps={steps} currentStepIndex={currentStep} />
             </div>
        )}
        <main className="w-full">
            {renderStep()}
        </main>
    </div>
  );
}

export default VoterApp;