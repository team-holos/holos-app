import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
const resources = {
  de: {
    translation: {
      settings: "Einstellungen",
      personalData: "Persönliche Daten",
      healthGoals: "Gesundheitsziele",
      notificationSettings: "Benachrichtigungseinstellungen",
      theme: "Theme",
      language: "Sprache",
      light: "Hell",
      dark: "Dunkel",
      save: "Speichern",
      reset: "Zurücksetzen"
    },
  },
  en: {
    translation: {
      settings: "Settings",
      personalData: "Personal Data",
      healthGoals: "Health Goals",
      notificationSettings: "Notification Settings",
      theme: "Theme",
      language: "Language",
      light: "Light",
      dark: "Dark",
      save: "Save",
      reset: "Reset"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
