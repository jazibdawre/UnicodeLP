const mongoose = require('mongoose');
const schema = mongoose.Schema;

const customerSchema = new schema({
    name: {
        type: String,
        required: true
    },
    contacts: [Number],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
},{
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);