//Function to update date and time
function UpdateDateTime() {
    const now = new Date(); 
    const formattedDateTime = now.toLocaleString(); 
    document.getElementById('date-time').textContent = formattedDateTime; 
    sessionStorage.setItem('currentDateTime', formattedDateTime); 
}

//Initialization of the timer to refresh the displayed time every second
setInterval(UpdateDateTime, 1000);

//Initializes the date and time display once the user loads a page, also maintains it throughout the entire web page
document.addEventListener('DOMContentLoaded', () => {
    const storedDateTime = sessionStorage.getItem('currentDateTime');
    if (storedDateTime) {
        document.getElementById('date-time').textContent = storedDateTime; 
    } else {
        UpdateDateTime();
    }

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (event) => {
            if (!ValidateForm(form)) {
                //Prevents the submission event from going through
                event.preventDefault();
            }
        });
    });
});

//Function to validate form inputs
function ValidateForm(form) {
    //Selects all the elements contained in the form
    const inputs = form.querySelectorAll('input, select, textarea'); 
    let isValid = true;
    //Store error messages for re-use
    let errorMessages = [];

    inputs.forEach(input => {
        //Input validity check
        if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = 'red';
            errorMessages.push(`${input.name} cannot be blank`);
        } else {
            //Color reset if the new input is valid
            input.style.borderColor = '';
        }

        //Email validity check using regex
        if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
            isValid = false; 
            input.style.borderColor = 'red'; 
            errorMessages.push(`${input.name} is not a valid email format`);
        }
    });

   
    if (!isValid) {
        alert(`Please fill in all required fields correctly:\n${errorMessages.join('\n')}`);
    }

    return isValid; 
}
