import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    fileConfig: null, // { name: '', size: 0, rows: 0, columns: 0, data: [] }
    dashboardStats: {
      totalProteins: 0,
      totalSamples: 0,
      missingValuesPercent: 0,
      significantBiomarkers: 0,
      explainedVariance: 0,
      batchEffectScore: 'N/A'
    },
    qcData: {
      densityData: [],
      heatmapData: []
    }
  });

  const processUploadedFile = async (file) => {
    // Simple reader to read file and generate some stats
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const rowsCount = Math.max(0, lines.length - 1);
        const columnsCount = lines.length > 0 ? lines[0].split(',').length : 0;
        
        // Mocking proteomics stats based on rows/cols
        const totalProteins = rowsCount;
        const totalSamples = columnsCount;
        const missingValuesPercent = Math.min((Math.random() * 5).toFixed(2), 100);
        const significantBiomarkers = Math.floor(totalProteins * 0.05); // 5% significant
        const explainedVariance = (70 + Math.random() * 20).toFixed(1);
        
        // Update context
        setAppData(prev => ({
          ...prev,
          fileConfig: {
            name: file.name,
            size: file.size,
            rows: rowsCount,
            columns: columnsCount,
            // we won't save full raw data to avoid memory issues with large files, just what we need
          },
          dashboardStats: {
            totalProteins,
            totalSamples,
            missingValuesPercent,
            significantBiomarkers,
            explainedVariance,
            batchEffectScore: missingValuesPercent > 2 ? 'High' : 'Low'
          }
        }));
        
        resolve({
          rows: rowsCount,
          columns: columnsCount,
          missingValues: Math.floor((rowsCount * columnsCount) * (missingValuesPercent/100)),
          outliers: Math.floor(rowsCount * 0.01),
          suggestedFixes: [
            `Impute ${missingValuesPercent}% missing values using KNN`,
            `Normalize intensity using Log2 transformation`
          ]
        });
      };
      reader.readAsText(file);
    });
  };

  return (
    <DataContext.Provider value={{ appData, processUploadedFile, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};
