import TranslateUtils from '../TranslateUtils'

const testTranslateUtils = () => {
  TranslateUtils.getSupportedLangList('en').then((res) => console.log(res))
  TranslateUtils.languageDetect('My name is TranslateUtils').then((res) => console.log(res))
  TranslateUtils.languageDetect('My name is TranslateUtils', ['en', 'ru']).then((res) => console.log(res))
  TranslateUtils.translate('My name is TranslateUtils', 'ru').then((res) => console.log(res))
  TranslateUtils.translate('My name is TranslateUtils', 'en-ru').then((res) => console.log(res))
  TranslateUtils.translate('My name is TranslateUtils', 'fr').then((res) => console.log(res))
  TranslateUtils.translate('My name is TranslateUtils', 'fr', 'html').then((res) => console.log(res))
  TranslateUtils.translate('My name is TranslateUtils', 'en-zz', 'html').then((res) => console.log(res))
}

testTranslateUtils()
