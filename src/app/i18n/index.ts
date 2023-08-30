import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import enEnums from './en/enums.json';
import enComponents from './en/components.json';

export const initI18n = () =>
    i18n.use(initReactI18next)
        .init({
            resources: {
                en: {
                    enums: enEnums,
                    components: enComponents,
                }
            },
            lng: 'en',
            fallbackLng: 'en'
        })

export const useComponentsTranslation = (componentName?: string) =>
    useTranslation('components', componentName ? {keyPrefix: componentName} : undefined);

export const useEnumsTranslation = (enumName?: string) =>
    useTranslation('enums', enumName ? {keyPrefix: enumName} : undefined);