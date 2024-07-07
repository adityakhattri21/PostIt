const form = document.getElementById("signup-form")

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    console.log("here")
    const formData = new FormData(form)
    const signupPayload = {
        username: formData.get("username"),
        password: formData.get("password")
    };

    const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(signupPayload)
    });

    const result = await response.json();

    if(result.status === 200){
        window.location.replace("/")
    } else{
        window.location.reload();
        alert(result.message)
    }
})