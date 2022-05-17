const apiKey = 'efb8719189d7e02376abf52343676d6c';
let urlMain = '';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    urlMain = 'https://api.openweathermap.org/data/2.5/weather?zip='+zip+',us&appid='+apiKey+'&units=imperial';

    getWeather(urlMain)

    .then(data => {
        postWeather('/all', {
            temp: data.main.temp,
            date: new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}),
            zip: zip,
            city: data.name,
            feelings: feelings
        });    
    })

    .then(function() {
        createUI('./all');
    });
};


const getWeather = async (urlMain)=> {
    const response = await fetch(urlMain, {method: 'GET',});
    try {
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    };
};


const postWeather = async (url, data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type' : 'application/json',},
        body: JSON.stringify(data),
    });

    try {
        newData = await response.json()
    } catch(error) {
        console.log("error", error);
    };
};


const createUI = async () => {
    const request = await fetch('/all');
    
    try{
        const searchData = await request.json();
        const searchResults = document.getElementById('searchResults');
        
        const date = document.createElement('p');
        date.classList.add('dateUI');
        date.innerHTML = searchData.date;
        //searchResults.append(date);

        const temp = document.createElement('h1');
        temp.classList.add('tempUI');
        temp.innerHTML = Math.round(searchData.temp)+'&#176;'+'<sup>F</sup>';
        //searchResults.append(temp);

        const cityZip = document.createElement('p');
        cityZip.classList.add('cityZipUI');
        cityZip.innerHTML = searchData.city + " - " + searchData.zip;
        //searchResults.append(cityZip);

        const feelings = document.createElement('p');
        feelings.classList.add('feelingsUI');
        feelings.innerHTML = '"'+searchData.feelings+'"<br>-Adventure Weather Guest';
        //searchResults.append(feelings);
        searchResults.replaceChildren(date, temp, cityZip, feelings);      
            
    }catch(error){
        console.log("error", error);
    };
};

/*
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newAnimal =  document.getElementById('animal').value;
    const favorite = document.getElementById('favorite').value;  

    getAnimal('/fakeAnimalData')

    .then(function(data){
        postAnimalData('/addAnimal', {
            animal: data.animal,
            fact: data.fact,
            favorite: favorite
        });
        updateUI();
    });
};


const getAnimal = async (url)=>{
    const res = await fetch(url);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

const postAnimalData = async (url, data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type' : 'application/json',},
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    };
};

const updateUI = async () => {
    const request = await fetch('/all');
    const animalList = document.getElementById('animalList');

    try{
    const allData = await request.json();
    //document.getElementById('animalName').innerHTML = allData[0].animal;
    //document.getElementById('animalFact').innerHTML = allData[0].fact;
    //document.getElementById('animalFavorite').innerHTML = allData[0].favorite;
    
   for (const animal of allData) {
        const newAnimalBio = document.createElement('div');
        const newAnimal = document.createElement('p');
        newAnimal.innerHTML = animal.animal;
        const newFact = document.createElement('p');
        newFact.innerHTML = animal.fact;
        const newFavorite = document.createElement('p');
        newFavorite.innerHTML = animal.favorite;

        newAnimalBio.appendChild(newAnimal);
        newAnimalBio.appendChild(newFact);
        newAnimalBio.appendChild(newFavorite);
        console.log(newAnimalBio);
        animalList.appendChild(newAnimalBio);
        
    }
    

    }catch(error){
        console.log("error", error);
    };
};
*/