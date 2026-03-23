import React from 'react';
import type { KioskProfile } from '../kiosk-profile.js';

interface EmergencyScreenProps {
  profile: KioskProfile;
}

const EmergencyScreen: React.FC<EmergencyScreenProps> = ({ profile }) => {
  const contacts = profile.emergencyContacts;
  const accentColor = profile.branding?.accentColor ?? '#3b82f6';

  return (
    <div className="px-6 pt-8 pb-16 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🆘</span>
        <div>
          <h1 className="text-2xl font-medium text-slate-100">Notfallkontakte</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Rechtliche Unterstützung und Beratung
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <p className="text-slate-500 text-center py-16">
          Keine Kontakte konfiguriert.
        </p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
            >
              <p className="text-lg font-medium text-slate-100 mb-3">
                {contact.label}
              </p>

              <div className="flex flex-col gap-2">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform"
                      style={{ background: `${accentColor}25`, color: accentColor }}
                    >
                      📞
                    </span>
                    <span className="text-xl font-mono tracking-wide">
                      {contact.phone}
                    </span>
                  </a>
                )}

                {contact.url && (
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-400 hover:text-slate-200 transition-colors group"
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: '#ffffff08' }}
                    >
                      🌐
                    </span>
                    <span className="text-sm truncate">{contact.url}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 px-4 py-3 bg-slate-800/50 rounded-xl text-xs text-slate-500 leading-relaxed">
        Diese App dient der Dokumentation und Information. Sie ist kein Ersatz für
        anwaltliche Beratung. Bitte wende dich in dringenden Fällen direkt an einen Anwalt.
      </div>
    </div>
  );
};

export default EmergencyScreen;
