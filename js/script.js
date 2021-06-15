let nameInp = document.getElementById("productName");
let categoryInp = document.getElementById("producCategory");
let priceInp = document.getElementById("productPrice");
let descInp =document.getElementById("productDesc");

let addBtn = document.getElementById("addBtn");
let tBody = document.getElementById("tBody");

let deleteBtn = document.getElementById("deleteBtn");
let updateBtn = document.getElementById("updateBtn");
let updateProductBtn = document.getElementById("updateBtn");

let searchInp = document.getElementById("searchInp")

if(localStorage.getItem("productData") == null){
    productList = []
}else {
    productList = JSON.parse( localStorage.getItem("productData") );
    displayData()
}

//productList = []

function addProduct(){

    if(checkInps() == true){
        productData = {
            productName : nameInp.value,
            productCategory : categoryInp.value,
            productPrice : priceInp.value,
            productDesc :descInp.value
        };

        productList.push(productData);

        localStorage.setItem("productData" , JSON.stringify(productList))

        console.log(productList);

        displayData()

        clearProduct()
    }else{
        alert("all inpits are required")
    }
}

addBtn.addEventListener("click" , addProduct);

function displayData(){

    cartona =``;

    for(var i = 0 ; i<productList.length ; i++){

        cartona += `<tr>
                        <td>${i +1}</td>
                        <td>${productList[i].productName}</td>
                        <td>${productList[i].productCategory}</td>
                        <td>${productList[i].productPrice}</td>
                        <td>${productList[i].productDesc}</td>
                        <td><button id="updateBtn" onclick="retriveData(${i})" class="btn btn-info">update</button></td>
                        <td><button id="deleteBtn" onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                    </tr>`
    }

    tBody.innerHTML = cartona;

}

function clearProduct(){

   nameInp.value = "";
   categoryInp.value = "";
   priceInp.value = "";
   descInp.value = ""
}

function deleteProduct(productIndex){
    //console.log(productIndex)
    productList.splice(productIndex , 1);
    displayData();
    localStorage.setItem("productData" , JSON.stringify(productList));
}

function checkInps() {
    
    if(nameInp.value != "" && categoryInp.value != "" 
    && priceInp.value != "" && descInp.value != ""){

        return true;

    }else{

        return false;
    }
}

let productIndexUpdate ;

function retriveData(index){

    productIndexUpdate = index;
    
    nameInp.value = productList[index].productName;
    categoryInp.value = productList[index].productCategory;
    priceInp.value = productList[index].productPrice;
    descInp.value = productList[index].productDesc;

    addBtn.style.display = "none"
    updateBtn.classList.remove("d-none")
}

function updateData(){

    productList[productIndexUpdate].productName = nameInp.value;
    productList[productIndexUpdate].productCategory = categoryInp.value;
    productList[productIndexUpdate].productPrice = priceInp.value;
    productList[productIndexUpdate].productDesc = descInp.value;

    localStorage.setItem("productData" , JSON.stringify(productList))

    displayData()
    clearProduct()

    addBtn.style.display = "block"
    updateBtn.classList.add("d-none")
    
}

function searchProduct(){
    
    let cartona = ``

    for(var i = 0 ; i<productList.length ; i++){
        if(productList[i].productName.toLowerCase().includes(searchInp.value.toLowerCase())){
            
            cartona += `<tr>
                            <td>${i +1}</td>
                            <td>${productList[i].productName.replace(searchInp.value, `<span style="background-color: yellow;">${searchInp.value}</span> `)}</td>
                            <td>${productList[i].productCategory}</td>
                            <td>${productList[i].productPrice}</td>
                            <td>${productList[i].productDesc}</td>
                            <td><button id="updateBtn" onclick="retriveData(${i})" class="btn btn-info">update</button></td>
                            <td><button id="deleteBtn" onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                        </tr>`

            tBody.innerHTML  = cartona;
        }

    }
    
}




