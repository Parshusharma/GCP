
import React from 'react';

interface PromptFormProps {
  prompt: string;
  setPrompt: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 2zM5.105 5.105a.75.75 0 011.06 0l2.475 2.475a.75.75 0 01-1.06 1.06L5.105 6.165a.75.75 0 010-1.06zm9.79 0a.75.75 0 010 1.06l-2.475 2.475a.75.75 0 11-1.06-1.06l2.475-2.475a.75.75 0 011.06 0zM10 18a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 18zM6.165 14.895a.75.75 0 01-1.06 0l-2.475-2.475a.75.75 0 011.06-1.06l2.475 2.475a.75.75 0 010 1.06zm9.79 0a.75.75 0 010-1.06l2.475-2.475a.75.75 0 111.06 1.06l-2.475 2.475a.75.75 0 01-1.06 0zM2 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 012 10zm14.25 0a.75.75 0 010-1.5h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);


export const PromptForm: React.FC<PromptFormProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
    
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
        Enter your creative prompt
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A majestic lion wearing a crown, cinematic lighting"
          rows={2}
          className="flex-grow bg-slate-900/80 border border-slate-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 resize-none disabled:opacity-50"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <SparkleIcon className="w-5 h-5" />
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>
    </form>
  );
};
