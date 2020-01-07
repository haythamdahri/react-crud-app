export default class PersonModel {
    constructor(id: Number, name: String, email: String) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    areFieldsNotEmpty() {
        return this.name !== '' && this.email !== '';
    }

}