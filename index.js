function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

//     
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      } else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  

function getNextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var counter = 0;
    while(1){
        counter++;
        var strdate = getDateAsString(nextDate);
        var resultList = checkPalindromeForAllDateFormats(strdate);

        // console.log(resultList);
        
        for(let i=0; i< resultList.length;i++){
            if(resultList[i])
            {
                return [counter,nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }

}

function getPreviousDate(date){
    var day = date.day -1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day === 0){
        month--;

        if(month === 0)
        {
            day=31;
            month=12;
            year--; 
        }
        else if(month===2)
        {
             if(isLeapYear(year))
             {
                day=29;
             }
             else{
                 day=28;
             }
        }
        else{
            day= daysInMonths[month-1];
        }
    }
    return{
        day:day,
        month: month,
        year: year,
    };
}

function getPreviousPalindromeDate(date)
{
    var previousDate = getPreviousDate(date);
    var counter=0;
    while(1){
        counter++;
        var strdate = getDateAsString(previousDate);
        var resultList = checkPalindromeForAllDateFormats(strdate);
        for(let i=0; i< resultList.length;i++){
            if(resultList[i])
            {
                return[counter,previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

function clickHandler(e)
{
    var bdaystring = BirthdayInput.value;
    if(bdaystring !== "")
    {  
        var date = bdaystring.split("-");
        // console.log("hi",date);
        var yyyy= date[0];
        var mm = date[1];
        var dd =date[2];

        var date ={
            day:Number(dd),
            month:Number(mm),
            year:Number(yyyy)
        };
        var strdate = getDateAsString(date);
        var list = checkPalindromeForAllDateFormats(strdate);
        var isPalindrome = false;

        for(let i=0; i < list.length;i++){
            if(list[i])
            {
                isPalindrome =true;
                break;
            }
        }
        if(!isPalindrome)
        {
            const [counter1,nextDate]=getNextPalindromeDate(date);
            const [counter2,previousDate]= getPreviousPalindromeDate(date);

            if(counter1 > counter2)
            {
                outputEl.innerText = `The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed by ${counter2} days.`;
            }
            else{
                outputEl.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${counter1} days.`;
              }
        }
            else 
            {
                outputEl.innerText ="Yay! your birthday is palindrome";
            }
    
    }
}

checkButton.addEventListener("click",clickHandler);