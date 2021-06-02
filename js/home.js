// UC-12 
let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    // UC-18
    if (site_properties.use_local_storage.match("true")){
        getAddressBookDataFromStorage();
    }
    else{
        getAddressBookDataFromServer();
    }
});

const processAddressBookDataResponse = () => {
    document.querySelector(".person-count").textContent = addressBookList.length;
    createInnerHTML();
    localStorage.removeItem('editContact');
}

//UC-18
const getAddressBookDataFromStorage = () => {
    addressBookList = localStorage.getItem('AddressBookList') ? JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressBookDataResponse();
}

const getAddressBookDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true).then(responseText => {
        addressBookList = JSON.parse(responseText);
        processAddressBookDataResponse();
    })
    .catch(error => {
        console.log("GET Error Status: "+JSON.stringify(error));
        addressBookList = [];
        processAddressBookDataResponse();
    });
}

function makeServiceCall(methodType, url, async = true, data = null){
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            console.log("State Changed Called. Ready Sate: " + xhr.readyState+" Status:"+xhr.status);
            if(xhr.status.toString().match('^[2][0-9]{2}$')){
                resolve(xhr.responseText);
            } else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.onerror = function(){
            reject({
                status : this.status,
                statusText : xhr.statusText
            });
        }
        xhr.open(methodType, url, async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
        console.log(methodType+" request sent to the server");
    });
}

const createInnerHTML = () => {
    const headerHtml = "<th></th><th>Full Name</th><th>Address</th><th>City</th><th>State</th><th>Zip-Code</th><th>Phone Number</th><th>Actions</th>";
    // UC-13
    if(addressBookList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const addressBookData of addressBookList) {
        innerHtml = `${innerHtml}
        <tr>
            <td></td>
            <td>${addressBookData._fullname}</td>
            <td>${addressBookData._address}</td>
            <td>${addressBookData._city}</td>
            <td>${addressBookData._state}</td>
            <td>${addressBookData._zip}</td>
            <td>${addressBookData._phone}</td>
            <td>
            <img id="${addressBookData.id}" onclick="remove(this)" src="../assets/delete-black-18dp.svg" alt="delete">
            <img id="${addressBookData.id}" onclick="update(this)" src="../assets/create-black-18dp.svg" alt="edit">
            </td>
        </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

//UC-14 remove details
const remove = (node) => {
    let addressBook = addressBookList.find(personData => personData.id == node.id);
    if(!addressBook) return;
    const index = addressBookList
                    .map(personData => personData.id)
                    .indexOf(addressBook.id);
    addressBookList.splice(index,1);
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
    document.querySelector(".person-count").textContent = addressBookList.length;
    createInnerHTML();
}

const update = (node) => {
    let addressBook = addressBookList.find(personData => personData.id == node.id)
    if(!addressBook) return;
    localStorage.setItem('editContact', JSON.stringify(addressBook));
    window.location.replace(site_properties.add_person_page);
}
