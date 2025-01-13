class Person{
    constructor(name,lastName){
        this._name = name;
        this._lastname = lastName;
    }

    get name(){
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    get lastName(){
        return this._lastname;
    }
    set lastName(lastName){
        this._lastname = lastName;
    }
}