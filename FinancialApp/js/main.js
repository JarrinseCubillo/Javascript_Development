let savedIncomes = JSON.parse(localStorage.getItem('income'));
let savedEgresses= JSON.parse(localStorage.getItem('egress'));

let incomes=[]
let egresses = [];

if (savedIncomes!=null)
    incomes =  Array.from(savedIncomes);

if(savedEgresses!=null)
    egresses =  Array.from(savedEgresses);

let loadApp=()=>{
    loadHeader();
    loadIncomes();
    loadEgresses();
    cleanValues();
}


let totalIncomes=()=>{
   let totalIncome=0;
   for(let income of incomes){
       totalIncome += income.value;
   }
   return totalIncome;
}

let totalEgress=()=>{
    let totalEgress=0;
    for(let egress of egresses){
        totalEgress+=egress.value;
    }
    return totalEgress;
}

let loadHeader=()=>{
    let budget = totalIncomes()-totalEgress();
    let percentageEgress=totalEgress()/totalIncomes();
    document.getElementById('budget').innerHTML=currencyFormat(budget);
    document.getElementById('percentage').innerHTML=percentageFormat(percentageEgress);
    document.getElementById('income').innerHTML=currencyFormat(totalIncomes());
    document.getElementById('egress').innerHTML=currencyFormat(totalEgress());
}


const loadIncomes =() =>{
    let incomesHTML='';
    for(let income of incomes){
        incomesHTML+=createIncomeHTML(income);
    }
    document.getElementById('list-incomes').innerHTML=incomesHTML;
}

const deleteIncome=(id)=>{
    let indexToDelete=incomes.findIndex(income=>income.id===id);
    incomes.splice(indexToDelete, 1);
    loadApp();
}

const createIncomeHTML=(income)=> {
    let incomeHtml=`
      <div class="element cleanStyles">
        <div class="element_description">${income.description}</div>
        <div class="right cleanStyles">
            <div class="element_value">${currencyFormat(income.value)}</div>
            <div class="element_delete">
                <button class="element_delete--btn">
                    <ion-icon name="close" onclick="deleteIncome(${income.id})"></ion-icon>
                </button>
            </div>
        </div>
      </div>`

    return incomeHtml;
}

const loadEgresses=()=>{
    let egressesHTML='';
    for(let egress of egresses){
        egressesHTML+=createEgressHTML(egress);
    }
    document.getElementById('list-egress').innerHTML=egressesHTML;
}

const deleteEgress=(id)=>{
    let indexToDelete=egresses.findIndex(egress=>egress.id===id);
    egresses.splice(indexToDelete, 1);
    loadApp();
}

const createEgressHTML=(egress)=> {
    let egressHtml=`
    <div class="element cleanStyles">
                <div class="element_description">${egress.description}</div>
                <div class="right cleanStyles">
                    <div class="element_value">${egress.value}</div>
                    <div class="element_percentage">${percentageFormat(egress.value/totalEgress())}</div>
                    <div class="element_delete">
                        <button class="element_delete--btn">
                            <ion-icon name="close" onclick="deleteEgress(${egress.id})"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>`
    return egressHtml;
}

const addData=()=>{
    let forms = document.forms['forms'];
    let type =forms["type"];
    let description=forms["description"];
    let value=forms["value"];

    if(description.value !=='' && value.value !==''){
        if(type.value === 'income'){
            incomes.push(new Income(description.value, +value.value));
            loadHeader();
            loadIncomes();
            localStorageIncome(incomes);
        }
        else if(type.value ==='egress'){
            egresses.push(new Egress(description.value, +value.value));
            loadHeader();
            loadEgresses();
            localStorageEgress(egresses);
        }
        cleanValues();
    }
    else
        alert('Agrega una descripcion y un valor');

}

const cleanValues=()=>{
    document.getElementById('description').value='';
    document.getElementById('value').value='';
}

const localStorageIncome=(income)=>{
    localStorage.setItem('income', JSON.stringify(income));
}
const localStorageEgress=(egress)=>{
    localStorage.setItem('egress',JSON.stringify(egress));
}

let currencyFormat = (value) => {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 2});
}

let percentageFormat = (value) => {
    return value.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2})
}

document.getElementById('description').addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
    if (event.target.value.length > 100)
        event.target.value = event.target.value.substring(0, 100);
});

document.getElementById('value').addEventListener('input', (event) => {
    let value = event.target.value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts[1];
    }

    if (value.length > 8) {
        value = value.slice(0, 8);
    }

    event.target.value = value;
});
