const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User ' },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    salary: {type: Number, required: true},
});

module.exports = mongoose.model('Employee', employeeSchema);