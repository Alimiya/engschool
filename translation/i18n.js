export const i18nPromises = {
    en: fetchTranslations('en'),
    kz: fetchTranslations('kz'),
    ru: fetchTranslations('ru')
}

async function fetchTranslations(language) {
    const response = await fetch(`/${language}.json`)
    if (!response.ok) {
        throw new Error(`Failed to fetch ${language}.json: ${response.status} ${response.statusText}`)
    }
    return await response.json()
}

Promise.all(Object.values(i18nPromises)).then(translations => {
    const buttons = document.querySelectorAll('.flag-button')
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const language = this.dataset.language
            setLanguage(language)
        })
    })

    const i18n = {}
    Object.keys(i18nPromises).forEach((language, index) => {
        i18n[language] = translations[index]
    })

    function setLanguage(language) {
        const elements = document.querySelectorAll('[data-i18n]')
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n')
            element.textContent = i18n[language][key]
        })
    }

    function getLanguage(language) {
        const button = document.querySelectorAll('.btn')
        button.forEach(button => {
            const key = button.getAttribute('data-i18n')
            button.textContent = i18n[language][key]
        })
    }

    const defaultLanguage = 'kz'
    setLanguage(defaultLanguage)

}).catch(err => {
    console.log(err)
})
