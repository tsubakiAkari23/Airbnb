let urlParams = new URLSearchParams(window.location.search);

let checkin = urlParams.get('checkin');
let checkout = urlParams.get('checkout');
let guests = urlParams.get('guests');

let noOfDate = new Date(checkout) - new Date(checkin);
noOfDate = Math.ceil(noOfDate/(3600*24*1000));

let data = JSON.parse(localStorage.getItem('data'));
console.log(data);


document.querySelector('.hotel-name').innerText = data.name;
document.querySelector('.rating-review>span').innerText = data.rating;
document.querySelector('.rating-review>u').innerText = data.reviewsCount+" reviews";
document.querySelector('.rating-review>p>u').innerText = data.address;



document.querySelector('.details-head').innerText = data.type;
document.querySelector('.details-features').innerText = `${data.persons} guests · ${data.bedrooms} bedroom · ${data.beds} bed · ${data.bathrooms} bath`;



document.querySelector('.right-header>p>span').innerText = '$'+data.price.rate;
document.querySelector('.right-header>:last-child').innerHTML = `
    <img src="./Icons/red-star.png" alt="">
    ${data.rating} · <u>${data.reviewsCount} reviews</u>
`;


document.querySelector('.booking-details').innerHTML = `
    <div class="chk-in">
        <p>CHECK-IN</p>
        <p>${checkin}</p>
    </div>
    <div class="chk-out">
        <p>CHECKOUT</p>
        <p>${checkout}</p>
    </div>
    <div class="guest-count">
        <span>
            <p>GUESTS</p>
            <p>${data.persons} guests</p>
        </span>
        <img src="./Icons/dropdown.png" alt="">
    </div>
`;


let total = data.price.rate*noOfDate;
document.querySelector('.price-details').innerHTML = `
    <div class="nights">
        <p>$${data.price.rate} x ${noOfDate} nights</p>
        <p>$${total}</p>
    </div>
    <div class="discount">
        <p>Weekly discount</p>
        <p>-$${Math.ceil(total*.05)}</p>
    </div>
    <div class="cleaning-fee">
        <p>Cleaning fee</p>
        <p>$${Math.ceil(total*.1)}</p>
    </div>
    <div class="service-fee">
        <p>Service fee</p>
        <p>$${Math.ceil(total*.1)}</p>
    </div>
    <div class="tax">
        <p>Occupancy taxes and fees</p>
        <p>$${Math.ceil(total*.06)}</p>
    </div>
`;

document.querySelector('.total>:last-child').innerText = '$' + (Math.ceil(total*1.21));

document.querySelector('.review-head').innerHTML = `
    <img src="./Icons/filled-star.png" alt="">
    ${data.rating} · ${data.reviewsCount} reviews
`;

document.querySelectorAll('.rate-num').forEach(e => {
    e.innerText = data.rating;
})
document.querySelectorAll('.rate-value').forEach(e => {
    e.style.width = `${100*(data.rating/5)}%`;
})

document.querySelector('.all-review').innerText = `Show all ${data.reviewsCount} reviews`;


document.querySelector('.hotel-map>iframe').src = `https://maps.google.com/maps?q=${data.lat}, ${data.lng}&z=15&output=embed`;


document.querySelector('.where-to-sleep>img').src = data.images[0];
document.querySelector('.historical-head').innerText = data.address;



document.querySelectorAll('.grid-1 img').forEach((e, i) => {
    e.src = data.images[i];
})