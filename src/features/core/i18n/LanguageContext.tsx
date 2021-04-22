import { createContext } from 'react';

export interface MessageOptions {
  usePrefix?: string;
  usePosfix?: string;
  dontShowKeyEmpty: boolean;
}
export type SupportedLanguage = 'en' | 'es';
export default createContext<{
  _: (msg?: string, replace?: any, options?: MessageOptions) => string;
  messageReady: boolean;
  lang: SupportedLanguage;
  setLang: (s: SupportedLanguage) => any;
}>({
  _: (msg?: string, replace?: any, options?: any) => ' ',
  messageReady: false,
  lang: 'en',
  setLang: (l) => {},
});
