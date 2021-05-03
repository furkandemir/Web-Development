//Elemntleri Seçme
const githubForm=document.getElementById("github-form");
const nameInput =document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");

const lastUsers=document.getElementById("last-users");
const github= new Github();
const ui=new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);

}

function getData(e){

    let username=nameInput.value.trim();

    if(username===""){
        alert("lütfen geçerli bir kullanıcı adı girin...");
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message==="Not Found"){
                ui.showError("Kullanıcı bulunamadı");

            }else{
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));

    }
    ui.clearInput();


    e.preventDefault();
}

function clearAllSearched(){
    //tüm Arananları temizle

    if(confirm("Emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage(); //Storageden temizleme
        ui.clearAllSearchedFromUI();
    }
}

function getAllSearched(){
    //Arananları Storageden al ve uiya ekle
    let result="";
    let users=Storage.getSearchedUsersFromStorage();

    users.forEach(user =>{
        result+=`<li class="list-group-item">${user}</li>
        
        
        
        
        
        `;


    });
    lastUsers.innerHTML=result;
}