        const res = fetch("/comments", {method: "GET"}).then(res => res.json()).then(datares => datares.forEach(item=>{
            var div = document.createElement(div);
            div.innerHTML =  item.name + "<br>" + item.email + "<br>" + item.comment + "<br>";
            // div.classList.add("bg-white");
            div.classList.add("my-6");
            div.classList.add("p-4");
            div.classList.add("rounded-lg");
            div.classList.add("shadow-md");
            document.getElementById("commentcontent").appendChild(div);
        }))


const addCommentForm = document.querySelector('#Comment-form')
addCommentForm.addEventListener('submit', (e) => {
    e.preventDefault
    const formData = JSON.stringify({
        name: addCommentForm.name.value,
        email: addCommentForm.email.value,
        comment: addCommentForm.comment.value
    });

    console.log(formData)
    fetch("/comments",{
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: formData
    }).then(response => response.json()).then(response => console.log(response));

})
