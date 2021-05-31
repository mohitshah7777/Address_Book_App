const update = (node) => {
    let addressBookData = addressBookList.find(personData => personData._id == node.id)
    if(!addressBookData) return;
    localStorage.setItem('editEmp', JSON.stringify(addressBookData));
    window.location.replace(site_properties.add_person_page);

}