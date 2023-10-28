

function addGuests(){
    let dd = document.querySelector('.guests-dropdown');
    dd.classList.toggle('d-none');
}

document.querySelector('.guests-dropdown').addEventListener('click', (event) => {
    event.stopPropagation();
})

function setGuest(target){
    let ipArray = document.querySelectorAll('input.search-detail,.guest-ip');

    let adults = Number(ipArray[3].value);
    let children = Number(ipArray[4].value);
    let guests = Number(adults + children);
    let infants = Number(ipArray[5].value);
    let pets = Number(ipArray[6].value);

    if(adults + children + infants + pets){
        document.querySelector('.guest-data').innerText = `${guests} guests, ${infants} infants & ${pets} pets.`;
    }
    else{
        document.querySelector('.guest-data').innerText = 'Add guests';
    }

    target.parentNode.classList.toggle('d-none');
}

function transferData(){
    let ipArray = document.querySelectorAll('input.search-detail,.guest-ip');
    let parameters = {
        loc: ipArray[0].value,
        checkin: ipArray[1].value,
        checkout: ipArray[2].value,
        adults: Number(ipArray[3].value),
        children: Number(ipArray[4].value),
        infants: Number(ipArray[5].value),
        pets: Number(ipArray[6].value),
    }

    let link = document.createElement('a');
    link.href = `hotel-list.html?parameters=${JSON.stringify(parameters)}`;
    link.click();
}