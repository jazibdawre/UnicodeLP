const mongoose = require('mongoose');
const schema = mongoose.Schema;

const projectSchema = new schema({
    name: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    startdate: {
        type: Date,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);