import TranslateUtils from '../TranslateUtils'

async function testTranslateUtils() {
  const langLst = await TranslateUtils.getSupportedLangList('en')
  console.log(langLst)

  const lang = await TranslateUtils.languageDetect('My name is TranslateUtils')
  console.log(lang)

  const lang1 = await TranslateUtils.languageDetect('My name is TranslateUtils', ['en', 'ru'])
  console.log(lang1)

  const translated = await TranslateUtils.translate('My name is TranslateUtils', 'ru')
  console.log(translated)

  const translated1 = await TranslateUtils.translate('My name is TranslateUtils', 'en-ru')
  console.log(translated1)

  const translated2 = await TranslateUtils.translate('My name is TranslateUtils', 'fr')
  console.log(translated2)

  const translated3 = await TranslateUtils.translate('My name is TranslateUtils', 'fr', 'html')
  console.log(translated3)

  const translated4 = await TranslateUtils.translate('My name is TranslateUtils', 'en-zz', 'html')
  console.log(translated4)
}

testTranslateUtils()
