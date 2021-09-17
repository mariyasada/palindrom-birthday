function reverseString(str){
    var listOfCharacters = str.split("");
    var reversedListOfCharacter = listOfCharacters.reverse();
    var reversedstring =reversedListOfCharacter.join("");
    return reversedstring;
}
function isStringPalindrome(str){
    var reversedstring= reverseString(str);
    return str === reversedstring;
}

function getDateAsString(date){
    var dateInStr={ day:" ", month:" ", year:" "};
    if(date.day<10){
        dateInStr.day = "0" + date.day;
    }
    else
    {
        dateInStr.day = date.day.toString();
    }
    if(date.month <10)
    {
        dateInStr.month = "0" + date.month;
    }
    else
    {
        dateInStr.month = dateInStr.month.toString();
    }
    dateInStr.year = date.year.toString();
    return dateInStr;
}
function getDateInAllFormats (date) {

    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateFormats(date){

    var dateFormatList = getDateInAllFormats(date);
    var palindromeList=[];

    for(var i=0 ; i< dateFormatList.length;i++)
    {
        var result = isStringPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function isLeapYear(year){
    if(year % 400 === 0) return true;
    if(year%100 === 0) return true;
    if(year%4 ===0) return true;

    return false;

}
function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

//     
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) 
    {
      if (isLeapYear(year))
       {
        if (day > 29) {
          day = 1;
          month = 3;
        }
      } 
      else {
        if (day > 28) {
          day = 1;
          month = 3;
        }
      }
    } 
    else {
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
    var cter = 0;
    while(1){
        cter++;
        var strdate = getDateAsString(nextDate);
        var resultList = checkPalindromeForAllDateFormats(strdate);

        // console.log(resultList);
        
        for(let i=0; i< resultList.length;i++){
            if(resultList[i])
            {
                return [cter,nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }

}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day === 0){
        month--;

        if(month === 0)
        {
            month=12;
            day=31;            
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
            day= daysInMonth[month - 1];
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
    var cter = 0;
    while(1){
        cter++;
        var strdate = getDateAsString(previousDate);
        var resultList = checkPalindromeForAllDateFormats(strdate);
        for(let i=0; i< resultList.length;i++){
            if(resultList[i])
            {
                return[cter,previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}


const BirthdayInput = document.querySelector("#Birthday-input");
const checkButton = document.querySelector("#check-button");
const outputEl = document.querySelector("#output");

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
            const [cter1,nextDate]=getNextPalindromeDate(date);
            const [cter2,previousDate]= getPreviousPalindromeDate(date);

            if(cter1 > cter2)
            {
                outputEl.innerText = `The nearest palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed by ${cter2} days.`;
            }
            else{
                outputEl.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${cter1} days.`;
              }
        }
            else 
            {
                outputEl.innerText ="Yay! your birthday is palindrome";
            }
    
    }
}

checkButton.addEventListener("click",clickHandler);
    