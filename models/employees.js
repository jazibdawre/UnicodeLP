const mongoose = require('mongoose');

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const schema = mongoose.Schema;

const employeeSchema = new schema({
    name: {
        type: String,
        required: true
    },
    contacts: [Number],
    salary: {
        type: Currency,
        required: true
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);