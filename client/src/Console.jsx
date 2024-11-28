import React, { useState } from 'react';
import axios from 'axios';
import { Editor } from '@monaco-editor/react'; // Correct import

function Console() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [testCases, setTestCases] = useState([{ input: '', expected: '' }]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle code submission
  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    const payload = {
      code,
      language,
      testCases,
    };

    try {
      const response = await axios.post('http://localhost:3001/run-code', payload);
      setResults(response.data.results);
    } catch (err) {
      setError('An error occurred while running the code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle test case input change
  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  // Add new test case
  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expected: '' }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Online Code Console
      </h1>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        {/* Language Selection */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Select Language:</label>
          <select
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
        </div>

        {/* Code Editor with Monaco Editor */}
        <div className="mb-4">
          <Editor
            height="300px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || '')}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className={`p-3 text-white rounded-lg transition ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </button>
        </div>

        {/* Results Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          {error && <p className="text-red-500">{error}</p>}
          {results &&
            results.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 border rounded mb-4 shadow-sm transition hover:shadow-lg"
              >
                <p className="font-semibold">
                  Output: <span className="font-normal">{result.output}</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Console;
