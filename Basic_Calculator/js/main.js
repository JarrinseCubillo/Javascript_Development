const Calculation = (opt) => {
    const forms = document.getElementById('forms');
    let number= parseFloat(forms['Operator1'].value);
    let number2 = parseFloat(forms['Operator2'].value);
    let result=0;

    let checkResult = ValidateValues(number, number2);
    if (checkResult===0)
        return;
    
    switch (opt) {
     case 1:  
        result=Sum(number,number2);
        break;
     case 2:  
        result=Subtract(number,number2);
        break;
     case 3:  
        result=Multiply(number,number2);
        break;
     case 4:  
        result=Divide(number,number2);
        break;
    }
    document.getElementById("result").innerHTML=result;
}


let ValidateValues =(num,num2) =>{
  if ((isNaN(num))||(isNaN(num2))) {
    alert('Ingrese todos los valores para realizar los calculos');
    return 0;
  }
}
let Sum = (num,num2) => {
  return num+num2;
}

let Subtract = (num,num2) =>{
  return num-num2;
}
let Multiply = (num,num2) =>{
  return num*num2;
}

let Divide = (num,num2) =>{
  if(num2===0.0)
    return("No se puede dividir entre cero.");
    
  return num/num2;
}