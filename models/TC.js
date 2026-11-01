const mongoose = require('mongoose');

const TCSchema = new mongoose.Schema({
    tc_no: {
        type: String,
        required: true,
        unique: true
    },
    roll_no: String,
    student_name: String,
    parent_name: String,
    nationality: String,
    religion: String,
    caste: String,
    gender: String,
    dob: String,
    admission_date: String,
    batch: String,
    part1: String,
    part3: String,
    medium: String,
    fee_due: String,
    medical_report: String,
    left_date: String,
    conduct: String,
    tc_applied_date: String,
    tc_issued_date: String,
    qualified_status: String,
    programme_study: String,
    duration: String,
    umis_no: String,
    shift: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('TC', TCSchema);