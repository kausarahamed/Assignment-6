const searchField = document.getElementById('search-field');
const searchResult = document.getElementById('search-result');
const details =document.getElementById('details-Up');
const errorMessage = document.getElementById('error-show');
errorMessage.style.display='none'

const searchPhone = () => {

    

    const searchText = searchField.value;

    searchField.value = '';
    if(searchText==''){
        errorMessage.style.display='block'
        searchResult.textContent = ''
        details.textContent = '' 
        }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data.slice(0,20)))
        searchResult.textContent = ''
        details.textContent = ''
    }


} 




const displaySearchResult = phones=>{
console.log(phones);

if(phones.length <= 0){
    errorMessage.style.display='block'
}
else{




    searchResult.textContent='';
    errorMessage.style.display='none'
    phones.forEach(phone => {
    
       
       const div = document.createElement('div');
        
        div.innerHTML=`
            <div class="bg-slate-800 p-10">
                <img src="${phone.image}" class="mx-auto w-5/6 mb-4 rounded-2xl" alt="...">
                    <div>
                        <h3 class="text-2xl font-semibold">${phone.phone_name}</h3>
                        <h4 class="mb-5 text-xl font-semibold">${phone.brand}</h4>
                        
                        <a onclick="loadPhoneDetail('${phone.slug}')" href="#" class="border-2 p-2 text-xl  rounded-xl">Details</a>
                    </div>
              </div>
        `
        searchResult.appendChild(div);
    });
}  
}


const loadPhoneDetail = phoneId =>{
    
    const url =` https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}



const displayDetails = (phone) =>{
    
    details.textContent='';
const {name,image,brand,mainFeatures,others} = phone;

    const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
            <div class='border-2 text-center mb-20 p-5 bg-gray-300 rounded-2xl'>
                <img src="${image}" class="w-1/2 mx-auto rounded-2xl text-center" alt="...">
                    <div class="text-left">
                        <p class="text-3xl font-bold">Model: ${name}</p>
                        <p class="text-2xl font-semibold">Brand: ${brand} </p>
                         <p class="text-xl"><span class="text-left font-semibold">Release Date:</span> ${phone?.releaseDate || 'Release date not found'}</p>
                        <p class="text-xl"><span class="font-semibold">Display size:</span> ${mainFeatures.displaySize}</p>
                        <p class="text-xl"><span class="font-semibold">Storege:</span> ${mainFeatures.storage}</p>
                        <p class="text-xl"><span class="font-semibold">ChipSet:</span> ${mainFeatures.chipSet}</p>
                        <p class="text-xl"><span class="font-semibold">Memory:</span> ${mainFeatures.memory}</p>
                        <p class="text-xl"><span class="font-semibold">Sensors:</span> ${mainFeatures.sensors}</p>
                        <p class="text-xl"><span class="font-semibold">Bluetooth:</span> ${others?.Bluetooth||'Not found'}</p>
                        <p class="text-xl"><span class="font-semibold">GPS:</span> ${others?.GPS||'Not found'}</p>
                        <p class="text-xl"><span class="font-semibold">USB:</span> ${others?.USB||'Not found'}</p>
                        <p class="text-xl"><span class="font-semibold">Radio:</span> ${others?.Radio||'Not found'}</p>
                        
                    </div>
              </div>
        `
        details.appendChild(div)
}