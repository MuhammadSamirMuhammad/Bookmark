let siteNameInput = document.getElementById("bn");
let siteUrl = document.getElementById("su");
let btn = document.querySelector("button");
let closeLeyer = document.querySelector(".fa-xmark");

let allSite = [];


if (localStorage.getItem("allSite") != null) {
    allSite = JSON.parse(localStorage.getItem("allSite"));
    displayAllSite()

};

// Function Add New Site
function addNewSite() {


    let errMsg = valedetForm();
    if (errMsg == true) {
        if (btn.innerHTML == "Update") {
            updataSite()
        } else {
            let site = {
                name: siteNameInput.value,
                url: siteUrl.value
            }


            allSite.push(site)
            console.log(allSite);

            localStorage.setItem("allSite", JSON.stringify(allSite))




            clearForm()
            displayAllSite()
        }
    } else {
        errMsg
    }

};

btn.addEventListener("click", function () {

    addNewSite()
});

// Function clearForm
function clearForm() {
    siteNameInput.value = "";
    siteUrl.value = "";
};

// Function Display All Site
function displayAllSite() {
    let cartona = "";
    for (let i = 0; i < allSite.length; i++) {
        cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${allSite[i].name}</td>
        <td><button class="btn btnNoIcon btn-success "><i class="fa-regular fa-eye  me-2"></i> <a href="${allSite[i].url}" class="text-decoration-none text-white">Visit</a></button></td>
        <td><button class="btn btnNoIcon btn-warning "  onclick="reteiveDataInForm(${i})" onclick='updataSite()' ><i class="fa-regular fa-pen-to-square me-2"></i> Update</button></td>
        <td><button class="btn btnNoIcon btn-danger " onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can me-2 " ></i> Delete</button></td>
    </tr>
        `
    }

    document.getElementById("contentBody").innerHTML = cartona;




};

// Delete Site
function deleteSite(idx) {

    allSite.splice(idx, 1);

    localStorage.setItem("allSite", JSON.stringify(allSite));
    displayAllSite();
};
let updateSiteIndex = 0;
// Function reteiveDataInForm
function reteiveDataInForm(index) {
    updateSiteIndex = index




    siteNameInput.value = allSite[index].name;
    siteUrl.value = allSite[index].url;
    console.log(index);

    btn.innerHTML = "Update"
    btn.style.backgroundColor = "#ffca2c "
    btn.style.color = "black "
};
// Function Update site
function updataSite() {
    console.log(updateSiteIndex);
    allSite[updateSiteIndex].name = siteNameInput.value;
    allSite[updateSiteIndex].url = siteUrl.value;

    localStorage.setItem("allSite", JSON.stringify(allSite))
    clearForm()
    displayAllSite()

    btn.innerHTML = "Submit";
    btn.style.backgroundColor = "#d1512d";
    btn.style.color = "white";
};



// Function valedet Form
function valedetForm() {
    let nameRegex = /^[A-Za-z_]{1,}$/
    let urlRegex = /^(https:\/\/)(www\.)?[A-Za-z0-9_]{1,}\.[a-z]{3}$/
    if (nameRegex.test(siteNameInput.value) == false) {
        return document.querySelector(".layel").classList.remove("d-none")
    }
    if (urlRegex.test(siteUrl.value) == false) {
        return document.querySelector(".layel").classList.remove("d-none")
    }

    return true;

};


function deleteLayer() {
    document.querySelector(".layel").classList.add("d-none");
};
closeLeyer.addEventListener("click", deleteLayer);

