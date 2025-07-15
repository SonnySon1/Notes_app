// ambil emenet yang dibutuhkan
const listAktifitas = document.getElementById('listAktifitas');
const btnSimpanAktifitas = document.getElementById('btnSimpanAktifitas')

btnSimpanAktifitas.onclick = function () {
    // get value in form
    const judul     = document.getElementById('judul');
    const author    = document.getElementById('author');
    const catatan   = document.getElementById('catatan');

    

    // validate form value
    if (judul.value == '') {
        judul.classList.add('is-invalid');
        return
    }
    else if (author.value == '') {
        author.classList.add('is-invalid');
        return
    }
    else if (catatan.value == '') {
        catatan.classList.add('is-invalid');
        return
    }
    else{
        judul.classList.remove('is-invalid');
        author.classList.remove('is-invalid');
        catatan.classList.remove('is-invalid');
    }

    
    const createNewElement = newElement(judul.value, author.value, catatan.value);
    
    if (createNewElement == 1) {
        judul.value    = ""
        author.value   = ""
        catatan.value  = ""
        countListAktifitas()
    }

}


// fungsi untuk membuat sebuah rangka element
function newElement(judul, author, catatan) {
    // card element
    const indexCard = "card-"+Math.floor(Math.random() * 10) +1 

    const newCard = document.createElement('div');
    newCard.classList.add('card', 'mb-3');
    newCard.setAttribute('id', ""+ indexCard);

    // card body
    const newCardBody = document.createElement('div');
    newCardBody.classList.add('card-body');


    // new first element in card
    const newCardBodyFirstElement = document.createElement('div');
    newCardBodyFirstElement.classList.add('d-flex', 'justify-content-between', 'flex-wrap')

    // new title in first element card
    const newTitleInFirstElementCard = document.createElement('h5');
    newTitleInFirstElementCard.classList.add('card-title', 'title_note')
    const newTextTitleInFirstElementCard = document.createTextNode(judul);
    newTitleInFirstElementCard.appendChild(newTextTitleInFirstElementCard);

    // new button action in first element card
    const newButtonActionInFirstElementCard = document.createElement('div');

    const newButtonActionAhrefInFirstElementCard = document.createElement('a');
    newButtonActionAhrefInFirstElementCard.classList.add('text-decoration-none', 'text-black');
    newButtonActionAhrefInFirstElementCard.setAttribute('href', '');
    

    // new remove button in first element card
    const newButtonRemoveInFirstElementCard = document.createElement('a');
    newButtonRemoveInFirstElementCard.classList.add('text-decoration-none', 'text-black');
    newButtonRemoveInFirstElementCard.setAttribute('onclick', `removeCard('${indexCard}')`);

    // create button action icon in first element card
    const newButtonActionIconAhrefInFirstElementCard = document.createElement('i');
    newButtonActionIconAhrefInFirstElementCard.classList.add('bi', 'bi-three-dots-vertical');


    // create button removeicon in first element card
    const newButtonRemoveIconAhrefInFirstElementCard = document.createElement('i');
    newButtonRemoveIconAhrefInFirstElementCard.classList.add('bi', 'bi-x-lg');

    // new author in card
    const newAuthorInCard = document.createElement('h6');
    newAuthorInCard.classList.add('card-subtitle', 'mb-2', 'text-body-secondary')
    const newAuthorTextInCard = document.createTextNode('Ditulis Oleh '+author);
    newAuthorInCard.appendChild(newAuthorTextInCard)
    

    // new text note in card
    const newNote = document.createElement('p');
    newNote.classList.add('card-text');
    const newTextNote = document.createTextNode(catatan);
    newNote.appendChild(newTextNote);


    // rangkai semua element dari element terdalam hingga keluar
    // rangkai button action
    newButtonActionAhrefInFirstElementCard.appendChild(newButtonActionIconAhrefInFirstElementCard);
    newButtonRemoveInFirstElementCard.appendChild(newButtonRemoveIconAhrefInFirstElementCard);
    newButtonActionInFirstElementCard.appendChild(newButtonActionAhrefInFirstElementCard);
    newButtonActionInFirstElementCard.appendChild(newButtonRemoveInFirstElementCard);


    // title and button action--
    newCardBodyFirstElement.append(newTitleInFirstElementCard);
    newCardBodyFirstElement.append(newButtonActionInFirstElementCard);


    // rangkai di card body
    newCardBody.appendChild(newCardBodyFirstElement);
    newCardBody.appendChild(newAuthorInCard);
    newCardBody.appendChild(newNote);
   
    // rangaki ke card
    newCard.appendChild(newCardBody);
   
    // tambahkan card ke list
    listAktifitas.appendChild(newCard);

    return 1;
}

function removeCard(cardIndex){
    // find element 
    const card = document.getElementById(cardIndex);
    card.remove();
    countListAktifitas()
}


function countListAktifitas() {
    const alertCatatanTidakTersedia = document.getElementById('alertCatatanTidakTersedia');
    const listCard = listAktifitas.querySelectorAll('.card').length;
    document.getElementById('catatanTersedia').innerText = listCard;

    if( listCard > 0){
        alertCatatanTidakTersedia.classList.add('d-none')
    }else{
        alertCatatanTidakTersedia.classList.remove('d-none')
    }
}




document.getElementById('searchCatatan').addEventListener('keyup', function () {

    const keyword = this.value.toLowerCase();
    const cards    = document.querySelectorAll('.card');
    let visibleCount = 0;

    cards.forEach(card => {
        const titleElemenet = card.querySelector('.title_note');
        const titleText     = titleElemenet.textContent.toLowerCase();
        
        if (titleText.includes(keyword)) {
            card.style.display = '';
            visibleCount++;
        }
        else{
            card.style.display = 'none';
        }
    });


    const catatanTersedia = document.getElementById('catatanTersedia').innerText = visibleCount;
    const alertCatatanTidakTersedia = document.getElementById('alertCatatanTidakTersedia');

    if (visibleCount > 0) {
        alertCatatanTidakTersedia.classList.add('d-none');
    }
    else{
        alertCatatanTidakTersedia.classList.remove('d-none');
    }

})