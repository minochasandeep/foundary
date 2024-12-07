// hooks/useTimezonePreferences.ts
import { useContext } from 'react';
import { TimezonePreferencesContext, TimezonePreferencesContextProps } from '@/context/timezone-context';

export const useTimezonePreferences = (): TimezonePreferencesContextProps => {
    return useContext(TimezonePreferencesContext);
};
