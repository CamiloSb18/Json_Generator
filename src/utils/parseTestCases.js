export const parseTestCases = (rawData, folderId, projectId) => {
  const PROJECT_CONFIG = {
    '10924': { // DMOE
      status: {
        'done': '520037',
        'in progress': '520036',
        'to do': '520035'
      },
      priority: {
        'blocker': '589140',
        'high': '589141',
        'medium': '589142',
        'low': '589143'
      },
      labels: {
        'ia': '254567',
        'ia_amazonq': '219436',
        'ia_chatgpt': '217193',
        'ia_gemini': '254566',
        'prod': '254565',
        'qa': '217192',
        'uat': '217194'
      }
    },
    '10809': { // CAR
      status: {
        'done': '302403',
        'in progress': '302402',
        'to do': '302401'
      },
      priority: {
        'blocker': '179215',
        'high': '179216',
        'medium': '179217',
        'low': '179218'
      },
      labels: {
        'ia': '254567',
        'ia_amazonq': '219436',
        'ia_chatgpt': '217193',
        'ia_gemini': '254566',
        'prod': '254565',
        'qa': '217192',
        'uat': '217194'
      }
    },
    '10786': { // BP
      status: {
        'done': '321723',
        'in progress': '321722',
        'to do': '321721'
      },
      priority: {
        'blocker': '188008',
        'high': '188009',
        'medium': '188010',
        'low': '188011'
      },
      labels: {
        'ia': '254567',
        'ia_amazonq': '219436',
        'ia_chatgpt': '217193',
        'ia_gemini': '254566',
        'prod': '254565',
        'qa': '217192',
        'uat': '217194'
      }
    },
    '10803': { // TYA
      status: {
        'done': '302421',
        'in progress': '302420',
        'to do': '302419'
      },
      priority: {
        'blocker': '179223',
        'high': '179224',
        'medium': '179225',
        'low': '179226'
      },
      labels: {
        'ia': '254567',
        'ia_amazonq': '219436',
        'ia_chatgpt': '217193',
        'ia_gemini': '254566',
        'prod': '254565',
        'qa': '217192',
        'uat': '217194'
      }
    },
    '10807': { // PLA
      status: {
        'done': '302412',
        'in progress': '302411',
        'to do': '302410'
      },
      priority: {
        'blocker': '179219',
        'high': '179220',
        'medium': '179221',
        'low': '179222'
      },
      labels: {
        'ia': '254567',
        'ia_amazonq': '219436',
        'ia_chatgpt': '217193',
        'ia_gemini': '254566',
        'prod': '254565',
        'qa': '217192',
        'uat': '217194'
      },
    '13966': { // KORS 2.0
      status: {
        'done': '570343',
        'in progress': '570342',
        'to do': '570341'
      },
      priority: {
        'blocker': '611574',
        'high': '611575',
        'medium': '611576',
        'low': '611577'
      },
      labels: {
        'ia': '270719',
        'ia_amazonq': '270720',
        'ia_chatgpt': '270721',
        'ia_gemini': '270722',
        'prod': '270725',
        'qa': '270723',
        'uat': '270724',
        'alpha': '270726'
      }
    }
    }
  };

  const config = PROJECT_CONFIG[projectId] || PROJECT_CONFIG['10924'];

  const lines = rawData.split('\n').filter(line => line.trim() !== '');
  if (lines.length < 2) return [];

  // Procesar encabezados insensibles a mayúsculas y crear un mapeo
  const headerLine = lines[0];
  const originalHeaders = headerLine.split('\t').map(header => header.trim());
  const lowerCaseHeaders = originalHeaders.map(header => header.toLowerCase());

  const testCases = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const testCaseObj = {};

    lowerCaseHeaders.forEach((lowerHeader, index) => {
      let value = values[index] ? values[index].trim() : '';
      
      // *** MODIFICACIÓN CLAVE AQUÍ: ELIMINAR COMILLAS DOBLES ***
      // Elimina todas las comillas dobles del string.
      // Si quieres solo quitar las que están al principio y al final, usarías:
      // value = value.replace(/^"|"$/g, '');
      // Pero si quieres que no aparezcan NUNCA dentro del texto, usa:
      value = value.replace(/"/g, ''); 
      
      testCaseObj[lowerHeader] = value;
    });

    // Mapeo de valores (insensible a mayúsculas)
    const priorityKey = testCaseObj.priority?.toLowerCase();
    const priorityCode = config.priority?.[priorityKey] || null;

    const statusKey = testCaseObj.status?.toLowerCase();
    const statusCode = config.status?.[statusKey] || null;

    const labels = [];
    // Acceder a Labels usando el encabezado en minúscula
    const caseLabels = testCaseObj.labels?.split(',') || [];

    caseLabels.forEach(label => {
        const trimmedLabel = label.trim().toLowerCase();
        if (config.labels?.[trimmedLabel] && !labels.includes(config.labels[trimmedLabel])) {
            labels.push(config.labels[trimmedLabel]);
        }
    });

    // Construir objeto de labels dinámicamente
    const dynamicLabels = {};
    labels.forEach((labelCode, index) => {
        dynamicLabels[`labels${index + 1}`] = labelCode;
    });

    testCases.push({
        // Acceder a los datos usando los encabezados en minúscula
        summary: testCaseObj.summary || testCaseObj.caso || '',
        precondition: testCaseObj.precondition || '',
        projectId: projectId,
        folderId: folderId,
        priority: priorityCode,
        status: statusCode,
        ...dynamicLabels, // Incluir labels dinámicamente
        stepDetails: testCaseObj['step summary'] || '',
        testData: testCaseObj['test data'] || '',
        expectedResult: testCaseObj['expected result'] || '',
        id:1,
        isChecked: false,
        isExpanded: true
    });
  }

  return testCases;
};
