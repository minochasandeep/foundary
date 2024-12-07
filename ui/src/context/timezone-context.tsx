// context/timezone-context.tsx
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Preference, TimezonePreference } from "preferences";
import { useSwrWithTrigger } from "@/hooks/swr-hooks";
import { convertDateTime } from "@/utils/date-formatter/date-formatter";

export interface DateConversionProps {
  date: string;
  toUTC?: boolean;
  format?: string;
}

export interface TimezonePreferencesContextProps {
  preferredTimezone: string;
  convertToDateTime: (props: DateConversionProps) => string;
}

export const TimezonePreferencesContext =
  createContext<TimezonePreferencesContextProps>({
    preferredTimezone: "",
    convertToDateTime: ({ date, toUTC, format }: DateConversionProps) => "",
  });

interface TimezonePreferencesProviderProps {
  children: ReactNode;
}

export const TimezonePreferencesProvider: React.FC<
  TimezonePreferencesProviderProps
> = ({ children }) => {
  const [preferredTimezone, setPreferredTimeZone] = useState("");
  const { data } = useSwrWithTrigger<
    Preference<TimezonePreference>,
    TimezonePreference
  >("/preferences/timezone");

  useEffect(() => {
    if (data && data.value && data.value.timezone) {
      setPreferredTimeZone(data.value.timezone);
    }
  }, [data]);

  const convertToDateTime = useCallback(
    ({ date, toUTC = false, format = "LLLL" }: DateConversionProps) => {
      return convertDateTime(date, toUTC, preferredTimezone, format);
    },
    [preferredTimezone],
  );

  return (
    <TimezonePreferencesContext.Provider
      value={{ preferredTimezone, convertToDateTime }}
    >
      {children}
    </TimezonePreferencesContext.Provider>
  );
};
