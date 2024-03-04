exports.getLogin = async (req, res) => {
    res.render('login', {currentPage: 'login', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.getManager = async (req, res) => {
    res.render('manager', {currentPage: 'manager', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.getAdmin = async (req, res) => {
    res.render('admin', {currentPage: 'admin', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.getTeacher = async (req, res) => {
    res.render('teacher', {currentPage: 'teacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.getStudent = async (req, res) => {
    res.render('student', {currentPage: 'student', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.createManager = async (req, res) => {
    res.render('components/createManager', {currentPage: 'subadmin', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.createTeacher = async (req, res) => {
    res.render('components/createTeacher', {currentPage: 'subadmin', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.addStudent = async (req, res) => {
    res.render('components/addStudent', {currentPage: 'subadmin', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.createClass = async (req, res) => {
    res.render('components/createClass', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.createStudent = async (req, res) => {
    res.render('components/createStudent', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.addStudentToClass = async (req, res) => {
    res.render('components/updateClass', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.createClassSchedule = async (req, res) => {
    res.render('components/createClassSchedule', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.addLessons = async (req, res) => {
    res.render('components/addLessonDays', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.updateLessons = async (req, res) => {
    res.render('components/updateLessonDays', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.getAttendance = async (req, res) => {
    res.render('components/getAttendance', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.updateAttendance = async (req, res) => {
    res.render('components/updateAttendance', {currentPage: 'subteacher', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.addManagerToSchool = async (req, res) => {
    res.render('components/addManagerToSchool', {currentPage: 'subadmin', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}

exports.updateSchoolManager = async (req, res) => {
    res.render('components/updateSchoolManager', {currentPage: 'subadmin', admin: req.cookies.admin, manager: req.cookies.manager, teacher: req.cookies.teacher, student: req.cookies.student})
}