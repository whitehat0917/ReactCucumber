import * as React from 'react';
import LanguageContext, { MessageOptions } from './LanguageContext';

export type MessageFunction = (msg: string, replacements?: any, options?: MessageOptions) => string;

export interface LocaleProps {
  _: MessageFunction;
  messagesReady: boolean;
}

export function useLocalizable(baseKey = '') {
  const ctx = React.useContext(LanguageContext);
  if (baseKey) {
    return {
      _: (msg?: string, replacements?: any, options?: any) => ctx._(`${baseKey}.${msg}`, replacements, options),
      messageReady: ctx.messageReady,
    };
  }
  return { _: ctx._, messageReady: ctx.messageReady };
}

export function localizable<T>(Comp: React.ComponentType<T & LocaleProps>, baseKey = ''): React.ComponentType<T> {
  return (props: T) => (
    <LanguageContext.Consumer>
      {(ctx) => (
        <Comp
          {...props}
          _={(msg, ...args: any[]) => ctx._(`${baseKey ? baseKey + '.' : ''}${msg}`, ...args)}
          messagesReady={ctx.messageReady}
        />
      )}
    </LanguageContext.Consumer>
  );
}
