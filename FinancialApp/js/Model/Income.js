class Income extends  Data{

    static countIncome=0;

    constructor(description,value) {
        super(description,value);
        this._id=++Income.countIncome;
    }

    get id(){return this._id;}
}