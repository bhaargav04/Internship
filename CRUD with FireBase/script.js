import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { remove, push, getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const setting = {
    dataBaseURL: "https://crud-example-eda38-default-rtdb.firebaseio.com/"
}

const firebaseConfig = {
    apiKey: "AIzaSyCng4K85N_iN5mGIYu5irlwX9nOFFBc7CE",
    authDomain: "crud-example-eda38.firebaseapp.com",
    databaseURL: "https://crud-example-eda38-default-rtdb.firebaseio.com",
    projectId: "crud-example-eda38",
    storageBucket: "crud-example-eda38.firebasestorage.app",
    messagingSenderId: "351716711514",
    appId: "1:351716711514:web:c187e5b639fb655a9e0c63"
};

const app = initializeApp(firebaseConfig)
const dataBase = getDatabase(app)
const userList = ref(dataBase, 'Users')

const elementId1 = document.querySelector('#id1')

const elementName = document.querySelector('#name')
const elementAge = document.querySelector('#age')
const elementEmail = document.querySelector('#email')
const elementForm = document.querySelector('#form1')
const elementTblBody = document.querySelector('#tbl-body')

elementForm.addEventListener("submit", function (e) {
    e.preventDefault();
     if (!elementName.value.trim() || !elementAge.value.trim() || !elementEmail.value.trim()) {
        alert('Please fill all details')
        return;
    }
    if (elementId1.value) {
        set(ref(dataBase, "Users/"+ elementId1.value),{
             name: elementName.value.trim(),
        age: elementAge.value.trim(),
        email: elementEmail.value.trim()
        })
        clearValue();
        return
    }

   
    const newUser = {
        name: elementName.value.trim(),
        age: elementAge.value.trim(),
        email: elementEmail.value.trim()
    }
    push(userList, newUser)
    clearValue();
})

function clearValue() {
    elementName.value = ""
    elementAge.value = ""
    elementEmail.value = ""
    elementId1.value = ""
}

onValue(userList, function (elementValue) {
    if (elementValue.exists()) {
        let userArray = Object.entries(elementValue.val())
        console.log(userArray)
        elementTblBody.innerHTML = ""
        for (let i = 0; i < userArray.length; i++) {
            let currentUser = userArray[i]
            console.log(currentUser)
            let currentUserID = currentUser[0]
            let currentUserValue = currentUser[1]

            elementTblBody.innerHTML += `   <tr>
      <th scope="row">${i+1}</th>
      <td>${currentUserValue.name}</td>
      <td>${currentUserValue.age}</td>
      <td>@${currentUserValue.email}</td>
      <td><button class='btn-edit'><i class="fa-solid fa-file-edit btn-edit" data-id=${currentUserID}></i></button></td>
      <td><button class='btn-delete'><i class="fa-solid  fa-trash btn-delete" data-id=${currentUserID}></i></button></td>
    </tr>
   `
        }
    }
    else {
        elementTblBody.innerHTML = "<tr><td colspan='6'>No Records found</td></tr>"
    }
})

document.addEventListener("click", function (e){
   if( e.target.classList.contains('btn-edit')){
    const id = e.target.dataset.id
    const tdElements = e.target.closest("tr").children
     elementId1.value = id
    elementName.value = tdElements[1].textContent
    elementAge.value = tdElements[2].textContent
    elementEmail.value = tdElements[3].textContent
    console.log('Edit', id)
   }
   else if(e.target.classList.contains('btn-delete')){
    if(confirm("Confirmation for Delete the Record!")){
         const id = e.target.dataset.id
         let data = ref(dataBase, `Users/${id}`)
         remove(data)
    }
    console.log('Delete', id)
   }
})