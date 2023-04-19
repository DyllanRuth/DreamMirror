const signUpBtnLink = document.querySelector('.signUpBtn-link');
const signInBtnLink = document.querySelector('.signInBtn-link');
const wrapper = document.querySelector('.wrapper');

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

// var signUpBtn = document.querySelector(".submit");


// signUpBtn.onclick = function() {
//     const username = document.getElementById("username").value;

//     const email = document.getElementById("email").value;

//     const password = document.getElementById("password").value;

    
// };

let $ = document

const registerForm = $.querySelector(".form-wrapper-sign-up")
const nameInput = $.querySelector("#username1")
const passwordInput = $.querySelector("#password")
const emailInput = $.querySelector("#email")
const table = $.querySelector("table")

let db = null
let objectStore = null

window.addEventListener("load", () => {
	let DBOpenRequest = indexedDB.open('DreamDB', 1)
	
	DBOpenRequest.addEventListener("error", err => {
		console.warn("DB Error: ", err)
	})
	DBOpenRequest.addEventListener("success", e => {
		db = e.target.result
		getUser()
		
		console.log("DB Success: ", e.target.result)
	})
	DBOpenRequest.addEventListener("upgradeneeded", e => {
		db = e.target.result
		
		console.log("DB Old Version: ", e.oldVersion)
		console.log("DB Upgraded: ", e)
		console.log("DB New Version: ", e.newVersion)
		
		if(!db.objectStoreNames.contains("users")){
			db.createObjectStore('users', {
				keyPath: "userId"
			})
		}
		
		if(db.objectStoreNames.contains("products")){
			db.deleteObjectStore('products')
		}
		
		console.log(db.objectStoreNames)
	})
})

registerForm.addEventListener("submit", e => {
	e.preventDefault()
	
	let newUserObj = {
		userId: Math.floor(Math.random() * 9999),
		name: nameInput.value,
		password: passwordInput.value,
		email: emailInput.value
	}
	
	let tx = createTransaction("users", "readwrite")
	tx.addEventListener("complete", e => {
		console.log("Write TX Complete: ", e)
	})
	
	let store = tx.objectStore("users")
	let req = store.add(newUserObj)
	
	req.addEventListener("error", err => {
		console.warn("Write REQ Error: ", err)
	})
	req.addEventListener("success", e => {
		console.log("Write REQ Success: ", e)
		clearInput()
		
		getUser()
	})
})

function getUser() {
	let tx = createTransaction("users", "readonly")
	tx.addEventListener("complete", e => {
		console.log("Get TX Complete: ", e)
	})
	
	let store = tx.objectStore("users")
	let req = store.getAll()
	
	req.addEventListener("error", err => {
		console.warn("Get REQ Error: ", err)
	})
	req.addEventListener("success", e => {
		console.log("Get REQ Success: ", e.target.result)

        alert("About to login " + nameInput);
		
// 	// 	let users = e.target.result
// 	// 	table.innerHTML = `<tr>
//     //     <th>ID</th>
//     //     <th>Name</th>
//     //     <th>Password</th>
//     //     <th>Email</th>
//     //     <th>Action</th>
//     //   </tr>`
// 	// 	table.innerHTML += users.map(user => {
// 	// 		return `<tr>
//     //     <td>${user.userId}</td>
//     //     <td>${user.name}</td>
//     //     <td>${user.password}</td>
// 	// 			<td>${user.email}</td>
//     //     <td><a href="#" onclick="deleteUser(${user.userId})">Delete</a></td>
//     //   </tr>`
// 		}).join("")
	})
}

function e() {
    var email = document.querySelector("#username1").value;
    var password = document.querySelector("#password1").value;
    db = e.target.result;
    var tx = db.transaction(["users"], "readonly");
    var store = tx.objectStore("users");
    // get the index from the Object Store
    const index = store.index('email');
    // query by indexes
    var query = index.get(key);
    query.onsuccess = function(e) {
        console.log(query.result)
        if(query.result)
        {
            if(password != query.result.password) {
                alert("Incorrect Credentials... Please check and try again!");
            }
         else{
             console.log('Success');  
			 alert("About to login " + email); 
			 window.location.replace("homepage.html");

          }
       }
    };
};

function deleteUser(userId) {
	let tx = createTransaction("users", "readwrite")
	tx.addEventListener("complete", e => {
		console.log("Delete TX Complete: ", e)
	})
	
	let store = tx.objectStore("users")
	let req = store.delete(userId)
	
	req.addEventListener("error", err => {
		console.warn("Delete REQ Error: ", err)
	})
	req.addEventListener("success", e => {
		console.log("Delete REQ Success: ", e)
		
		getUser()
	})
}

function createTransaction(storeName, mode) {
	let tx = db.transaction(storeName, mode)
	tx.addEventListener("error", err => {
		console.warn("TX Error: ", err)
	})
	
	return tx
}

function clearInput() {
	nameInput.value = ''
	passwordInput.value = ''
	emailInput.value = ''
}
