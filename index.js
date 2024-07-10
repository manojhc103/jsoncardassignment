

    let cont = document.getElementById("container");
    let form = document.getElementById("form");
    let btn= document.getElementById("btn")
    let arr = [];
let flag=false;
let currentId=null;

    async function postData() {
        let obj = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            des: document.getElementById("des").value,
            address: document.getElementById("address").value,
            photo:document.getElementById("photo").value
        };
        try {
            let response = await axios.post("https://json-server-syrf.onrender.com/abc", obj);
            alert("Your data added successfully")
            getValueApi()
        } catch (error) {
            console.log(error);
        }
    }

    async function getValueApi() {
        try {
            let response = await axios.get("https://json-server-syrf.onrender.com/abc");
            console.log(response.data);
            arr = response.data;
            displayData();
        } catch (error) {
            console.log(error);
        }
    }

    function displayData() {
        cont.innerHTML = "";
        arr.forEach((ele) => {
            let card = document.createElement("div");
            card.setAttribute("class", "card");
            let name = document.createElement("h2");
            name.innerText = ele.name
            let des = document.createElement("h4");
            des.innerText = ele.des;
            let email = document.createElement("email");
            email.innerText = ele.email;
            let address = document.createElement("address");
            address.innerText = ele.address;
            let photo = document.createElement("img");
            photo.src = ele.photo;

            let del= document.createElement("button");
            del.innerText = "Delete";
            del.id="del"
            del.addEventListener("click", () => {
                deleteData(ele.id);
                alert("Your Card Deleted Successfully")
                });

                let edit = document.createElement("button");
                edit.innerText = "Edit";
           edit.id="edit"
                edit.addEventListener("click", () => {
                editData(ele);
                
                    });
                card.append( photo,name, des, email, address, edit,del);
                cont.append(card)
        });
    }

    // ************delete function*****************
    async function deleteData(id){
try{
    let res= await axios.delete(`https://json-server-syrf.onrender.com/abc/${id}`)
getValueApi()
}
catch(error){
    console.log(error)
}
    }
   
// *******************edit Data**********************
function editData(data){
    let obj = {
        name: document.getElementById("name").value=data.name,
        email: document.getElementById("email").value=data.email,
        des: document.getElementById("des").value=data.des,
        address: document.getElementById("address").value=data.address,
        photo:document.getElementById("photo").value=data.photo
    }
    btn.innerText="Update"
    flag=true;
    currentId=data.id;
}

async function updateData(){
    let newobj = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        des: document.getElementById("des").value,
        address: document.getElementById("address").value,
        photo:document.getElementById("photo").value
    };
    try{
        let res= await axios.patch(`https://json-server-syrf.onrender.com/abc/${currentId}`,newobj)
        alert("Your data updated successfully")
        flag=false;
        btn.innerText = "Submit";
        getValueApi()
        form.reset()
    }
    
    catch(error){
        console.log(error)
    }
}
btn.addEventListener("click", (e) => {
    e.preventDefault()
    if(flag){
        updateData();
    }
    else{
        postData();
    }
});
    // form.addEventListener("submit", postData);
    getValueApi();
