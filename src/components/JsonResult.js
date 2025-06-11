import React, { useState } from 'react';

const JsonResult = ({ jsonData }) => {
  const [copied, setCopied] = useState(false);

  // Función para generar el string JSON sin las barras invertidas en las comillas internas
  const getUnescapedJsonString = () => {
    let jsonString = JSON.stringify(jsonData, null, 2);
    jsonString = jsonString.replace(/\\"/g, '"'); 
    return jsonString;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getUnescapedJsonString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Función para descargar el archivo JSON
  const handleDownload = () => {
    const jsonString = getUnescapedJsonString();
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test_cases.json'; // Nombre del archivo a descargar
    document.body.appendChild(a); // Necesario para Firefox
    a.click();
    document.body.removeChild(a); // Limpiar el elemento a
    URL.revokeObjectURL(url); // Liberar el objeto URL
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Resultado JSON</h2>
        <div className="relative flex space-x-2"> {/* Agregamos 'flex space-x-2' para alinear los botones */}
          <button
            onClick={handleCopy}
            className="bg-emerald-500 text-white py-1 px-3 rounded-md text-sm hover:bg-emerald-600 transition-colors"
          >
            Copiar JSON
          </button>
          <button
            onClick={handleDownload} // Nuevo botón de descarga
            className="bg-emerald-500 text-white py-1 px-3 rounded-md text-sm hover:bg-emerald-600 transition-colors" // Usamos un color de Kushki
          >
            Descargar JSON
          </button>
          {copied && (
            <span className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              ¡Copiado!
            </span>
          )}
        </div>
      </div>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
        {getUnescapedJsonString()} 
      </pre>
    </div>
  );
};

export default JsonResult;