async function fetchTranslations(language) {
    try {
        const response = await fetch(`/${language}.json`)
        if (!response.ok) {
            throw new Error(`Failed to fetch ${language}.json: ${response.status} ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Internal server error')
    }
}

const i18n = {}

function setLanguage(language) {
    const elements = document.querySelectorAll('[data-i18n]')
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n')
        element.textContent = i18n[language][key] || ''
    })
    localStorage.setItem('language', language)
}

document.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = localStorage.getItem('language') || 'kz'

    try {
        const translations = await Promise.all([
            fetchTranslations('en'),
            fetchTranslations('kz'),
            fetchTranslations('ru')
        ]);

        ['en', 'kz', 'ru'].forEach((language, index) => {
            i18n[language] = translations[index]
        })

        const buttons = document.querySelectorAll('.flag-button')
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const language = this.dataset.language
                setLanguage(language)
            })
        })

        setLanguage(savedLanguage)
    } catch (error) {
        console.error('Internal server error')
    }
})
export default i18n