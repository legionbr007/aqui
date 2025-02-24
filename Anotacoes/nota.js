// Seleção de elementos
const addNoteButton = document.getElementById('addNoteButton');
const deleteNoteButton = document.getElementById('deleteNoteButton');
const changeColorButton = document.getElementById('changeColorButton');
const inputContainer = document.getElementById('inputContainer');
const noteInput = document.getElementById('noteInput');
const errorMessage = document.getElementById('errorMessage');
const limitMessage = document.getElementById('limitMessage');
const notesList = document.getElementById('notesList');

const deleteContainer = document.getElementById('deleteContainer');
const deleteForm = document.getElementById('deleteForm');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

const colorContainer = document.getElementById('colorContainer');
const colorForm = document.getElementById('colorForm');
const confirmColor = document.getElementById('confirmColor');
const cancelColor = document.getElementById('cancelColor');

const selectNoteContainer = document.getElementById('selectNoteContainer');
const selectNoteForm = document.getElementById('selectNoteForm');
const confirmSelectNote = document.getElementById('confirmSelectNote');
const cancelSelectNote = document.getElementById('cancelSelectNote');

const MAX_CHAR = 20;
const MAX_NOTES = 5;

/* 
  As notas serão armazenadas no localStorage como um array de objetos, 
  onde cada objeto tem a estrutura: { text: "texto da nota", color: "black" }
*/

// Carrega as notas
function loadNotes() {
  const savedNotes = localStorage.getItem('userNotes');
  return savedNotes ? JSON.parse(savedNotes) : [];
}

// Salva as notas
function saveNotes(notes) {
  localStorage.setItem('userNotes', JSON.stringify(notes));
}

// Renderiza as notas na tela
function renderNotes() {
  const notes = loadNotes();
  notesList.innerHTML = "";
  notes.forEach((noteObj, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note-item');
    noteDiv.textContent = noteObj.text;
    noteDiv.style.color = noteObj.color;
    notesList.appendChild(noteDiv);
  });
}

// Validação: Limita o input a 20 caracteres
noteInput.addEventListener('input', function() {
  if (noteInput.value.length >= MAX_CHAR) {
    errorMessage.style.display = 'inline';
    if (noteInput.value.length > MAX_CHAR) {
      noteInput.value = noteInput.value.slice(0, MAX_CHAR);
    }
  } else {
    errorMessage.style.display = 'none';
  }
});

// Botão "Adicionar Nota"
addNoteButton.addEventListener('click', function() {
  let notes = loadNotes();
  
  // Se já atingiu o limite de notas, exibe mensagem
  if (notes.length >= MAX_NOTES) {
    limitMessage.style.display = 'inline';
    setTimeout(() => { limitMessage.style.display = 'none'; }, 2000);
    return;
  }
  
  // Se o input estiver oculto, exibe-o para o usuário digitar
  if (inputContainer.style.display === 'none' || inputContainer.style.display === '') {
    inputContainer.style.display = 'block';
    noteInput.focus();
  } else {
    const text = noteInput.value.trim();
    if (text !== "") {
      // Adiciona a nota com cor padrão (preto)
      notes.push({ text: text, color: "black" });
      saveNotes(notes);
      renderNotes();
      noteInput.value = "";
      inputContainer.style.display = 'none';
    }
  }
});

// Botão "Apagar Nota": abre modal de exclusão
deleteNoteButton.addEventListener('click', function() {
  let notes = loadNotes();
  if (notes.length === 0) return;
  
  deleteForm.innerHTML = "";
  notes.forEach((noteObj, index) => {
    const div = document.createElement('div');
    div.classList.add('delete-item');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `delete-note-${index}`;
    checkbox.value = index;
    
    const label = document.createElement('label');
    label.setAttribute('for', `delete-note-${index}`);
    label.textContent = noteObj.text;
    
    div.appendChild(checkbox);
    div.appendChild(label);
    deleteForm.appendChild(div);
  });
  deleteContainer.style.display = 'block';
});

confirmDelete.addEventListener('click', function() {
  let notes = loadNotes();
  const checkboxes = deleteForm.querySelectorAll('input[type="checkbox"]');
  let newNotes = [];
  checkboxes.forEach((checkbox, index) => {
    if (!checkbox.checked) {
      newNotes.push(notes[index]);
    }
  });
  saveNotes(newNotes);
  renderNotes();
  deleteContainer.style.display = 'none';
});

cancelDelete.addEventListener('click', function() {
  deleteContainer.style.display = 'none';
});

// Botão "Mudar Cor"
changeColorButton.addEventListener('click', function() {
  const notes = loadNotes();
  if (notes.length === 0) {
    alert("Você não tem nota adicionada!");
    return;
  }
  // Exibe o modal de seleção de cor
  colorContainer.style.display = 'block';
});

// Após confirmar a cor, exibe modal para selecionar a nota
confirmColor.addEventListener('click', function() {
  // Recupera a cor selecionada (radio)
  const selectedColor = colorForm.querySelector('input[name="color"]:checked').value;
  colorContainer.style.display = 'none';
  
  // Modal para seleção da nota
  const notes = loadNotes();
  selectNoteForm.innerHTML = "";
  notes.forEach((noteObj, index) => {
    const div = document.createElement('div');
    div.classList.add('select-note-item');
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.id = `select-note-${index}`;
    radio.name = 'selectNote';
    radio.value = index;
    
    const label = document.createElement('label');
    label.setAttribute('for', `select-note-${index}`);
    label.textContent = noteObj.text;
    
    div.appendChild(radio);
    div.appendChild(label);
    selectNoteForm.appendChild(div);
  });
  // Guarda a cor selecionada temporariamente (no dataset)
  selectNoteContainer.dataset.selectedColor = selectedColor;
  selectNoteContainer.style.display = 'block';
});

// Aplica a mudança de cor na nota escolhida
confirmSelectNote.addEventListener('click', function() {
  const selectedRadio = selectNoteForm.querySelector('input[name="selectNote"]:checked');
  if (!selectedRadio) {
    alert("Selecione uma nota para mudar a cor.");
    return;
  }
  const noteIndex = parseInt(selectedRadio.value);
  const selectedColor = selectNoteContainer.dataset.selectedColor;
  let notes = loadNotes();
  // Atualiza a cor da nota selecionada
  notes[noteIndex].color = selectedColor;
  saveNotes(notes);
  renderNotes();
  selectNoteContainer.style.display = 'none';
});

cancelSelectNote.addEventListener('click', function() {
  selectNoteContainer.style.display = 'none';
});

cancelColor.addEventListener('click', function() {
  colorContainer.style.display = 'none';
});

// Renderiza as notas na inicialização
renderNotes();
