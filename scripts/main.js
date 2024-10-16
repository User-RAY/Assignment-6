let categoryPetPrice = [];
//1
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories)) 
    .catch(err => console.log(err));

};
//2
const loadCards = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => {

        //FOR SORT
        categoryPetPrice = data.pets;

        displayPets(data.pets)
    }) 
    .catch(err => console.log(err));

};
//3
const loadCategory = (id) => {

    // loadings
    const spin = document.getElementById('spin');

    const card = document.getElementById('cards');
    const like = document.getElementById('liked');
    
    card.classList.add('hidden');
    like.classList.add('hidden');
    spin.classList.remove('hidden');
    
    setTimeout(()=>{
        spin.classList.add('hidden');
        card.classList.remove('hidden');
        like.classList.remove('hidden');
    }, 2000 );



    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => {


        //default button
        const pets = document.getElementsByClassName("btn-category");
        for (let element of pets) {
            element.classList.remove('bg-[#0E7A81]/[.1]', 'border-[#0E7A81]', 'rounded-full');
            element.classList.add('rounded-2xl', 'bg-white', 'border-[#0E7A81]/[.15]');
        }
        
        //active button
        const pet = document.getElementById(`btn-${id}`);
        pet.classList.add('bg-[#0E7A81]/[.1]', 'border-[#0E7A81]', 'rounded-full');
        pet.classList.remove('rounded-2xl', 'bg-white', 'border-[#0E7A81]/[.15]');

        //FOR SORT
        categoryPetPrice = data.data;


        //display
        if(data.data.length === 0){
            displayNoInfo();
        } else{
            displayCategory(data.data);
        }

    }) 
    .catch(err => console.log(err));

};

//display categories buttons---1
const displayCategories = (categories) => {
    
    const categoryContainer = document.getElementById("categories");

    categories.forEach(element => {
        
        const div = document.createElement("div");
        div.innerHTML = `
        <button class="btn w-full flex flex-col lg:flex-row font-bold inter-regular text-2xl py-6 rounded-2xl h-auto bg-white border-[#0E7A81]/[.15] hover:bg-[#0E7A81]/[.1] hover:border-[#0E7A81] btn-category" id="btn-${element.category}" onclick="loadCategory('${element.category}')"><img src="${element.category_icon}" alt="${element.category}" class="lg:mr-4">${element.category}s</button> 
        `
        categoryContainer.append(div);

    });
};

//display all pet card---2
const displayPets = (pets) => {


    
    const petsContainer = document.getElementById("cards");

    pets.forEach(element => {
        
        const card = document.createElement("div");
        card.classList = "card bg-base-100 border";
        card.innerHTML = `
            <figure class="px-4 pt-4">
                <img src="${element.image}" alt="${pets.breed}" class="rounded-xl" />
            </figure>
            <div class="card-body p-4">
                <h2 class="card-title inter-regular font-bold">${(element.pet_name == "" || element.pet_name == null || element.pet_name == undefined) ? "Not available" : element.pet_name}</h2>
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-qrcode"></i>  Breed: ${(element.breed == "" || element.breed == null || element.breed == undefined) ? "Not available" : element.breed }</p>
                <p class="text-[#131313]/[.7]"> <i class="fa-regular fa-calendar"></i>  Birth: ${(element.date_of_birth == "" || element.date_of_birth == null || element.date_of_birth == undefined) ? "Not available" : element.date_of_birth}</p>
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-mercury"></i> Gender: ${(element.gender == "" || element.gender == null || element.gender == undefined) ? "Not available" : element.gender}</p>
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-dollar-sign"></i> Price: ${(element.price == "" || element.price == null || element.price == undefined) ? "Not mentioned" : element.price + "$"}</p>
                <hr>
                <div class="card-actions grid grid-cols-3 gap-2 xl:gap-4">
                    <button class="btn max-w-xs bg-white" onclick="liked('${element.image}')" ><i class="fa-regular fa-thumbs-up"></i></button>
                    <button id="${element.petId}Adopt" class="btn max-w-xs text-[#0E7A81] bg-white" onclick="adoptModal('${element.petId}Adopt')">Adopt</button>
                    <button class="btn max-w-xs text-[#0E7A81] bg-white" onclick="modal('${element.image}','${element.pet_name}','${element.breed}','${element.date_of_birth}','${element.gender}', '${element.price}','${element.vaccinated_status}','${element.pet_details.replace(/'/g, "\\'")}')">Details</button>
                </div>
            </div>
        `
        petsContainer.append(card);

    });
};


