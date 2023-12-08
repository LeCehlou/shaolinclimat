

function showModal(question) {
    var modal= document.getElementById("InformationModale")
    document.getElementById("modaleTexte").innerText = question.question.modale.texte;
    document.getElementById("modaleImg").setAttribute("src" , question.question.modale.img); 

    modal.style.display = "block";
    }
function closeModal(question) {
    var modal= document.getElementById("InformationModale")
      modal.style.display = "none";
}
