import React, { useState } from 'react';

const PROJECTS = [
  { name: 'Data Management (DMOE)', id: '10924' },
  { name: 'Cards & Acquiring (CAR)', id: '10809' },
  { name: 'Billpocket (BP)', id: '10786' },
  { name: 'Transfer & APMs (TYA)', id: '10803' },
  { name: 'OPS (PLA)', id: '10807' }
];

const TestCaseForm = ({ onSubmit, onReset }) => {
  const [folderId, setFolderId] = useState('');
  const [project, setProject] = useState(null);
  const [testCases, setTestCases] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project) return;
    onSubmit({ 
      folderId, 
      projectId: project.id, 
      testCases 
    });
  };

  const handleReset = () => {
    setFolderId('');
    setProject(null);
    setTestCases('');
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Project</label>
        <select
          value={project?.id || ''}
          onChange={(e) => {
            const selected = PROJECTS.find(p => p.id === e.target.value);
            setProject(selected || null);
          }}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          required
        >
          <option value="">Selecciona tu proyecto</option>
          {PROJECTS.map((proj) => (
            <option key={proj.id} value={proj.id}>
              {proj.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Folder ID</label>
        <input
          type="text"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Test Cases (pega aquí la tabla generada por la IA)</label>
        <textarea
          value={testCases}
          onChange={(e) => setTestCases(e.target.value)}
          rows="10"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black font-mono text-sm"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-emerald-500 text-white py-1 px-3 rounded-md text-sm hover:bg-emerald-600 transition-colors flex-1" // Añadimos flex-1 para que ocupe espacio similar
        >
          Generate JSON
        </button>
        <button
          type="button"
          onClick={handleReset}
          // Cambiamos el color, texto y altura para que coincida con el botón de "Generate JSON"
          className="bg-emerald-500 text-white py-1 px-3 rounded-md text-sm hover:bg-emerald-600 transition-colors flex-1" // Usamos las mismas clases de color y tamaño
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TestCaseForm;