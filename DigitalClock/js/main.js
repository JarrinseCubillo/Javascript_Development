const showClock =()=>{
    let date = new Date();
    let hours = formatDigits(date.getHours());
    let minutes = formatDigits(date.getMinutes());
    let seconds = formatDigits(date.getSeconds());

    const months =['Enero','Febrero','Marzo','Abril',
                            'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre',
                            'Octubre', 'Noviembre', 'Diciciembre'];

    const days =['Domingo','Lunes','Martes','Miercoles',
                          'Jueves','Viernes','Sabado'];

    let dayOfWeek = days[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let dateText= `${dayOfWeek} ${day} de ${month} del ${year}`;

    document.getElementById('hour').innerHTML=`${hours}:${minutes}:${seconds}`;
    document.getElementById('date').innerHTML=dateText;
    document.getElementById('container').classList.toggle('animate');
}

const formatDigits = (time)=>{
    if (time < 10){
        time = '0'+time;
    }
    return time;
}

setInterval(showClock,1000);