import React, { useEffect, useState } from 'react';
import FilterPanel from './components/FilterPanel';
import ProgramList from './components/ProgramList';
import usePrograms from './hooks/usePrograms';
import axios from 'axios';

const App = () => {
  // State for metadata (researchAreas, states, etc.)
  const [researchAreas, setResearchAreas] = useState([]);
  const [states, setStates] = useState([]);

  // Custom hook for program data + filter state
  const { programs, loading, error, filters, setFilters } = usePrograms({});

  // Fetch metadata once (e.g., from /api/metadata/researchAreas, /api/metadata/states)
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [rRes, sRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/metadata/researchAreas`),
          axios.get(`${process.env.REACT_APP_API_URL}/metadata/states`)
        ]);
        setResearchAreas(rRes.data); // e.g. ['AI', 'Systems', …]
        setStates(sRes.data);        // e.g. ['Texas', 'California', …]
      } catch (err) {
        console.error('Error fetching metadata:', err);
      }
    };
    fetchMeta();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">CS Grad Programs Finder</h1>
      </header>

      <div className="flex">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          researchAreas={researchAreas}
          states={states}
        />

        <main className="flex-1 p-6">
          <ProgramList programs={programs} loading={loading} error={error} />
        </main>
      </div>

      <footer className="bg-gray-200 text-center py-4">
        © {new Date().getFullYear()} CS Grad Finder. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
