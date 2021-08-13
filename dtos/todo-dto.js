module.exports = class TodoDto {
    subject
    content
    isChecked
    _id
    deadline

    constructor(model) {
        this.subject = model.subject
        this.content = model.content
        this._id = model._id
        this.isChecked = model.isChecked
        this.deadline = model.deadline
    }
}