import * as React from 'react';
import LanguageContext, { MessageOptions, SupportedLanguage } from './LanguageContext';

const PropertiesEn = require('./message.properties').default;
const PropertiesEs = require('./message_es.properties').default;
const LanguageResources: { [id: string]: { [id: string]: (replacements?: any) => string } } = {
  en: PropertiesEn,
  es: PropertiesEs,
  defaultLang: PropertiesEn,
};

export const LanguageProvider = (props: { children: any }) => {
  const [lang, setLang] = React.useState('en' as SupportedLanguage);
  const _ = React.useMemo(
    () => (msg?: string, replace?: any, options?: MessageOptions) => {
      if (!msg) return '';
      const messages = LanguageResources[lang] || LanguageResources.defaultLang;
      if (messages[msg]) {
        return messages[msg](replace);
      }
      return msg;
    },
    [lang],
  );
  return (
    <LanguageContext.Provider
      value={{
        _,
        messageReady: true,
        lang,
        setLang,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};
