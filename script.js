document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("registrationForm");
    let addEmailBtn = document.getElementById("addEmail");
    let inviteEmailsDiv = document.getElementById("inviteEmails");

    addEmailBtn.addEventListener("click", function () {
        let div = document.createElement("div");
        div.classList.add("email-field");

        let input = document.createElement("input");
        input.type = "email";
        input.classList.add("invite-email");

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.type = "button";
        removeBtn.addEventListener("click", function () {
            inviteEmailsDiv.removeChild(div);
        });

        div.appendChild(input);
        div.appendChild(removeBtn);
        inviteEmailsDiv.appendChild(div);

        input.addEventListener("input", function () {
            let errorElement = input.parentNode.querySelector(".error");
            if (errorElement && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(input.value.trim())) {
                errorElement.remove();
            }
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        document.querySelectorAll(".error").forEach(el => el.remove());

        let errors = false;

        let fullName = document.getElementById("fullName").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();
        let mobile = document.getElementById("mobile").value.trim();
        let dob = document.getElementById("dob").value;
        let gender = document.querySelector('input[name="gender"]:checked');
        let country = document.getElementById("country").value;
        let inviteEmails = document.querySelectorAll(".invite-email");

        if (fullName === "") {
            document.getElementById("fullNameError").textContent = "Full name is required.";
            errors = true;
        }

        if (!/^\d{10}$/.test(mobile)) {
            document.getElementById("mobileError").textContent = "Enter a valid 10-digit mobile number.";
            errors = true;
        }

        if (!dob) {
            document.getElementById("dobError").textContent = "Date of birth is required.";
            errors = true;
        }

        if (!gender) {
            document.getElementById("genderError").textContent = "Please select a gender.";
            errors = true;
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            document.getElementById("emailError").textContent = "Enter a valid email address.";
            errors = true;
        }

        if (password.length < 6) {
            document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
            errors = true;
        }

        if (country === "") {
            document.getElementById("countryError").textContent = "Please select a country.";
            errors = true;
        }

        let invitedEmailsArray = [];

        inviteEmails.forEach(emailField => {
            let emailValue = emailField.value.trim();
            let existingError = emailField.parentNode.querySelector(".error");

            if (existingError) {
                existingError.remove();
            }

            if (emailValue && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailValue)) {
                invitedEmailsArray.push(emailValue);
            } else {
                let errorMsg = document.createElement("small");
                errorMsg.classList.add("error");
                errorMsg.textContent = "Enter a valid invite email address.";
                emailField.parentNode.appendChild(errorMsg);
                errors = true;
            }
            
            emailField.addEventListener("input", function () {
                let errorElement = emailField.parentNode.querySelector(".error");
                if (errorElement && /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(emailField.value.trim())) {
                    errorElement.remove();
                }
            });
        });

        if (errors) {
            return;
        }

        let formData = {
            fullName,
            email,
            password,
            mobile,
            dob,
            gender: gender.value,
            country,
            inviteEmails: invitedEmailsArray
        };

        let storedData = JSON.parse(localStorage.getItem("users")) || [];
        storedData.push(formData);
        localStorage.setItem("users", JSON.stringify(storedData));

        window.location.href = "list.html";
    });
});