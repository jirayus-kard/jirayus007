let firebaseConfig = {
    apiKey: "AIzaSyCrjotDDVhJ3f9GhSCff4NIkyXHchVqdhU",
    authDomain: "comlab005.firebaseapp.com",
    projectId: "comlab005",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

$('button').click(() => {

    let gpa = 0
    let credit = 0
    db.collection("users")
        .add({
            subject: $('#subject').val(),
            credit: Number($('#credit').val()),
            grade: $('#grade').val()
    })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
    })
        .catch(function(error) {
            console.error("Error adding document: ", error);
    });
})    
    
db.collection('users').orderBy("subject").onSnapshot(doc =>{
    let table = $('tbody')[0]
    document.querySelectorAll("tbody tr").forEach(item => item.remove())
    gpa = 0
    credit = 0
    doc.forEach(item =>{
        let rgrade
        if(item.data().grade == 'A') rgrade = 4
        else if (item.data().grade == 'B') rgrade = 3
        else if (item.data().grade == 'C') rgrade = 2
        else if (item.data().grade == 'D') rgrade = 1
        else if (item.data().grade == 'F') rgrade = 0
        let row = table.insertRow(-1)
        let firstCell = row.insertCell(0)
        let secondCell = row.insertCell(1)
        firstCell.textContent = item.data().subject
        secondCell.textContent = item.data().grade
        gpa += (rgrade * item.data().credit)
        credit += item.data().credit
    })
    console.log(gpa / credit)
    $('h4').text(gpa / credit);
})

