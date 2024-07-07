const form = document.getElementById('login-form');

form.addEventListener("submit",async (e)=>{
    e.preventDefault();

    const formData = new FormData(form);
    const sendPayload = {
        loginTerm: formData.get("username"),
        password: formData.get("password")
    }
    const response = await fetch("/auth/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(sendPayload)
    })
    const result = await response.json();
    console.log(result)
    if(result.status === 200){
        window.location.href = "/"
    }else{
        window.location.reload();
        alert(result.message)
    }
})