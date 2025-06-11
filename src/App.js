import React, { useState } from 'react';
import TestCaseForm from './components/TestCaseForm';
import JsonResult from './components/JsonResult';
import { parseTestCases } from './utils/parseTestCases';
import Header from './components/Header'; // ¡Importa tu componente Header!

const App = () => {
  const [jsonResult, setJsonResult] = useState([]);

  const handleSubmit = ({ folderId, projectId, testCases }) => {
    const parsedData = parseTestCases(testCases, folderId, projectId);
    setJsonResult(parsedData);
  };

  const handleReset = () => {
    setJsonResult([]);
  };

  return (
    <div className="min-h-screen bg-gray-50"> {/* Eliminamos el py-12 px-4 sm:px-6 lg:px-8 de aquí */}
      <Header /> {/* ¡Renderiza tu Header aquí! */}
      
      <div className="max-w-3xl mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8"> {/* Añadimos el padding y centrado aquí */}
        {/* Eliminamos el div con h1 y p que eran el título y descripción, ya están en el Header */}
        {/*
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Test Case JSON Generator</h1>
          <p className="mt-2 text-sm text-gray-600">
            Genera un JSON con todos los casos de prueba
          </p>
        </div>
        */}
        <TestCaseForm onSubmit={handleSubmit} onReset={handleReset} />
        {jsonResult.length > 0 && <JsonResult jsonData={jsonResult} />}
      </div>
    </div>
  );
};

export default App;