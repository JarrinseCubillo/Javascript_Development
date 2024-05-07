const actualYear=2024
    const locale='en' //Spanish

    const weekDays = [...Array(7).keys()]
    const internationalDays = new Intl.DateTimeFormat(locale, { weekday:'long' })

    const weekDaysNames= weekDays.map((_,weekDayIndex) =>{
        const date = new Date(2021,10,weekDayIndex+1)
         const weekDayName = internationalDays.format(date)
         return weekDayName
    })

    const renderWeekDays = weekDaysNames.map(weekDayName =>
        `<li class="day-name">${weekDayName} </li>`).join('')


    const months = [...Array(12).keys()]
    const international = new Intl.DateTimeFormat(locale, { month:'long' })

    const calendar = months.map(monthKey=> {
      const monthName = international.format(new Date(actualYear,
      monthKey))

        const nextMonthIndex = monthKey +1
        const daysofMonth = new Date(actualYear,nextMonthIndex,0).getDate()

        const startsOn = new Date(actualYear, monthKey, 1).getDay()
        
      return {
          monthName,
          daysofMonth,
          startsOn
      }
    })

    const html = calendar.map(({daysofMonth, monthName,startsOn}
    ) => {
        const days= [...Array(daysofMonth).keys()]

        const firstDaysAttributes = `class='first-day' style='--first-day-start: ${startsOn}'`
        const renderedDays = days.map((day,index) =>
            `<li ${index===0 ? firstDaysAttributes : ''}>${day + 1}</li>`
        ).join('')

        const title =`<h1>${monthName.toUpperCase()} ${actualYear}</h1>`
        
        return `${title}<ol>${renderWeekDays} ${renderedDays}</ol>`
    }).join('')
           
    document.querySelector('div').innerHTML= html