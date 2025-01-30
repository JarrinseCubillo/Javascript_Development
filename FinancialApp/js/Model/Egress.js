class Egress extends Data{
    static countEgress = 0;

    constructor(description,value) {
        super(description,value);
        this._id=++Egress.countEgress;
    }

    get id(){return this._id;}
}