declare module "preferences" {
    interface Preference<T> {
        id: number;
        userId: number;
        key: string;
        value: T;
    }

    interface ThemePreference {
        theme: "light" | "dark";
    }

    interface TimezonePreference {
        timezone: string;
    }


    interface LocalePreference {
        locale: string;
    }

    interface OrganizationPreference {
        organizationId: number;
    }

}