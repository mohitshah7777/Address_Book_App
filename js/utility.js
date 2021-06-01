const checkName = (fullname) => {
    let nameRegex = RegExp('^[A-Z_]{1}[a-zA-Z_ ]{3,}$');
    if(!nameRegex.test(fullname)) {
        throw 'Invalid Name';  
    }
}

const checkPhone = (phone) => {
    let phoneRegex1 = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[0-9]{3}[-\s\.]?[0-9]{6,13}$/im);
    // let phoneRegex2 = RegExp(/^[0-9]{3}[0-9]{7,11}$/im);
    if(!phoneRegex1.test(phone)){ 
        throw 'Invalid Phone Number';
    }
    // else if(!phoneRegex2.test(phone)){
    //     throw 'Invalid Phone Number';
    // } 
}

const checkAddress = (address) => {
    let addressRegex = RegExp('^[a-zA-Z0-9_][a-zA-Z0-9_ ]{4,}$');
    if(!addressRegex.test(address)){
        throw 'Invalid Address';
    }
}

const checkZip = (zip) => {
    let zipRegex = RegExp('^[1-9]{1}[0-9]{2}[\\s]?[0-9]{3}$');
    if(!zipRegex.test(zip)){
        throw 'Invalid Zip-Code';
    }    
}