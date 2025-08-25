let container = document.getElementById('cont')
let inpTitle = document.getElementById('title')
let textarea =document.getElementById('content')
let btnAdd =document.getElementById('addNote')
let notesList =document.getElementById('notesList')

let deleteAllbtn=document.createElement('button')
deleteAllbtn.className='hide'
deleteAllbtn.textContent='deleteAll'
container.appendChild(deleteAllbtn)

let listNote=localStorage.Notes?JSON.parse(localStorage.Notes):[]
let objNote

// ===============================
let editindex=null
// ازرار الاضافة والحذف
btnAdd.onclick=()=>{
  if (editindex===null) {
    createNote()
  }else{
    updateNote()
  }
  
}
deleteAllbtn.onclick=()=>{
  deleteAll()
}
// ===============================

// ===============================
// 🟢 (1) دالة انشاء عنصر (مرتبطة بالزر)
// =============================
let createNote=()=>{
  if(inpTitle.value&& textarea.value){
    objNote={
    title:inpTitle.value,
    textNote:textarea.value
  }
  listNote.push(objNote)
  localStorage.setItem('Notes',JSON.stringify(listNote))
  showNote()
  }
}
// =============================

// ===============================
// 🟢 (4) دالة حذف الكل (مرتبطة بالزر)
// ===============================
let deleteAll =()=>{
  if(listNote.length){
  listNote.splice(0)
  localStorage.setItem('Notes',JSON.stringify(listNote))
  showNote()
  deleteAllbtn.classList.add('hide')
}
}
// ===============================

// ===============================
// 🟢 داله اظهار النوت (2)
// ===============================
let showNote=()=>{
  notesList.innerHTML=''
  if (listNote.length){
  deleteAllbtn.classList.remove('hide')
}else{
  deleteAllbtn.classList.add('hide')
}
  listNote.map((x,i)=>{
    notesList.innerHTML += `
    <div id='ele'>
    <span class='btn'>${i}</span>
    <li class='sty1'>${x.title}</li>
    <li class='sty2'>${x.textNote}</li>
    <button onclick='deleteNote(${i})'>🗑️</button>
    </div>
    <button onclick='editNote(${i})'>✏️ Edit</button>
    `
  }
  )
  
}

// ===============================
// 🟢 داله حذف منتح عن طريق مكانه (3)
// ===============================
let deleteNote =(i)=>{
  listNote.splice(i,1)
  localStorage.setItem('Notes',JSON.stringify(listNote))
  showNote()
}
// ===============================

showNote()

// ===============================
// 🟢 داله تعديل المنتجات (5)

let editNote=((i)=>{
  inpTitle.value=listNote[i].title
  textarea.value=listNote[i].textNote
  btnAdd.textContent='تعديل الملاحظة'
  editindex=i
}
)

let updateNote=()=>{
  listNote[editindex].title=inpTitle.value
  listNote[editindex].textNote=textarea.value
  localStorage.setItem('Notes',JSON.stringify(listNote))
  btnAdd.textContent='اضافه ملاحظة'
  inpTitle.value=''
  textarea.value=''
  editindex=null
  showNote()
}
// ==============================