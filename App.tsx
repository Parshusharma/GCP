
import React, { useState, useCallback } from 'react';
import { generateImageFromPrompt } from './services/geminiService';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptForm } from './components/PromptForm';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A glass of water half filled.');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImageFromPrompt(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate image: ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
            AI Image Generator
          </h1>
          <p className="text-slate-400 mt-2">
            Bring your ideas to life with the power of Gemini's Imagen 4.
          </p>
        </header>

        <main className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleGenerateImage}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-80 bg-slate-900/50 rounded-lg">
                <LoadingSpinner />
                <p className="mt-4 text-slate-300">Generating your masterpiece...</p>
              </div>
            ) : (
              <ImageDisplay imageUrl={generatedImage} />
            )}
          </div>
        </main>
        
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Google Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
