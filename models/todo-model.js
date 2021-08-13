const {Schema, model} = require('mongoose')

const TodoSchema = new Schema({
    subject: {type: String, default: null},
    content: {type: String, required: true},
    isChecked: {type: Boolean, default: false},
    deadline: {type: Date, },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = model('Todo', TodoSchema)