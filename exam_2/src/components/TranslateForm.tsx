import React, {useState, useRef} from 'react'
import * as T from '../utils/types'
import TranslateUtils from '../utils/TranslateUtils'
import * as TT from '../utils/TranslateUtils/types'

import styles from '../styles/TranslateForm.module.css'

const TranslateForm = () => {
    const [state, setState] = useState({
        from: '',
        to: '',
        source: '',
        translated: '',
        languages: [],
        languageNames: []
    } as T.IState)

    const from_ta: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null)
    const to_ta: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(null)
    const from_sel: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)
    const to_sel: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    let {from, to, source, translated, languages, languageNames} = state

    if(!languages.length) {
        TranslateUtils.getSupportedLangList('en').then(data => {
            const dat: TT.ILangListAPIResponse = data as TT.ILangListAPIResponse

            if(dat.langs) {
                for(const[key, val] of Object.entries(dat.langs)){
                    languages.push(key)
                    languageNames.push(val)
                }

                setState({
                    from: from,
                    to: to,
                    source: source,
                    translated: translated,
                    languages: languages,
                    languageNames: languageNames
                } as T.IState)
            }
        })
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.charCode === 13){
            e.preventDefault()

            if(from_sel && from_sel.current) {
                from = from_sel.current.value
            }

            if(to_sel && to_sel.current) {
                to = to_sel.current.value
            }

            if(from_ta && from_ta.current) {
                source = from_ta.current.value
            }

            if(to_ta && to_ta.current) {
                translated = to_ta.current.value
            }

            let direction = ''

            if(from === 'auto') {
                direction = to
            }
            else {
                direction = `${from}-${to}`
            }

            if(source) {
                TranslateUtils.translate(source, direction).then(data => {
                    const dat: TT.ITranslateAPIResponse = data as TT.ITranslateAPIResponse

                    if(dat.text) {
                        translated = dat.text[0]

                        setState({
                            from: from,
                            to: to,
                            source: source,
                            translated: translated,
                            languages: languages,
                            languageNames: languageNames
                        })
                    }
                })
            }
            else {
                setState({
                    from: from,
                    to: to,
                    source: source,
                    translated: translated,
                    languages: languages,
                    languageNames: languageNames
                })
            }
        }
    }

    const languagesFrom: string[] = ['auto', ...languages] 
    const languageNamesFrom: string[] = ['auto', ...languageNames]

    return (
        <div className={styles.container}>
            <div className={styles.from}>
                <p className={styles.paragraph}>
                    <select>
                        {languageNamesFrom.map((elem, idx) => {
                            return <option value={languagesFrom[idx]}>{elem}</option>
                        })}
                    </select>
                </p>
                <p className={styles.paragraph}>
                    <textarea
                    className={styles.input} 
                    ref={from_ta} 
                    onKeyPress={(e) => handleKeyPress} 
                    placeholder='Input text needed to translate'>{source}</textarea>
                </p>
            </div>
            <div className={styles.to}>
                <p className={styles.paragraph}>
                    <select>
                        {languageNames.map((elem, idx) => {
                            return <option value={languages[idx]}>{elem}</option>
                        })}
                    </select>
                </p>
                <p className={styles.paragraph}>
                    <textarea className={styles.output} ref={to_ta} placeholder='Input text needed to translate' value={translated}/>
                </p>
            </div>

        </div>
    )
}

export default TranslateForm