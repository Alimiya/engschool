exports. getLogin = async (req, res) => {
    res.render('login')
}

exports.getManager = async (req, res) => {
    res.render('manager')
}

exports.getAdmin = async (req, res) => {
    res.render('admin')
}

exports.getTeacher = async (req, res) => {
    res.render('teacher')
}

exports.getStudent = async (req, res) => {
    res.render('student')
}