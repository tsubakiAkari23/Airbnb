const urlParams = new URLSearchParams(window.location.search);
let parameters = JSON.parse(urlParams.get('parameters'));


let checkin = new Date(parameters.checkin);
let checkout = new Date(parameters.checkout);
function monthName(date) {
    const months = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sept", "Oct", "Nov", "Dec"
    ];
    return months[date.getMonth()];
}
let search_value = document.querySelectorAll('.search-bar>b');
search_value[0].innerText = parameters.loc;
search_value[1].innerText = `${monthName(checkin)} ${checkin.getDate()} - ${ monthName(checkin)!==monthName(checkout)? monthName(checkout)+' ' : ''}${checkout.getDate()}`;
search_value[2].innerText = `${Number(parameters.adults) + Number(parameters.children)} guests`;



function initMap(data) {
    const mapOptions = {
        center: { lat: data[0].lat, lng: data[0].lng }, 
        zoom: 11,
    };

    const map = new google.maps.Map(document.getElementById("map"), mapOptions);

    const locations = data.map((e) => {
        return {
            location: {lat: e.lat, lng: e.lng},
            title: `${e.name}, $${e.price.rate}/night`
        }
    })
    // console.log(locations);

    for (let e of locations) {
        const marker = new google.maps.Marker({
            position: e.location,
            map: map,
            title: e.title
        });
    }
};

function initializeMap(data) {
    if (typeof google === 'object' && typeof google.maps === 'object') {
        initMap(data);
    } else {
        setTimeout(() => {
            initializeMap(data)
        }, 100);
    }
}

function randerHotels(data){
    let dataSummery = document.querySelector('.list-1>p');
    dataSummery.innerText = `${data.length}+ stays in ${parameters.loc}`;

    // selecting the card container
    let container = document.querySelector('.hotel-list');

    let div1 = document.createElement('div');
    div1.className = 'card-division';
    container.innerHTML = '';
    container.append(div1);

    data.forEach((e) => {
        // creation of the card with proper class name to add css with it
        let card = document.createElement('div');
        card.className = 'hotel-card';

        // go to hotel details page by clicking on card
        card.addEventListener('click', () => {
            localStorage.setItem('data', JSON.stringify(e));
            let link = document.createElement('a');
            link.href = `hotel-details.html?checkin=${parameters.checkin}&checkout=${parameters.checkout}&guests=${Number(parameters.adults) + Number(parameters.children)}`
            link.click();
        })


        // inner content of card
        card.innerHTML = `
            <div class="hotel-img">
                <img src="${e.images[0]}" alt="">
            </div>
            <div class="hotel-data">
                <div class="hotel-data-1">
                    <div class="written">
                        <p>${e.name}</p>
                        <p>${e.name}</p>
                    </div>
                    <div class="like">
                        <div class="direction-btn">
                            <span class="material-symbols-outlined direction">fork_right</span>
                            <span class="btn-description">Open Direction</span>
                        </div>
                        <img src="./Icons/black-heart.png" alt="">
                    </div>
                </div>
                <div class="hz-line"></div>
                <div class="hotel-data-2">
                    <p>${e.persons} guests · ${e.type} · ${e.beds} beds · ${e.bathrooms} bath</p>
                    <p>${e.previewAmenities.join(' · ')}</p>
                </div>
                <div class="hz-line"></div>
                <div class="hotel-data-3">
                    <div class="rating">
                        <p>${e.rating?e.rating:'No rating'}</p>
                        <img src="./Icons/star.png" alt="">
                        <p>(${e.reviewsCount} reviews)</p>
                    </div>
                    <div class="price">
                        <p>$${e.price.rate}</p>
                        <p>/night</p>
                        <span class="btn-description">Cost Breakdown</span>
                    </div>
                </div>
            </div>
        `;

        // open direction
        card.querySelector('.direction').addEventListener('click', (event) => {
            event.stopPropagation();

            navigator.geolocation.getCurrentPosition((p) => {
                const sourceLat = p.coords.latitude;
                const sourceLng = p.coords.longitude;
                const destinationName = e.name;
                const destinationLat = e.lat;
                const destinationLng = e.lng;

                // Construct the URL
                const mapsURL = `https://www.google.com/maps/dir/${sourceLat},${sourceLng}/${destinationName}/@${destinationLat},${destinationLng},8z`;
    
                // Open the URL in a new tab or use it as needed
                window.open(mapsURL);
            });


        })

        // booking cost break down modal
        let breakDown = card.querySelector('.price');
        breakDown.addEventListener('click', (event) => {
            event.stopPropagation();
            
            let priceModal = document.querySelector('.price-modal');
            priceModal.classList.toggle('d-none');

            let noOfDate = new Date(checkout) - new Date(checkin);
            noOfDate = Math.ceil(noOfDate/(3600*24*1000));
            let total = e.price.rate*noOfDate;
            priceModal.innerHTML = `
                <div class="reserve-card">
                    <div class="right-header">
                        <p><span>$${e.price.rate}</span> / night</p>
                        <p>
                            <img src="./Icons/red-star.png" alt="">
                            ${e.rating} · <u>${e.reviewsCount} reviews</u>
                        </p>
                    </div>
                    <div class="booking-details">
                        <div class="chk-in">
                            <p>CHECK-IN</p>
                            <p>${parameters.checkin}</p>
                        </div>
                        <div class="chk-out">
                            <p>CHECKOUT</p>
                            <p>${parameters.checkout}</p>
                        </div>
                        <div class="guest-count">
                            <span>
                                <p>GUESTS</p>
                                <p>${e.persons} guests</p>
                            </span>
                            <img src="./Icons/dropdown.png" alt="">
                        </div>
                    </div>
                    <button class="reserve">Reserve</button>
                    <div class="not-charge">You won't be charged yet</div>
                    <div class="price-details">
                        <div class="nights">
                            <p>$${e.price.rate} x ${noOfDate} nights</p>
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
                    </div>
                    <div class="total">
                        <p>Total</p>
                        <p>$${Math.ceil(total*1.21)}</p>
                    </div>
                    <button class="close reserve">Close</button>
                </div>
            `;
            priceModal.querySelector('.close').addEventListener('click', () => {
                priceModal.classList.toggle('d-none');
            })
        })

        // divition after each hotel card
        let division = document.createElement('div');
        division.className = 'card-division';

        // Adding card and division to the container
        container.append(card, division);
    });

    // initialize map and making marker for each hotel locations
    initializeMap(data);
}

function getData(parameters){
    const url = `https://airbnb13.p.rapidapi.com/search-location?location=${parameters.loc}&checkin=${parameters.checkin}&checkout=${parameters.checkout}&adults=${parameters.adults}&children=${parameters.children}&infants=${parameters.infants}&pets=${parameters.pets}&page=1&currency=USD`;
    const options = {
    	method: 'GET',
    	headers: {
    		'X-RapidAPI-Key': 'deb0f4ef2bmsh7ede7cebe684e6cp140f77jsn17d34f4fab17',
    		'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
    	}
    };


    fetch(url, options).then(responce => responce.json()).then(data => {
        let result = data.results;
        console.log(result);
        randerHotels(result);

        document.querySelector('.main').classList.toggle('d-none');
        document.querySelector('.loader').classList.toggle('d-none');


        let nonFilterObj = {};
        let isSelected = {};
        let buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(e => {
            isSelected[e.getAttribute("filter-id")] = false;

            e.addEventListener('click', (event) => {
                e.classList.toggle('selected');

                if(isSelected[e.getAttribute("filter-id")]){
                    isSelected[e.getAttribute("filter-id")] = !isSelected[e.getAttribute("filter-id")];


                    for(let isActive in isSelected){
                        if(isSelected[isActive]){
                            let filterData = [];
                            let nonFilterData = [];

                            for(let j of nonFilterObj[e.getAttribute('filter-id')]){
                                if(compareData(j, Number(isActive))) filterData.push(j);
                                else nonFilterData.push(j);
                            }
                            nonFilterObj[isActive].push(...nonFilterData);
                            nonFilterObj[e.getAttribute("filter-id")] = [...filterData];
                        }
                    }
                    result.push(...nonFilterObj[e.getAttribute("filter-id")]);
                    delete nonFilterObj[e.getAttribute("filter-id")];
                }
                else{
                    isSelected[e.getAttribute("filter-id")] = !isSelected[e.getAttribute("filter-id")];

                    let filterData = [];
                    let nonFilterData = [];

                    for(let i of result){
                        if(compareData(i, Number(e.getAttribute("filter-id")))) filterData.push(i);
                        else nonFilterData.push(i);
                    }
                    nonFilterObj[e.getAttribute("filter-id")] = [...nonFilterData];
                    result = [...filterData];
                }
                randerHotels(result.sort((a, b) => a.id-b.id));
            })
        })
    }).catch(error => {
        console.log(error);
    })
}

