import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-500 to-blue-950 py-6 px-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between w-full"> 
        
        {/* Lado izquierdo: Título de la aplicación JSON Generator */}
        {/* Usamos text-white para que se vea bien en el fondo oscuro del header */}
        <h1 className="text-2xl font-bold text-white">Json Generator by IntelliPrompt</h1> 

        {/* Sección central: Contenedor para los dos logos */}
        <div className="flex items-center gap-2"> {/* Puedes ajustar el 'gap' para más o menos espacio entre los logos */}
          {/* Logo de Kushki */}
          {/* Asegúrate que la ruta sea correcta. Si KUSHKI.png está en public/, usa src="KUSHKI.png" */}
          <img src="KUSHKI.png" alt="Logo de Kushki" className="h-14" />

          {/* Logo de IntelliPrompt */}
          {/* Asegúrate que la ruta sea correcta. Si logoIntelliPrompt.png está en public/, usa src="logoIntelliPrompt.png" */}
          <img src="logoIntelliPrompt.png" alt="Logo de IntelliPrompt" className="h-16" />
        </div>

        {/* Lado derecho: El texto de la descripción */}
        <div className="text-white opacity-90">
          Convierte tu tabla en JSON para QMetry
        </div>
      </div>
    </header>
  );
};

export default Header;