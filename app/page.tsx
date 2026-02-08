'use client';

import { useState } from 'react';
import HiveReport from '@/components/HiveReport';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/hive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">HYLE Hive Simulator</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Descrivi la tua idea..."
          className="w-full h-32 p-4 border rounded mb-4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded disabled:opacity-50"
        >
          {loading ? 'Analisi in corso...' : 'Analizza con HYLE Hive'}
        </button>
      </form>

      {report && <HiveReport report={report} />}
    </main>
  );
}
