const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    const employees = await Employee.find({ userId: req.user._id });
    res.render('index', { employees });
});

router.get('/search', auth, async (req, res) => {
    const { search } = req.query;
    console.log(search);
    let employees;
    if (search) {
        const regex = new RegExp(search, 'i');
        employees = await Employee.find({
            userId: req.user._id,
            $or: [
                { name: regex },
                { email: regex },
                { position: regex },
                { department: regex }
            ]
        });
    } else {
        employees = await Employee.find({ userId: req.user._id });
    }
    res.render('index', { employees, search });
});

router.get('/add', auth, (req, res) => {
    res.render('add');
});

router.post('/add', auth, async (req, res) => {
    const { name, email, position, department, salary } = req.body;
    const newEmployee = new Employee({
        userId: req.user._id,
        name,
        email,
        position,
        department,
        salary,
    });await newEmployee.save();
    req.flash('success_msg', 'Employee added successfully');
    res.redirect('/');
});

router.get('/edit/:id', auth, async (req, res) => {
    const employee = await Employee.findOne({ _id: req.params.id, userId: req.user._id });
    if (!employee) {
        req.flash('error_msg', 'Employee not found');
        return res.redirect('/');
    }
    res.render('edit', { employee });
});

router.post('/edit/:id', auth, async (req, res) => {
    const { name, email, position, department, salary } = req.body;
    await Employee.findOneAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { name, email, position, department, salary }
    );
    req.flash('success_msg', 'Employee updated successfully');
    res.redirect('/');
});

router.get('/delete/:id', auth, async (req, res) => {
    await Employee.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    req.flash('success_msg', 'Employee deleted successfully');
    res.redirect('/');
});

module.exports = router;