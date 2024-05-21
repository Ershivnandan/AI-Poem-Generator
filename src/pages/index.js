import { useState } from "react";

export default function Home() {
  const [poem, setPoem] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generatePoem = async () => {
    setIsLoading(true);
    if (!isLoading) {
      try {
        const response = await fetch("/api/poem-generator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });

        const { poem } = await response.json();
        setPoem(poem);
      } catch (error) {
        console.error("Failed to generate poem:", error);
        setPoem("Billing is expired of the API");
      }
    } else {
      console.log("Billing is expired of the API");
      
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-75 p-4">
      <h1 className="text-4xl font-bold text-white mb-6">AI Poem Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Start typing your poetic inspiration here..."
        className="px-4 py-2 border border-gray-300 rounded-lg mb-4 w-80 h-40 bg-white bg-opacity-50 text-black placeholder-gray-700"
      />
      <button
        onClick={generatePoem}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Poem"}
      </button>
      {isLoading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}
      {poem && (
        <div className="mt-4 bg-white bg-opacity-80 p-4 rounded-lg max-w-md text-center">
          <p className="text-gray-800">{poem}</p>
        </div>
      )}
    </div>
  );
}
