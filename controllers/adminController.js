const Student = require('../models/studentModel')
const Manager = require('../models/managerModel')
const Teacher = require('../models/teacherModel')

exports.createManager = async (req,res) =>{
    const {name,surname,lastname,username,password} = req.body

    const userExists = await Manager.findOne({username})
    if(userExists){
        return res.json({message: "Username already taken"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newUser = await new Manager({
            name,
            surname,
            lastname,
            username,
            password: hashedPassword,
        })
        await newUser.save()
        res.json({newUser})
    } catch (err) {
        console.log(err)
    }
}
exports.createTeacher = async (req,res) =>{
    const {name,surname,lastname,username,password} = req.body

    const userExists = await Teacher.findOne({username})
    if(userExists){
        return res.json({message: "Username already taken"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newUser = await new Manager({
            name,
            surname,
            lastname,
            username,
            password: hashedPassword,
        })
        await newUser.save()
        res.json({newUser})
    } catch (err) {
        console.log(err)
    }
}
exports.addStudent = async (req,res) =>{
    const userId = req.params.id
    const {username,password} = req.body

    const userExists = await Student.findOne({username})
    const user = await Student.findById(userId)

    if(userExists) return res.json({message: "Username already taken"})
    if (!user) return res.json({ message: "Student not found" })
    if (user.status !== 'created') return res.json({ message: "Student already added" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const updateUser = await Student.findOneAndUpdate(
            {_id: userId},
            {username, password: hashedPassword, status:'added'},
            {new: true}
        )
        await updateUser.save()
        res.json({updateUser})
    } catch (err) {
        console.log(err)
    }
}