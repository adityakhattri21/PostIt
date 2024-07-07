const root = document.getElementById("root");

const getUserDetails = async () => {
    const userpanel = document.getElementById('userPanel');
    const res = await fetch('/auth/all-details');
    if (res.status === 200) {
        const result = await res.json();
        userpanel.innerHTML = `<div class="flex items-center justify-end mb-8 pr-4">
            <span class="mr-5 text-white font-bold">${result.user.username}</span>
            <i onclick="logout()" class="cursor-pointer text-rose-400 hover:text-rose-500 transition-colors duration-150 ri-logout-box-r-line"></i>
        </div>`;
    }
};

const logout = async () => {
    await fetch("/auth/logout", {
        method: "POST"
    });
        window.location.reload();
   
};

const postForm = document.getElementById("post-form")
postForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const formData = new FormData(postForm);
    const sendPayload = {
        content: formData.get("post")
    }

    const res = await fetch("/post/create",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sendPayload)
    });
    const result = await res.json()

    if(result.status === 201){
        window.location.reload();
    } else if(result.status = 401){
        window.location.replace('/login')
    }else{
        alert(`Error:${result.message}`)
    }
})

const fetchAllPosts = async()=>{
    const response = await fetch("/post")
    const results = await response.json();
    const {posts} = results;
    posts.map((post)=>{
        const postContainer = addPosts(post);
        root.appendChild(postContainer)
    })
}

const addPosts = (post)=>{
    console.log(post)
    const container = document.createElement("div")
    container.classList.add("bg-white", "shadow-md", "rounded", "px-8", "pt-6", "pb-8", "mb-4", "border", "border-red-300", "card-shadow", "fade-in");

    const authorSection = document.createElement("div")
    authorSection.classList.add("flex","items-center", "mb-4")
    authorSection.innerHTML = `<img src="${post.author.avatar}" alt="Avatar" class="rounded-full w-16 h-16 object-cover mr-4"/>
    <div>
        <h2 class="text-xl font-bold text-gray-900">${post.author.username}</h2>
        <time class="text-gray-600">${getDateInFormat(post.createdAt)}</time> </div>`
    container.appendChild(authorSection);

    const postContent = document.createElement("p")
    postContent.classList.add("text-gray-800", "text-2xl", "font-medium");
    postContent.innerText = post.content
    container.appendChild(postContent);


    const commentSection = document.createElement("div");
    commentSection.classList.add("mt-4")
    const commentTitle = document.createElement("h3")
    commentTitle.classList.add("text-xl" ,"font-semibold" ,"text-gray-900")
    commentTitle.innerText = "Comments";
    commentSection.appendChild(commentTitle)

    post.comments.forEach((comment) => {
        const commentContainer = document.createElement("div");
        commentContainer.classList.add("flex", "flex-col", "items-start", "space-y-2", "mb-4", "mt-4");
        
        commentContainer.innerHTML = `
            <div class="flex-col items-center ">
            <div class="flex items-center">    
            <img src="${comment.author.avatar}" alt="Comment Avatar" class="rounded-full w-10 h-10 object-cover"/>
                <span class="font-semibold text-lg ml-2">${comment.author.username}</span><br>
                <time class="font-light text-xs ml-2">${getDateInFormat(comment.createdAt)}</time><br>
            </div>    
                <p class="break-words ml-10">${comment.text}</p>
            </div>`
        commentSection.appendChild(commentContainer);
    });


    const commentForm = document.createElement("form")
    commentForm.id= "commentForm"
    commentForm.classList.add("mt-4")
    
    commentForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const formData = new FormData(commentForm);
        const commentPayload = {
            postId:post._id,
            comment:formData.get("commentInput")
        }
        const res = await fetch("/comment/create",{
            method :"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(commentPayload)
        });
        const result = await res.json();
        console.log(result)
        console.log(result.status)
        if(result.success){
            window.location.reload();
        }else{
            window.location.reload();
            alert(result.message)
        }
    });

    commentForm.innerHTML = `<input name="commentInput" id="commentInput" type="text" placeholder="Write a comment..." class="w-full p-2 border-2 rounded border-gray-300 outline-none mb-2" />
    <button type="submit" class="w-full py-2 px-4 bg-rose-400 hover:bg-rose-500 text-white font-bold rounded">
        Post Comment
    </button>`
    if(post.comments.length >0 ){
        container.appendChild(commentSection);
    }
    container.appendChild(commentForm);

    return container;
}

const getDateInFormat = (dateString)=>{
    const dateObject = new Date(dateString);

const day = dateObject.getDate(); 
const month = dateObject.getMonth() + 1; 
const year = dateObject.getFullYear(); 
const hours = dateObject.getHours(); 
const minutes = dateObject.getMinutes(); 

return `${day}/${month}/${year} ${hours}:${minutes}`
}

getUserDetails();
fetchAllPosts();
