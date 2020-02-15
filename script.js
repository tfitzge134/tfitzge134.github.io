const gifs = document.querySelector('.gifs');
const submit = document.getElementById('submit');
const editSubmit = document.getElementById('submit-edit');
const deleteButton = document.getElementById('delete');

// Stores which item to edit/delete when the edit modal is up
let currentlyEditing = '';

function editModal(gif) {
  // Sets the edit modal to have the data from the gif clicked on
  $('#modal-edit').modal('open');
  const nameEdit = document.getElementById('name-edit');
  const urlEdit = document.getElementById('url-edit');

  nameEdit.value = gif.name;
  urlEdit.value = gif.url;

  currentlyEditing = gif._id;
}

function addPictures(gifData) {
  // Adds all of the gifs to the dom
  console.log('gifdata', gifData);
  gifs.innerHTML = '';
  gifData.forEach(gif => {
    if (!gif.url) return;

    const imageNode = document.createElement('img');
    imageNode.setAttribute('src', gif.url);
    imageNode.classList.add('gif');

    imageNode.addEventListener('click', () => {
      editModal(gif);
    });

    gifs.appendChild(imageNode);
  });
}
gifs;

axios.get('https://gaphy-backend.herokuapp.com/gifs').then(response => {
  // gets the initial data
  addPictures(response.data);
});

editSubmit.addEventListener('click', e => {
  // submits the put request to edit a gif
  const name = document.getElementById('name-edit').value;
  const url = document.getElementById('url-edit').value;

  axios
    .put(`https://gaphy-backend.herokuapp.com/gifs/${currentlyEditing}`, {
      name,
      url
    })
    .then(resp => {
      console.log(resp);
      addPictures(resp.data);
      $('#modal-edit').modal('close');
    });
});

submit.addEventListener('click', e => {
  // submits the post request to create a new picture
  const name = document.getElementById('name').value;
  const url = document.getElementById('url').value;

  axios
    .post('https://gaphy-backend.herokuapp.com/gifs', {
      name,
      url
    })
    .then(resp => {
      addPictures(resp.data);
      $('#modal-create').modal('close');
    });
});

deleteButton.addEventListener('click', e => {
  // deletes an image
  axios.delete(`https://gaphy-backend.herokuapp.com/gifs/${currentlyEditing}`).then(resp => {
    addPictures(resp.data);
    $('#modal-edit').modal('close');
  });
});

// initializes modal package
$('.modal').modal();
