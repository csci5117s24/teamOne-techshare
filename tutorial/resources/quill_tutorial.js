const toolbarContainer = [
  [{'header': ['3',false]}],
  [{'font': []}],
  [{'color': []}],
  ['bold', 'italic', 'underline', 'strike'],
  [{'align': ['', 'center', 'right', 'justify']}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['clean'],
  ['image']
];


let image_data;

const quill = new Quill('#editing', {
    modules : {
      toolbar: toolbarContainer
    },
    theme: 'snow'
  });




// function imageHandler(){
//   console.log("In image handler")
//   // generate input element for files
//   let input = document.createElement('input')
//   input.setAttribute('type', 'file')
//   input.setAttribute('accept', 'image/*')

//   input.addEventListener('change', function(event){
//     // handle image here
//     // perhaps send to server, or if you want put contents in a variable to send to server along with other editor contents

//   })

//   input.click();

// }

// const toolbar = quill.getModule('toolbar');
// toolbar.addHandler('image', imageHandler);


quill.on('image', function(imgdata){
  console.log(imgdata)
  image_data = imgdata;
})

const submit_button = document.getElementById("submit_button")

submit_button.addEventListener('click', function (){

  // make your pick of html or delta
  const quillContent = quill.getContents();
  const quillHTML = quill.getSemanticHTML();

  console.log(quillContent);
  console.log(quillHTML);

  // make sure to also send image data from variable along with the editor contents. 

})