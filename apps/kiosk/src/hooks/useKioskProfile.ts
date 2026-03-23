import { useState, useEffect, createContext, useContext } from 'react';
import type { KioskProfile, KioskTab } from '../kiosk-profile.js';
import { loadKioskProfile } from '../services/profile-loader.js';

interface KioskProfileContextValue {
  profile: KioskProfile | null;
  isLoading: boolean;
}

export const KioskProfileContext = createContext<KioskProfileContextValue>({
  profile: null,
  isLoading: true,
});

export function useKioskProfile(): KioskProfileContextValue {
  return useContext(KioskProfileContext);
}

export function useKioskProfileLoader(): KioskProfileContextValue {
  const [profile, setProfile] = useState<KioskProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadKioskProfile()
      .then(p => { setProfile(p); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  return { profile, isLoading };
}
