let savedNames = JSON.parse(localStorage.getItem('people'));
let people =[];

if (savedNames!=null)
    people =  Array.from(savedNames);

const addPerson =() =>{
    let forms =document.forms['forms'];
    let name = forms['name'].value;
    let lastName = forms['lastName'].value;
    let resultcheckInput=checkInput(name,lastName);
    if (resultcheckInput===0)
        return;
    let person = new Person(name, lastName);
    people.push(person);
    formatInput();
    showPeople();
    localStorage.setItem('people', JSON.stringify(people));
}

const showPeople = () => {
    let peopleList='';
    for (let person of people) {
        peopleList+=`<li>${person._name} ${person._lastname}</li>`;
    }
    document.getElementById('people').innerHTML=peopleList;
}

let checkInput =(name,lastName) => {
    if(name.trim().length<3 || lastName.trim().length<3){
        alert('Ingrese Nombre y Apellido validos');
        formatInput();
        return 0;
    }
}

const formatInput = () =>{
    document.getElementById('name').value=``;
    document.getElementById('lastName').value=``;
}

document.getElementById('name').addEventListener('input', (event) => {
    validateInput(event);
});

document.getElementById('lastName').addEventListener('input', (event) => {
    validateInput(event);
});

const validateInput = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
    if (event.target.value.length > 30)
        event.target.value = event.target.value.substring(0, 30);
}
