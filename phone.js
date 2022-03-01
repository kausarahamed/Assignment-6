const searchPhone = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    searchField.value = '';
    // console.log(searchText);

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data.slice(0,20)));
    
} 


const displaySearchResult = phones=>{

    // console.log(phones);

    const searchResult = document.getElementById('search-result');
    phones.forEach(phone => {
    //    console.log(phone);
       
       const div = document.createElement('div');
        // div.classList.add('col');
        div.innerHTML=`
            <div class="bg-red-200 p-10">
                <img src="${phone.image}" class="mx-auto w-5/6 mb-4 rounded-2xl" alt="...">
                    <div class="card-body">
                        <h4 class="">${phone.phone_name}</h4>
                        <h5 class="mb-5">${phone.brand}</h5>
                        
                        <a onclick="loadPhoneDetail('${phone.slug}')" href="#" class="border-2 p-2 text-xl  rounded-xl">Details</a>
                    </div>
              </div>
        `
        searchResult.appendChild(div);
    });
    
}


const loadPhoneDetail = phoneId =>{
    console.log(phoneId);
    const url =` https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));


}

const details =document.getElementById('details-Up');

const displayDetails = (phone) =>{
    console.log(phone);
const {name,releaseDate,image,brand,mainFeatures,others} = phone;



    const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div class="card">
                <img src="${image}" class="w-3/4" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${name}</h4>
                        <h5 class="card-title">${releaseDate}</h5>

                        <h5 class="text-xl">${brand} </h5>
                        <p class="text-xl">${mainFeatures.displaySize}</p>
                        <p class="text-xl">${mainFeatures.storage}</p>
                        <p class="text-xl">${mainFeatures.chipSet}</p>
                        <p class="text-xl">${mainFeatures.memory}</p>
                        <p class="text-xl">${mainFeatures.sensors}</p>
                        <p class="text-xl">${others.Bluetooth}</p>
                        <p class="text-xl">${others.GPS}</p>
                        <p class="text-xl">${others.USB}</p>
                        <p class="text-xl">${others.Radio}</p>
                        
                    </div>
              </div>
        `
        details.appendChild(div)
}