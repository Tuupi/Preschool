import { initializeApp } from 'firebase/app'
import { 
    getFirestore, collection, getDocs,
    addDoc,
    Timestamp
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDFnkeNCEUse2BLRAcKvJuKyjpmFicLcdQ",
    authDomain: "preschool-node.firebaseapp.com",
    projectId: "preschool-node",
    storageBucket: "preschool-node.appspot.com",
    messagingSenderId: "452557222180",
    appId: "1:452557222180:web:9e0f02ece79e0d86f803b1",
    measurementId: "G-QDRN2DFZVB"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'comments')

getDocs(colRef).then((snapshot) => {
    let comments = []
    snapshot.docs.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id })
    })
    console.log(comments)
    snapshot.forEach((comment) => {
        var div = document.createElement(div);
        div.innerHTML = comment.data().name + "<br>" + comment.data().email + "<br>" + comment.data().comment + "<br>";
        // div.classList.add("bg-white");
        div.classList.add("my-6");
        div.classList.add("p-4");
        div.classList.add("rounded-lg");
        div.classList.add("shadow-md");
        document.getElementById("commentcontent").appendChild(div);
    })
})


const addCommentForm = document.querySelector('.Comment-form')
addCommentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        name: addCommentForm.name.value,
        email: addCommentForm.email.value,
        comment: addCommentForm.comment.value,
        date: Timestamp.now()
    }).then(() => {
        addCommentForm.reset()
    })

})
    
