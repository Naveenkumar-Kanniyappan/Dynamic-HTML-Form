document.addEventListener("DOMContentLoaded", function () {
    const dataList = document.getElementById("dataList");

    function loadStoredData() {
        const storedData = JSON.parse(localStorage.getItem("users")) || [];
        dataList.innerHTML = '';

        storedData.forEach((data, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.fullName} ${data.lastName}</td>
                <td>${data.email}</td>
                <td>${data.mobile}</td>
                <td>${data.dob}</td>
                <td>${data.gender}</td>
                <td>${data.country}</td>
                <td>${data.inviteEmails.map((email, emailIndex) => `
                    <div>
                        ${email} <button class="delete-invite-btn" onclick="deleteInviteEmail(${index}, ${emailIndex})">Delete</button>
                    </div>
                `).join('')}</td>
                <td><button class="delete-btn" onclick="deleteData(${index})">Delete</button></td>
            `;

            dataList.appendChild(row);
        });
    }

    window.deleteData = function (index) {
        let storedData = JSON.parse(localStorage.getItem("users")) || [];
        storedData.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(storedData));
        loadStoredData();
    }

    window.deleteInviteEmail = function (userIndex, emailIndex) {
        let storedData = JSON.parse(localStorage.getItem("users")) || [];
        storedData[userIndex].inviteEmails.splice(emailIndex, 1);
        localStorage.setItem("users", JSON.stringify(storedData));
        loadStoredData();
    }

    window.clearAllData = function () {
        localStorage.removeItem("users");
        loadStoredData();
    }

    loadStoredData();
});