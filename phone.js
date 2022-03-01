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
        div.classList.add('col');
        div.innerHTML=`
            <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${phone.phone_name}</h4>
                        <h5 class="card-title">${phone.brand}</h5>
                        
                        <a onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary">Details</a>
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
const {name,releaseDate,image,brand,mainFeatures} = phone;



    const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div class="card">
                <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h4 class="card-title">${name}</h4>
                        <h5 class="card-title">${releaseDate}</h5>

                        <h5 class="card-text">${brand} </h5>
                        <p class="card-text">${mainFeatures.displaySize}</p>
                        <p class="card-text">${mainFeatures.storage}</p>
                        <p class="card-text">${mainFeatures.chipSet}</p>
                        <p class="card-text">${mainFeatures.memory}</p>
                        <p class="card-text">${mainFeatures.sensors}</p>
                        
                    </div>
              </div>
        `
        details.appendChild(div)
}