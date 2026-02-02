
import React from 'react';

interface StepIndicatorProps {
    steps: string[];
    currentStepIndex: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStepIndex }) => {
    return (
        <div className="flex items-start justify-between w-full max-w-sm mx-auto">
            {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isActive = index === currentStepIndex;

                return (
                    <React.Fragment key={step}>
                        <div className="flex flex-col items-center text-center">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                ${isCompleted ? 'bg-green-500 text-white' : ''}
                                ${isActive ? 'bg-green-500 border-2 border-green-300 text-white' : ''}
                                ${!isCompleted && !isActive ? 'bg-slate-700 text-slate-400 border-2 border-slate-600' : ''}`}
                            >
                                {isCompleted ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <span className="font-bold text-sm">{index + 1}</span>
                                )}
                            </div>
                             <p className={`mt-2 text-xs transition-colors duration-300 hidden sm:block ${isActive ? 'text-green-400 font-semibold' : 'text-slate-500'}`}>
                                {step}
                            </p>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`flex-1 h-1 mx-2 transition-colors duration-300 mt-3.5 ${isCompleted ? 'bg-green-500' : 'bg-slate-700'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepIndicator;