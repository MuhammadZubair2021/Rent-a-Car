// Search Bar 
function findCarByName() {
    inputText = document.getElementById('searchVehicleInput').value.toLocaleLowerCase();

    document.querySelectorAll('.carName').forEach(carName => {
        if (carName.textContent.toLocaleLowerCase().includes(inputText)) {
            (carName.parentElement).parentElement.parentElement
                .style.display = 'flex';
        }
        else {
            (carName.parentElement).parentElement.parentElement
                .style.display = 'none';
        }
    })
}

// Filtering 
function applyFilter(carsLength) {
    var seatCapacity, drivingMode, airCondition,

        vehicleRentPerDay = document.querySelectorAll('.rentPerDay'),
        vehicleDrivingMode = document.querySelectorAll('.drivingMode'),
        vehicleAirCondition = document.querySelectorAll('.airCondition');

    document.getElementsByName('rentPerDay')
        .forEach(radio => {
            if (radio.checked) {
                rentPerDay = radio.value;
            }
        })

    document.getElementsByName('drivingMode')
        .forEach(radio => {
            if (radio.checked) {
                drivingMode = radio.value;
            }
        })

    document.getElementsByName('airCondition')
        .forEach(radio => {
            if (radio.checked) {
                airCondition = radio.value;
            }
        })


    // As probability of (A,B,C)= P(A),P(B),P(C),P(A-B),P(A-C),P(B-C),P(A-B-C) So...
    //P(A-B-C)                    
    if (typeof rentPerDay != "undefined" && typeof drivingMode != "undefined" && typeof airCondition != "undefined") {
        if (rentPerDay.trim().toLowerCase() == '2000-4000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 2000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 4000
                    && vehicleAirCondition[i].textContent.trim().toLowerCase() == airCondition.trim().toLowerCase()
                    && vehicleDrivingMode[i].textContent.trim().toLowerCase() == drivingMode.trim().toLowerCase()) {

                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'flex';


                }
                else {
                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'none';
                }
            }
        }
        else if (rentPerDay.trim().toLowerCase() == '4000-7000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 4000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 7000
                    && vehicleAirCondition[i].textContent.trim().toLowerCase() == airCondition.trim().toLowerCase()
                    && vehicleDrivingMode[i].textContent.trim().toLowerCase() == drivingMode.trim().toLowerCase()) {

                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'flex';


                }
                else {
                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'none';

                }
            }
        }
    }
    // P(B-C)
    else if (typeof drivingMode != "undefined" && typeof airCondition != "undefined") {
        for (var i = 0; i < carsLength; i++) {
            if (vehicleDrivingMode[i].textContent.trim().toLowerCase() == drivingMode.trim().toLowerCase()
                && vehicleAirCondition[i].textContent.trim().toLowerCase() == airCondition.trim().toLowerCase()) {

                (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    .style.display = 'flex';

            }
            else {
                (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    .style.display = 'none';

            }
        }
    }
    // P(A-C)      
    else if (typeof rentPerDay != "undefined" && typeof airCondition != "undefined") {
        if (rentPerDay.trim().toLowerCase() == '2000-4000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 2000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 4000
                    && vehicleAirCondition[i].textContent.trim().toLowerCase() == airCondition.trim().toLowerCase()) {

                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'flex';
                }
                else {
                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'none';
                }
            }
        }
        else if (rentPerDay.trim().toLowerCase() == '4000-7000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 4000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 7000
                    && vehicleAirCondition[i].textContent.trim().toLowerCase() == airCondition.trim().toLowerCase()
                ) {

                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'flex';


                }
                else {
                    (vehicleAirCondition[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'none';

                }
            }
        }

    }
    // P(A-B)           
    else if (typeof rentPerDay != "undefined" && typeof drivingMode != "undefined") {
        if (rentPerDay.trim().toLowerCase() == '2000-4000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 2000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 4000
                    && vehicleDrivingMode[i].textContent.trim().toLowerCase() == drivingMode.trim().toLowerCase()) {

                    (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'flex';
                }
                else {
                    (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'none';
                }
            }
        }
        else if (rentPerDay.trim().toLowerCase() == '4000-7000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 4000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 7000
                    && vehicleDrivingMode[i].textContent.trim().toLowerCase() == drivingMode.trim().toLowerCase()) {

                    (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'flex';
                }
                else {
                    (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .style.display = 'none';

                }
            }
        }
    }
    // P(C)
    else if (typeof airCondition != "undefined") {
        for (var i = 0; i < carsLength; i++) {
            if (vehicleAirCondition[i].textContent.trim().toLowerCase() == airCondition.trim().toLowerCase()) {

                (vehicleAirCondition[i].parentElement).parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    .style.display = 'flex';
            }
            else {
                (vehicleAirCondition[i].parentElement).parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    .style.display = 'none';

            }
        }
    }
    // P(B)
    else if (typeof drivingMode != "undefined") {
        for (var i = 0; i < carsLength; i++) {
            if (vehicleDrivingMode[i].textContent.trim().toLowerCase() == drivingMode.trim().toLowerCase()) {

                (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    .style.display = 'flex';
            }
            else {
                (vehicleDrivingMode[i].parentElement).parentElement.parentElement
                    .parentElement.parentElement.parentElement.parentElement.parentElement
                    .style.display = 'none';
            }
        }
    }
    // P(A)
    else if (typeof rentPerDay != "undefined") {
        if (rentPerDay.trim().toLowerCase() == '2000-4000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 2000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 4000) {

                    (vehicleRentPerDay[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .parentElement.style.display = 'flex';
                }
                else {
                    (vehicleRentPerDay[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .parentElement.style.display = 'none';
                }
            }
        }
        else if (rentPerDay.trim().toLowerCase() == '4000-7000') {
            for (var i = 0; i < carsLength; i++) {
                if (vehicleRentPerDay[i].textContent.trim().toLowerCase() >= 4000
                    && vehicleRentPerDay[i].textContent.trim().toLowerCase() <= 7000) {

                    (vehicleRentPerDay[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .parentElement.style.display = 'flex';
                }
                else {
                    (vehicleRentPerDay[i].parentElement).parentElement.parentElement
                        .parentElement.parentElement.parentElement.parentElement.parentElement
                        .parentElement.style.display = 'none';
                }
            }
        }
    }
    else {
        alert(`Not filter Selected`);
    }

    var atLeastOneCarDetailsDiv;
    vehicleDrivingMode.forEach(div => {
        if ((div.parentElement).parentElement.parentElement
            .parentElement.parentElement.parentElement.parentElement.parentElement
            .style.display == 'flex') {
            atLeastOneCarDetailsDiv = true;
        }
    })

    if (atLeastOneCarDetailsDiv) {
        document.getElementById('noMatchDiv').style.display = 'none';
    }
    else {
        document.getElementById('noMatchDiv').style.display = 'block';
    }
}

//Clear all the applied filters
function clearAllFilters() {
    document.getElementsByName('rentPerDay')
        .forEach(radio => {
            if (radio.checked) {
                radio.checked = false
            }
        })

    document.getElementsByName('drivingMode')
        .forEach(radio => {
            if (radio.checked) {
                radio.checked = false
            }
        })

    document.getElementsByName('airCondition')
        .forEach(radio => {
            if (radio.checked) {
                radio.checked = false
            }
        })

    document.querySelectorAll('.rentPerDay').forEach(div => {
        div.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
            .parentElement.parentElement.parentElement.style.display = 'flex';
    })

    document.getElementById('noMatchDiv').style.display = 'none';
}