exports.getLogin = async (req, res) => {
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

exports.createManager = async (req, res) => {
    res.render('components/createManager')
}

exports.createTeacher = async (req, res) => {
    res.render('components/createTeacher')
}

exports.addStudent = async (req, res) => {
    res.render('components/addStudent')
}

exports.createClass = async (req, res) => {
    res.render('components/createClass')
}

exports.createStudent = async (req, res) => {
    res.render('components/createStudent')
}

exports.addStudentToClass = async (req, res) => {
    res.render('components/updateClass')
}

exports.createClassSchedule = async (req, res) => {
    res.render('components/createClassSchedule')
}

exports.addLessons = async (req, res) => {
    res.render('components/addLessonDays')
}

exports.getAttendance = async (req, res) => {
    res.render('components/getAttendance')
}

exports.updateAttendance = async (req, res) => {
    res.render('components/updateAttendance')
}