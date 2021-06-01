// UC-15
let isUpdate = false;
let addressBookObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#fullname');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).fullname = name.value;;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const phone = document.querySelector('#phone');
    const phoneError = document.querySelector('.phone-error');
    phone.addEventListener('input', function () {
        if (phone.value.length == 0) {
            phoneError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phone = phone.value;;
            phoneError.textContent = "";
        } catch (e) {
            phoneError.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    const addressError = document.querySelector('.add-error');
    address.addEventListener('input', function () {
        if (address.value.length == 0) {
            adddressError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;;
            addressError.textContent = "";
        } catch (e) {
            addressError.textContent = e;
        }
    });

    const zip = document.querySelector('#zip');
    const zipError = document.querySelector('.zip-error');
    zip.addEventListener('input', function () {
        if (zip.value.length == 0) {
            zipError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).zip = zip.value;;
            zipError.textContent = "";
        } catch (e) {
            zipError.textContent = e;
        }
    });

    checkForUpdate();
});

// UC-15 Update form
const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editContact');
    isUpdate = addressBookJson ? true : false;
    if(!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#fullname', addressBookObj._fullname);
    setValue('#phone', addressBookObj._phone);
    setValue('#address', addressBookObj._address);
    setValue('#city', addressBookObj._city);
    setValue('#state',addressBookObj._state);
    setValue('#zip', addressBookObj._zip);
}

const getInputValuesById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//UC-9
const resetForm = () => {
    setValue('#fullname','');
    setValue('#phone','');
    setValue('#address','');
    setValue('#city','');
    setValue('#state','');
    setValue('#zip','');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

// // UC-6 // UC-16
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAddressBookObject();
    createAndUpdateStorage();
    resetForm();
    window.location.replace("../pages/home.html");
    return;    
}

function setAddressBookObject() {
    addressBookObj._fullname = getInputValuesById('#fullname');
    addressBookObj._phone = getInputValuesById('#phone');
    addressBookObj._address = getInputValuesById('#address');
    addressBookObj._city = getInputValuesById('#city');
    addressBookObj._state = getInputValuesById('#state');
    addressBookObj._zip = getInputValuesById('#zip');
}

// UC-16
const createAndUpdateStorage = () => {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if(addressBookList){
        let addressBookData = addressBookList.find(personData => personData._id == addressBookObj._id);
        if(!addressBookData){
            addressBookList.push(createAddressBookData());
        }
        else{
            const index = addressBookList.map(personData => personData._id).indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createAddressBookData(addressBookData._id));
        }
    }
    else{
        addressBookList = [createAddressBookData()];
    }
    localStorage.setItem("AddressBookList",JSON.stringify(addressBookList));
}

// UC-16
const createAddressBookData = (id) => {
    let addressBookData = new AddressBookData();
    if(!id)
        addressBookData.id = createNewAddressBookId();
    else 
        addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

// UC-16
const setAddressBookData = (addressBookData) => {
    try{
        addressBookData.fullname = addressBookObj._fullname;
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    try{
        addressBookData.phone = addressBookObj._phone;
    }catch(e){
        setTextValue('.phone-error',e);
        throw e;
    }
    try{
        addressBookData.address = addressBookObj._address;
    }catch(e){
        setTextValue('.add-error',e);
        throw e;
    }
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    try{
        addressBookData.zip = addressBookObj._zip;
    }catch(e){
        setTextValue('.zip-error',e);
        throw e;
    }
    alert(addressBookData.toString());
}

// UC-16
const createNewAddressBookId = () => {
    let personID = localStorage.getItem("AddressBookID");
    personID = !personID ? 1 : (parseInt(personID)+1).toString();
    localStorage.setItem("AddressBookID",personID);
    return personID;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
