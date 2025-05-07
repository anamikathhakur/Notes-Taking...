let create_button = document.querySelector('.create_button');
let popup_box = document.querySelector('.popup_box');
let popup = document.querySelector('.popup_box .popup');
let popup_icon = document.querySelector('.popup_icon');
let button = document.querySelector('button');
let user_title = document.querySelector('.user_title');
let user_description = document.querySelector('.user_description');
let date = document.querySelector('.date');
let note = document.querySelector('.note');

let popup_title = document.querySelector('header p');
// let popup_button = document.querySelector('button');

let menu = document.querySelector('.menu');
let user_data = JSON.parse(localStorage.getItem('user_detail')) ?? [];

let month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

let Isupdate = false;
let edit_index = -1;

create_button.addEventListener('click', () => {
    popup_box.classList.add('show');
    popup.classList.add('show');
    user_title.value = '';
    user_description.value = '';
    popup_title.innerHTML = 'Add a New Note';
    button.innerHTML = 'Add Note';
})

popup_icon.addEventListener('click', (e) => {
    popup_box.classList.remove('show');
    popup.classList.remove('show');
})

button.addEventListener('click', (e) => {
    e.preventDefault();
    let title = user_title.value;
    let description = user_description.value;
    let date_obj = new Date();
    let get_month = month[date_obj.getMonth()];
    let get_date = date_obj.getDate();
    let get_year = date_obj.getFullYear();

    if (title == '' && description == '') {
        swal("OOPs!", "PLEASE ENTER A DESCRIPTION", "error");

        popup_box.classList.remove('show');
        popup.classList.remove('show');
        return;
    }

    let date_arr = [get_month, get_date, get_year].join(' ');

    popup_box.classList.remove('show');
    popup.classList.remove('show');

    if (Isupdate) {
        user_data[edit_index] = {
            'title': title,
            'description': description,
            'date': date_arr
        }

        Isupdate = false;
        edit_index = -1;
        localStorage.setItem('user_detail', JSON.stringify(user_data));
    }
    else {
        // let user_data = JSON.parse(localStorage.getItem('user_detail')) ?? [];
        user_data.push({
            'title': title,
            'description': description,
            'date': date_arr
        })
    }

    localStorage.setItem('user_detail', JSON.stringify(user_data));
    display_notes();
    console.log(user_data);

});


function display_notes() {
    let user_data = JSON.parse(localStorage.getItem('user_detail')) ?? [];
    let finalNotes = '';

    const notesContainer = document.querySelector('.wrapper');
    notesContainer.querySelectorAll('.note').forEach(note => note.remove());

    user_data.forEach((element, i) => {
        finalNotes += `
      <li class="note">
      <div class="data">
         <p class="note_title">${element.title}</p>
         <span>${element.description}</span>
      </div>
      <div class="settings">
      <div class="date">${element.date}</div>
       <div class="menu" onclick="fun(this)">
        <i class="icon fa-solid fa-ellipsis"></i>
        <ul class="options">
            <li onclick = "edit(${i} , '${element.title}' , '${element.description}') " ><i class="edit fa-solid fa-pen-to-square"> &nbsp; Edit </i></li>
            <li onclick = "trash(${i})" ><i class="delete fa-solid fa-trash"> &nbsp;Delete </i></li>
        </ul>
       </div>
       </div>
       </li>
`
    });
    create_button.insertAdjacentHTML('afterend', finalNotes);

}

display_notes();

function fun(ele) {
    ele.parentElement.classList.add('show');
    document.addEventListener('click', (e) => {
        if (e.target.tagName != 'I' && e.target.tagName != ele) {
            ele.parentElement.classList.remove('show');
        }

    })

}

function trash(i) {
    user_data.splice(i, 1);
    localStorage.setItem('user_detail', JSON.stringify(user_data));
    display_notes();
}

function edit(i, title, descp) {
    console.log(i, title, descp);
    create_button.click();
    user_title.value = title;
    user_description.value = descp;
    popup_title.innerHTML = 'Update a Note';
    button.innerHTML = 'Add Updated Note';
    Isupdate = true;
    edit_index = i;

}