//display catergory pet card---3
const displayCategory = (pets) => {
    
    const petsContainer = document.getElementById("cards");
    petsContainer.innerHTML='';
    pets.forEach(element => {
        
        const card = document.createElement("div");
        card.classList = "card bg-base-100 border";
        card.innerHTML = `
            <figure class="px-4 pt-4">
                <img src="${element.image}" alt="${element.breed}" class="rounded-xl" />
            </figure>
            <div class="card-body p-4">
                <h2 class="card-title inter-regular font-bold">${(element.pet_name == "" || element.pet_name == null || element.pet_name == undefined) ? "Not available" : element.pet_name}</h2>
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-qrcode"></i>  Breed: ${(element.breed == "" || element.breed == null || element.breed == undefined) ? "Not available" : element.breed }</p>
                <p class="text-[#131313]/[.7]"> <i class="fa-regular fa-calendar"></i>  Birth: ${(element.date_of_birth == "" || element.date_of_birth == null || element.date_of_birth == undefined) ? "Not available" : element.date_of_birth}</p>
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-mercury"></i> Gender:  ${(element.gender == "" || element.gender == null || element.gender == undefined) ? "Not available" : element.gender}</p>
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-dollar-sign"></i> Price: ${(element.price == "" || element.price == null || element.price == undefined) ? "Not mentioned" : element.price + "$"}</p>
                <hr>
                <div class="card-actions grid grid-cols-3 gap-2 xl:gap-4">
                    <button class="btn max-w-xs bg-white" onclick="liked('${element.image}')"><i class="fa-regular fa-thumbs-up"></i></button>
                    <button id="${element.petId}Adopt" class="btn max-w-xs text-[#0E7A81] bg-white" onclick="adoptModal('${element.petId}Adopt')">Adopt</button>
                    <button class="btn max-w-xs text-[#0E7A81] bg-white" onclick="modal('${element.image}','${element.pet_name}','${element.breed}','${element.date_of_birth}','${element.gender}', '${element.price}','${element.vaccinated_status}','${element.pet_details.replace(/'/g, "\\'")}')">Details</button>
                </div>
            </div>
        `
        petsContainer.append(card);

    });
};

//display no category found---3
const displayNoInfo = () => {
    
    const petsContainer = document.getElementById("cards");
    petsContainer.innerHTML='';
    petsContainer.innerHTML = `
        <div class="bg-[#131313]/[0.03] flex flex-col justify-center items-center rounded-2xl p-20 sm:p-32  col-span-3	">
            <img src="assets/images/error.webp" alt="error">
            <h1 class="font-bold inter-regular text-3xl my-4 text-center">No Information Available</h1>
            <p class="lg:w-2/3 text-center text-[#131313]/[.7]">Unfortunately, there are no pets available at this moment. Please check back later or explore other categories to find your perfect companion.</p>
        </div>
     `;
};

//adding liked images
const liked = (img) => {
    
    const like = document.getElementById('likes');

    like.innerHTML += `
        <img src="${img}" alt="liked pet image" class="rounded-xl self-start">
    `;

};

const modal = (img, name, breed, birth, gender, price,vac, des) => {
    
    const modalinfo = document.getElementById('info');
    modalinfo.innerHTML = '';
    modalinfo.innerHTML = `
        <figure class="flex justify-center items-center">
            <img src="${img}" alt="name" class="rounded-xl w-full" />
        </figure>
        <div class="flex flex-col justify-start items-start card-body p-4">
            <h2 class=" inter-regular font-bold">${name}</h2>

            <div class="grid grid-cols-2 gap-x-4 gap-y-2">
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-qrcode"></i>  Breed:${breed == "" || breed == 'null' || breed == 'undefined' ? "Not available" : breed}</p>
    
                <p class="text-[#131313]/[.7]"><i class="fa-regular fa-calendar"></i>  Birth: ${birth == "" || birth == 'null' ? "Not available" : birth} </p>
    
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-mercury"></i>  Gender:${gender == "" || gender == 'null' || gender == 'undefined' ? "Not available" : gender} </p>
    
                <p class="text-[#131313]/[.7]"> <i class="fa-solid fa-dollar-sign"></i> price: ${price == "" || price == 'null' || price == 'undefined' ? "Not mentioned" : price + '$'} </p>
    
                <p class="text-[#131313]/[.7] col-span-2"><i class="fa-solid fa-syringe"></i> Vaccinated status: ${vac == "" || vac == 'null' || vac == 'undefined' ? "Not available" : vac}</p>
            </div>
            
            <hr class="border border-solid w-full">
            <div class="card-actions flex justify-between items-center">
                <h1 class="font-semibold inter-regular">Details Information</h1>
                <p>${des == "" || des == 'null' || des == 'undefined' ? "Not available" : des}</p>
            </div>
        </div>
                <div class="modal-action">
                  <form method="dialog" class="w-full">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn w-full bg-[#0E7A81]/[.1] border-[#0E7A81]/[.2] text-[#0E7A81]">Cancel</button>
                  </form>
                </div>
    `;
    my_modal_5.showModal()
};

const priceSort = () => {
   
    if(categoryPetPrice.length > 0){
        const SortPetCategory = categoryPetPrice.sort((a, b)=>{
            m = parseInt(a.price);
            n = parseInt(b.price);
            return (n || 0) - (m||0);
        })

        // loading
        const spin = document.getElementById('spin');

        const card = document.getElementById('cards');
        const like = document.getElementById('liked');
        
        card.classList.add('hidden');
        like.classList.add('hidden');
        spin.classList.remove('hidden');
        
        setTimeout(()=>{
            spin.classList.add('hidden');
            card.classList.remove('hidden');
            like.classList.remove('hidden');
        }, 2000 );


        displayCategory(SortPetCategory);
    }


    
};

const adoptModal = (idAdopt) => {
    const adopt = document.getElementById(idAdopt); 
   const btn = document.getElementById('close');
   const time = document.getElementById('countdown');
    let second = 3;
    time.innerText = second;
    my_modal_1.showModal();

    const clear = setInterval(()=>{
       second--;
       if(second != 0){
        time.innerText = second;
       }
    },1000);
    

    setTimeout(()=>{
        clearInterval(clear);
        btn.click();
        adopt.innerText = 'Adopted';
        adopt.disabled = true;
    },3000);
};


loadCategories();
loadCards();