function hitApi(parameters){
    const url = 'data.json';

    fetch(url).then(responce => responce.json()).then(data => {
        let result = data.results;
        randerHotels(result);
        
        document.querySelector('.main').classList.toggle('d-none');
        document.querySelector('.loader').classList.toggle('d-none');


        let nonFilterObj = {};
        let isSelected = {};
        let buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(e => {
            isSelected[e.getAttribute("filter-id")] = false;

            e.addEventListener('click', (event) => {
                e.classList.toggle('selected');

                if(isSelected[e.getAttribute("filter-id")]){
                    isSelected[e.getAttribute("filter-id")] = !isSelected[e.getAttribute("filter-id")];


                    for(let isActive in isSelected){
                        if(isSelected[isActive]){
                            let filterData = [];
                            let nonFilterData = [];

                            for(let j of nonFilterObj[e.getAttribute('filter-id')]){
                                if(compareData(j, Number(isActive))) filterData.push(j);
                                else nonFilterData.push(j);
                            }
                            nonFilterObj[isActive].push(...nonFilterData);
                            nonFilterObj[e.getAttribute("filter-id")] = [...filterData];
                        }
                    }
                    result.push(...nonFilterObj[e.getAttribute("filter-id")]);
                    delete nonFilterObj[e.getAttribute("filter-id")];
                }
                else{
                    isSelected[e.getAttribute("filter-id")] = !isSelected[e.getAttribute("filter-id")];

                    let filterData = [];
                    let nonFilterData = [];

                    for(let i of result){
                        if(compareData(i, Number(e.getAttribute("filter-id")))) filterData.push(i);
                        else nonFilterData.push(i);
                    }
                    nonFilterObj[e.getAttribute("filter-id")] = [...nonFilterData];
                    result = [...filterData];
                }
                randerHotels(result.sort((a, b) => a.id-b.id));
            })
        })

        // document.querySelector('.selectPrice').addEventListener('input', () => {
        //     for(let isActive in isSelected){
        //         if(isSelected[isActive] && isActive!=='10'){
        //             let filterData = [];
        //             let nonFilterData = [];

        //             for(let j of nonFilterObj[e.getAttribute('filter-id')]){
        //                 if(compareData(j, Number(isActive))) filterData.push(j);
        //                 else nonFilterData.push(j);
        //             }
        //             nonFilterObj[isActive].push(...nonFilterData);
        //             nonFilterObj[e.getAttribute("filter-id")] = [...filterData];
        //         }
        //     }
        //     result.push(...nonFilterObj[e.getAttribute("filter-id")]);
        // })
    }).catch(error => {
        console.log(error);
    })
}

// hitApi(parameters);

getData(parameters);



function compareData(e, btn, value){
    switch(btn){
        case 1:
            return e.cancelPolicy.localeCompare("CANCEL_FLEXIBLE") == 0;
        case 2:
            return e.previewAmenities.includes("Wifi");
        case 3:
            return e.previewAmenities.includes("Kitchen");
        case 4:
            return e.previewAmenities.includes("Air conditioner");
        case 5:
            return e.previewAmenities.includes("Washer");
        case 6:
            return e.previewAmenities.includes("Iron");
        case 7:
            return e.previewAmenities.includes("Dedicated workspace");
        case 8:
            return e.previewAmenities.includes("Free parking");
        case 9:
            return e.previewAmenities.includes("Dryer");
        case 10:
            if(value === '0'){
                return true;
            }
            else if(value === '301'){
                return e.price.rate>300;
            }
            else{
                return e.price.rate<=Number(value);
            }
    }
}