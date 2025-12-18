declare global {
  interface Window {
    wp?: {
      i18n?: {
        __: (text: string, domain?: string) => string;
        _x: (text: string, context: string, domain?: string) => string;
        _n: (single: string, plural: string, number: number, domain?: string) => string;
        _nx: (single: string, plural: string, number: number, context: string, domain?: string) => string;
        sprintf: (format: string, ...args: any[]) => string;
      };
    };
  }
}

const getI18n = () => {
  if (typeof window !== 'undefined' && window.wp?.i18n) {
    return window.wp.i18n;
  }
  
  return {
    __: (text: string) => text,
    _x: (text: string) => text,
    _n: (single: string) => single,
    _nx: (single: string) => single,
    sprintf: (format: string, ...args: any[]) => {
      return format.replace(/%[sdj%]/g, (match) => {
        if (match === '%%') return '%';
        const arg = args.shift();
        if (arg === undefined) return match;
        return String(arg);
      });
    },
  };
};

export const __ = (text: string, domain: string = 'sage'): string => {
  return getI18n().__(text, domain);
};

export const _x = (text: string, context: string, domain: string = 'sage'): string => {
  return getI18n()._x(text, context, domain);
};

export const _n = (single: string, plural: string, number: number, domain: string = 'sage'): string => {
  return getI18n()._n(single, plural, number, domain);
};

export const sprintf = (format: string, ...args: any[]): string => {
  return getI18n().sprintf(format, ...args);
};
