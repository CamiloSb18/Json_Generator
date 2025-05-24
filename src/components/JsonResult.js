import React, { useState } from 'react';

const JsonResult = ({ jsonData }) => {
  const [copied, setCopied] = useState(false);

  // Función para generar el string JSON sin las barras invertidas en las comillas internas
  const getUnescapedJsonString = () => {
    // Generar el JSON string normal
    let jsonString = JSON.stringify(jsonData, null, 2);

    // Reemplazar \" con " solo dentro de los valores de cadena
    // Esto es un regex más complejo para evitar romper la estructura del JSON
    // Solo des-escapa las comillas que YA HAN SIDO ESCAPADAS por JSON.stringify
    // y que están dentro de los valores de cadenas.
    // Esto es una HACK, no es la forma correcta de manejar JSON, pero es para tu caso específico.
    jsonString = jsonString.replace(/\\"/g, '"'); 
    
    // Si quieres un enfoque MUY AGRESIVO (no recomendado para JSON generales,
    // solo si tu Postman realmente necesita esto y nada más):
    // jsonString = jsonString.replace(/\\/g, ''); // Quita TODAS las barras invertidas. PELIGROSO.
                                                 // Esto también quitaría \n, \t etc.

    return jsonString;
  };


  const handleCopy = () => {
    // Usar la función que des-escapa para copiar
    navigator.clipboard.writeText(getUnescapedJsonString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Resultado JSON</h2>
        <div className="relative">
          <button
            onClick={handleCopy}
            className="bg-black text-white py-1 px-3 rounded-md text-sm hover:bg-gray-800 transition-colors"
          >
            Copiar JSON
          </button>
          {copied && (
            <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              ¡Copiado!
            </span>
          )}
        </div>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
        {/* Usar la función que des-escapa para mostrar */}
        {getUnescapedJsonString()} 
      </pre>
    </div>
  );
};

export default JsonResult;