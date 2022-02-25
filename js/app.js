// Hide the Parrameters box initially
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

let requestJsonBox = document.getElementById('requestJsonBox');
requestJsonBox.style.display = 'flex';

// Utility functions
// 1. Utility function to get DOM element form string
function getElementFromElementString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// If the users click the params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = 'block';
    requestJsonBox.style.display = 'none';

});

// If the users click the json box, hide the pranams box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    requestJsonBox.style.display = 'flex';
    parametersBox.style.display = 'none';
});

// Adding more parametersBox
let parameterHeadingIndex = 2;
function addParametersBox() {
    let paramNextIndex = parametersBox.children.length + 1;
    console.log('hello');
    let string = `<div class="row g-3 my-1" id="parameter${paramNextIndex}">
                    <label class="col-sm-2 col-form-label" for="parameter"><strong>Parameter ${parameterHeadingIndex++}</strong></label>
                    <div class="col-md-3" style="flex: 1 0 auto;">
                        <input type="text" id="parameterKey${paramNextIndex}" class="form-control parameterKey" placeholder="Parameter key">
                    </div>
                    <div class="col-md-3" style="flex: 1 0 auto;">
                        <input type="text" id="parameterValue${paramNextIndex}" class="form-control parameterValue" placeholder="Parameter value">
                    </div>
                    <div class="col-md-1 d-flex">
                        <button class="btn btn-primary m-auto" style="flex-grow: 1; max-width: 21%; min-width: 41px;" onclick="removeParametersBox('parameter${paramNextIndex}')">-</button>
                    </div>
                </div>`;
    // Converting String to DOM element
    parametersBox.appendChild(getElementFromElementString(string));
}

// function for remove addition parametersBox
function removeParametersBox(id) {
    parametersBox.querySelector(`#${id}`).remove();
}

// If the user chilcks on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show plz wait in the response box to request patience from the user
    document.getElementById('responseJsonText').value = 'Please wait.. fetching response...';

    // fetch all value user has been entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used params option instead of json, collect all the parameters in object
    if (contentType == 'Params') {
        data = {}
        for (let i = 0; i < parametersBox.children.length; i++) {
            let key = parametersBox.children[i].querySelector('.parameterKey').value;
            let value = parametersBox.children[i].querySelector('.parameterValue').value;
            data[key] = value;
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // If the request type is get, invoke fetch api to create a get request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }

    // If the request type is post, invoke fetch api to create a post request
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }

});