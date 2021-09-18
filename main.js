function reverseString(str) {
    var listOfCharacters = str.split("");
    var reversedListOfCharacter = listOfCharacters.reverse();
    var reversedString = reversedListOfCharacter.join("");
    return reversedString;
  }
  
  function isStringPalindrome(str) {
    var reversedString = reverseString(str);
    return str === reversedString;
  }
  
  function convertDateToString(date) {
    var dateInStr = { day: "", month: "", year: "" };
  
    if (date.day < 10) {
      dateInStr.day = "0" + date.day;
    } else {
      dateInStr.day = date.day.toString();
    }
  
    if (date.month < 10) {
      dateInStr.month = "0" + date.month;
    } else {
      dateInStr.month = date.month.toString();
    }
  
    dateInStr.year = date.year.toString();
    return dateInStr;
  }
  
  function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }
  
  function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = isStringPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }
  
  function isLeapYear(year) {
    if (year % 400 === 0) return true;  
    if (year % 100 === 0) return false;  
    if (year % 4 === 0) return true;
  
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
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
  
  function getNextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var cter = 0;
  
    while (1) {
      cter++;
      var dateStr = convertDateToString(nextDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [cter, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  
  function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(month ===3){
        if(isLeapYear(year)){
            if( day < 1){
                day=29;
                month =2;
            }
        }else{
            if(day < 1){
                day =28;
                month =2;
            }
        }
    }
    else if(month ===12 || month === 10 || month ===8|| month===7 ||month===5)
    {
        if(day<1){
            day=30;
            month--;
        }

    }
    else if(month === 1)
    {    if(day< 1){
            day=31;
            month=12;
            year--;
    } else{
        if(day<1){
            day=31;
            month--;
        }
    }

    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }

  var date = {
      day: 31,
      month:12,
    year:2020,
  };

//   console.log(getPreviousDate(date));

  
  function getPreviousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var cter = 0;
  
    while (1) {
      cter++;
      var dateStr = convertDateToString(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [cter, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }
  
  var birthdayInput = document.querySelector("#Birthday-input");
  var showButton = document.querySelector("#check-button");
  var outputEl = document.querySelector("#output");

    showButton.addEventListener("click", () => {
        console.log("clicked")
        var birthdayString = birthdayInput.value;
    
        if (birthdayString !== "") 
    {
        var date = birthdayString.split("-");
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];
    
        var date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
        };
    
        var dateStr = convertDateToString(date);
        var list = checkPalindromeForAllDateFormats(dateStr);
        var isPalindrome = false;
    
        for (let i = 0; i < list.length; i++) 
        {
            if (list[i]) {
            isPalindrome = true;
            break;
            }
        }
    
        if (!isPalindrome)
        {
            const [cter1, nextDate] = getNextPalindromeDate(date);
            // console.log(cter1,"counter1");
            const [cter2, prevDate] = getPreviousPalindromeDate(date);
            // console.log(cter2,"counter2");
    
            if (cter1 > cter2)
             {            
            outputEl.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${cter2} days.`;
            } 
            else 
            {
            outputEl.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${cter1} days.`;
            }
        } 
         else 
         {
            outputEl.innerText = "Yay! Your birthday is palindrome!";
          }
     }
  });