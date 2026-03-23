import React from 'react';

const EmergencyScreen: React.FC = () => {
  return (
    <div className="px-4 pt-6 pb-8 max-w-lg mx-auto space-y-3">
      <h1 className="text-lg font-medium text-slate-100">Notfall</h1>
      <p className="text-sm text-slate-400">
        In akuten Situationen bitte lokale Notrufnummern und Beratungsstellen nutzen.
      </p>
    </div>
  );
};

export default EmergencyScreen;
