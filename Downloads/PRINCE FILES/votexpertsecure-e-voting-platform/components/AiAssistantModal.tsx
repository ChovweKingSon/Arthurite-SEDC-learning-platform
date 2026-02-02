import React, { useState, useRef, useEffect } from 'react';
// Refactored to use Google Gemini API
import { GoogleGenAI } from "@google/genai";

interface AiAssistantModalProps {
    isOpen: boolean;
    onClose: () => void;
    election: {
        title: string;
        contestants: { name: string; manifesto: string }[];
    };
}

const AiAssistantModal: React.FC<AiAssistantModalProps> = ({ isOpen, onClose, election }) => {
    const [messages, setMessages] = useState<({sender: 'user' | 'ai', text: string})[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (isOpen) {
            setMessages([
                { sender: 'ai', text: `Welcome! I am a neutral AI assistant for the "${election.title}" election. How can I help you compare the candidates' policies based on their official statements?` }
            ]);
        }
    }, [isOpen, election.title]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const currentUserInput = userInput;
        const newMessages = [...messages, { sender: 'user', text: currentUserInput }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        // Replaced AWS Bedrock with Google Gemini API
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const manifestosContext = election.contestants
                .map(c => `Candidate: ${c.name}\nManifesto: ${c.manifesto}`)
                .join('\n\n---\n\n');
            
            const systemInstruction = `You are a neutral election policy expert. Your purpose is to help voters understand candidate positions.
            Based ONLY on the provided candidate manifestos below, answer the user's question concisely and without bias.
            Do not express personal opinions, use external knowledge, or speculate. Directly compare candidate stances where possible.
            If the manifestos do not contain information relevant to the question, state that the information is not available in the provided documents.`;
            
            const contents = `CANDIDATE MANIFESTOS:\n${manifestosContext}\n\nUSER QUESTION:\n${currentUserInput}`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: contents,
                config: {
                    systemInstruction: systemInstruction,
                },
            });

            const aiResponseText = response.text;

            setMessages([...newMessages, { sender: 'ai', text: aiResponseText }]);

        } catch (error) {
            console.error("Error calling Google GenAI:", error);
            setMessages([...newMessages, { sender: 'ai', text: 'Sorry, I encountered an error while processing your request with our AI assistant. Please try again.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col animate-fade-in" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="text-xl font-bold text-white">AI Manifesto Assistant</h2>
                        <p className="text-sm text-slate-400">{election.title}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </header>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">AI</div>}
                            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-300 rounded-bl-none'}`}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-end gap-2 justify-start">
                            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-xs">AI</div>
                            <div className="max-w-md p-3 rounded-lg bg-slate-700 text-slate-300 rounded-bl-none">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <footer className="p-4 border-t border-slate-700 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <input
                            type="text"
                            value={userInput}
                            // Fix: Corrected typo from e.e.target.value to e.target.value
                            onChange={e => setUserInput(e.target.value)}
                            placeholder="Ask about candidate policies..."
                            className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-green-600 text-white font-bold p-3 rounded-lg hover:bg-green-700 disabled:bg-slate-600 transition" disabled={isLoading || !userInput.trim()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default AiAssistantModal;
