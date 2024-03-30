const calculateBtn = document.getElementById("calculate-age");
const dayInput = document.getElementById("dayOfBirth");
const monthInput = document.getElementById("monthOfBirth");
const yearInput = document.getElementById("yearOfBirth");

const getInputValues = function () {
    const dayOfBirth = Math.abs(parseInt(dayInput.value));
    const monthOfBirth = Math.abs(parseInt(monthInput.value)) - 1;
    const yearOfBirth = Math.abs(parseInt(yearInput.value));
    let values = [dayOfBirth, monthOfBirth, yearOfBirth];

    return values;
};

function getPersonsFullAge(arr) {
    const dayValue = arr[0];
    const monthValue = arr[1];
    const yearValue = arr[2];

    const currentDate = new Date();
    const birthDate = new Date(yearValue, monthValue, dayValue);

    let ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageInMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageInDays = currentDate.getDate() - birthDate.getDate();

    if (ageInDays < 0) {
        // Adjusting the age in months and days when the birthdate's day is greater than the current date's day
        ageInMonths -= 1;
        const lastMonthDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0
        ); // This gets the last day from the previous month by adding 0 as para for day
        ageInDays += lastMonthDate.getDate(); // adds the last day from prev month to age in days in case ageInDays is negative number (ex: today: 25/07/2023 birthday: 27/07/2023: ageInDays is -2, lastMonthDate is 30 results 28days)
        console.log(ageInDays);
    }

    if (ageInMonths < 0) {
        ageInYears -= 1;
        ageInMonths += 12;
    }

    const age = [ageInDays, ageInMonths, ageInYears];
    return age;
}

function showAge(arr) {
    const years = document.getElementById("years");
    const month = document.getElementById("months");
    const days = document.getElementById("days");

    years.innerHTML = arr[2];
    month.innerHTML = arr[1];
    days.innerHTML = arr[0];
}

function calculateAge() {
    const ageOfPerson = getPersonsFullAge(getInputValues());
    showAge(ageOfPerson);
}

function onError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".feedback");
    const input = inputControl.querySelector(".form-control");
    const label = inputControl.querySelector(".form-label");
    label.classList.add("color-red");
    input.classList.add("border-red");
    errorDisplay.innerHTML = `<p class="color-red validation-text error">${message}</p>`;
    inputControl.classList.remove("success");
}

function onSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".feedback");
    const input = inputControl.querySelector(".form-control");
    const label = inputControl.querySelector(".form-label");
    label.classList.remove("color-red");
    input.classList.remove("border-red");
    errorDisplay.innerHTML = "";
}

function validateForm(arr) {
    if (arr[1] === 3 && arr[0] > 30) {
        onError(dayInput, "Must be a valid day");
    } else {
        arr[0] > 31 || isNaN(arr[0])
            ? onError(dayInput, "Must be a valid day")
            : onSuccess(dayInput);
        arr[1] > 12 - 1 || isNaN(arr[1])
            ? onError(monthInput, "Must be a valid month")
            : onSuccess(monthInput);
        arr[2] > new Date().getFullYear() || isNaN(arr[2])
            ? onError(yearInput, "Must be in the past")
            : onSuccess(yearInput);
    }

    const hasErrors =
        dayInput.classList.contains("border-red") ||
        monthInput.classList.contains("border-red") ||
        yearInput.classList.contains("border-red");

    return hasErrors; // If returns true will not calculate age
}

function showResult() {
    if (validateForm(getInputValues())) {
        return;
    } else {
        calculateAge();
    }
}

calculateBtn.addEventListener("click", showResult);

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        showResult();
    }
});