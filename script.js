document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById('registrationForm');
    let fullName = document.getElementById('fullName');
    let lastName = document.getElementById('lastName');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');
    let mobile = document.getElementById('mobile');
    let dob = document.getElementById('dob');
    let gender = document.querySelectorAll('input[name="gender"]');
    let country = document.getElementById('country');
    let addEmailBtn = document.getElementById("addEmail");
    let inviteEmailsDiv = document.getElementById("inviteEmails");

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
    });

    const setError = (element, message) => {
        let inputControl = element.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
        element.classList.add('error-border');
    }

    const setSuccess = element => {
        let inputControl = element.parentElement;
        let errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
        element.classList.remove('error-border');
    };

    const isValidEmail = email => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
        let fullNameValue = fullName.value.trim();
        let lastNameValue = lastName.value.trim();
        let emailValue = email.value.trim();
        let passwordValue = password.value.trim();
        let confirmPasswordValue = confirmPassword.value.trim();
        let mobileValue = mobile.value.trim();
        let dobValue = dob.value;
        let genderValue = document.querySelector('input[name="gender"]:checked');
        let countryValue = country.value;

        if(fullNameValue === '') {
            setError(fullName, 'Full name is required.');
        } else if (fullNameValue.length > 35) {
            setError(fullName, 'Enter a valid full name.');
        } else {
            setSuccess(fullName);
        }

        if(lastNameValue === '') {
            setError(lastName, 'Last name is required.');
        } else {
            setSuccess(lastName);
        }

        if(emailValue === '') {
            setError(email, 'Email is required.');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address.');
        } else {
            setSuccess(email);
        }

        if(passwordValue === '') {
            setError(password, 'Password is required.');
        } else if (passwordValue.length < 8 ) {
            setError(password, 'Password must be at least 8 characters.');
        } else {
            setSuccess(password);
        }

        if(confirmPasswordValue === '') {
            setError(confirmPassword, 'Please confirm your password.');
        } else if (confirmPasswordValue !== passwordValue) {
            setError(confirmPassword, "Passwords don't match.");
        } else {
            setSuccess(confirmPassword);
        }

        if(mobileValue === '') {
            setError(mobile, 'Mobile number is required.');
        } else if (!/^\d{10}$/.test(mobileValue)) {
            setError(mobile, 'Enter a valid 10-digit mobile number.');
        } else {
            setSuccess(mobile);
        }

        if(dobValue === '') {
            setError(dob, 'Date of birth is required.');
        } else {
            setSuccess(dob);
        }

        if(!genderValue) {
            setError(gender[0], 'Please select a gender.');
            setError(gender[1], 'Please select a gender.');
        } else {
            setSuccess(gender[0]);
            setSuccess(gender[1]);
        }

        if(countryValue === '') {
            setError(country, 'Please select a country.');
        } else {
            setSuccess(country);
        }

        let inviteEmails = document.querySelectorAll(".invite-email");
        let invitedEmailsArray = [];

        inviteEmails.forEach(emailField => {
            let emailValue = emailField.value.trim();
            let existingError = emailField.parentNode.querySelector(".error");

            if (existingError) {
                existingError.remove();
            }

            if (emailValue !== '' && !isValidEmail(emailValue)) {
                let errorMsg = document.createElement("small");
                errorMsg.classList.add("error");
                errorMsg.textContent = "Enter a valid invite email address.";
                emailField.parentNode.appendChild(errorMsg);
                emailField.classList.add("error-border");
            } else if (emailValue !== '') {
                invitedEmailsArray.push(emailValue);
            }
        });

        if (document.querySelectorAll('.error-border').length === 0) {
            let formData = {
                fullName: fullNameValue,
                lastName: lastNameValue,
                email: emailValue,
                password: passwordValue,
                mobile: mobileValue,
                dob: dobValue,
                gender: genderValue.value,
                country: countryValue,
                inviteEmails: invitedEmailsArray
            };

            let storedData = JSON.parse(localStorage.getItem("users")) || [];
            storedData.push(formData);
            localStorage.setItem("users", JSON.stringify(storedData));

            // alert("Data stored successfully!");
            form.reset();
            document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
        }
    };

    addEmailBtn.addEventListener("click", function () {
        let div = document.createElement("div");
        div.classList.add("email-field");

        let input = document.createElement("input");
        input.type = "email";
        input.classList.add("invite-email");

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.type = "button";
        removeBtn.classList.add("removeEmail");
        removeBtn.addEventListener("click", function () {
            inviteEmailsDiv.removeChild(div);
        });

        div.appendChild(input);
        div.appendChild(removeBtn);
        inviteEmailsDiv.appendChild(div);

        input.addEventListener("input", function () {
            let errorElement = input.parentNode.querySelector(".error");
            if (errorElement && isValidEmail(input.value.trim())) {
                errorElement.remove();
                input.classList.remove("error-border");
            }
        });
    });

    document.getElementById("fullName").addEventListener("input", function () {
        document.getElementById("fullNameError").textContent = "";
        document.getElementById("fullName").classList.remove("error-border");
    });

    document.getElementById("lastName").addEventListener("input", function () {
        document.getElementById("lastNameError").textContent = "";
        document.getElementById("lastName").classList.remove("error-border");
    });

    document.getElementById("mobile").addEventListener("input", function () {
        document.getElementById("mobileError").textContent = "";
        document.getElementById("mobile").classList.remove("error-border");
    });

    document.getElementById("dob").addEventListener("input", function () {
        document.getElementById("dobError").textContent = "";
        document.getElementById("dob").classList.remove("error-border");
    });

    document.querySelectorAll('input[name="gender"]').forEach(genderInput => {
        genderInput.addEventListener("change", function () {
            document.getElementById("genderError").textContent = "";
            document.querySelectorAll('input[name="gender"]').forEach(genderInput => {
                genderInput.classList.remove("error-border");
            });
        });
    });

    document.getElementById("email").addEventListener("input", function () {
        document.getElementById("emailError").textContent = "";
        document.getElementById("email").classList.remove("error-border");
    });

    document.getElementById("password").addEventListener("input", function () {
        document.getElementById("passwordError").textContent = "";
        document.getElementById("password").classList.remove("error-border");
    });

    document.getElementById("confirmPassword").addEventListener("input", function () {
        document.getElementById("confirmPasswordError").textContent = "";
        document.getElementById("confirmPassword").classList.remove("error-border");
    });

    document.getElementById("country").addEventListener("change", function () {
        document.getElementById("countryError").textContent = "";
        document.getElementById("country").classList.remove("error-border");
    });
});