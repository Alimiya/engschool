i18next.init({
    lng: 'kz',
    debug: true,
    resources: {
        kz: {
            translation: {}
        },
        eng: {
            translation: {}
        },
        ru: {
            translation: {}
        }
    }
}, function (err) {
    if (err) return console.error(err)
})
