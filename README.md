# Rich Text Editing: Quill

## Table of Contents
1. [Rich Text Editors](#rich-text-editors)
2. [QuillJS](#quilljs)
3. [Setup Environment](#setup-environment)
4. [Setting Quill Up](#setting-quill-up)
5. [Customization](#customization)
6. [Using the Data](#using-the-data)
    - [Delta](#delta)
    - [HTML](#html)
    - [Images](#images)
7. [Conclusion](#conclusion)
8. [References and Links to More Info](#references-and-links-to-more-info)



## Rich Text Editors
Rich text editors are software tools for text input. Chances are that if you use the internet often, you probably have interacted with a rich text editor, or at least the byproducts of one. One example of a system that uses a rich text editor is Wikipedia, which uses it for generating and editing page content.



This is an example of a rich text editor

![Rich Text Editor](https://s3-alpha.figma.com/hub/file/2338342817/fa466b30-5825-46de-a8b9-5fc60b9c2e0c-cover.png "This is a rich text editor")

Many rich text editors fall under the category of "WYSIWYG", standing for "What you see is what you get". This indicates that whatever is in the editor at the time the post is published will be reflected in the finished product. Another common kind of rich text editor is a markup editor, which allows users to edit text with markdown or some similar language. 


## Quill
This tutorial discusses one of the options for someone looking to add a rich text editor to their own site, the open source JavaScript library Quill.js. Quill is an extremely flexible and versatile WYSIWYG editor, providing options for text styling(size, bold, italics, underlines, etc.), alignment, lists, tables, and much more, all wrapped up in a clean UI. It is highly customizable to the developers needs as well, with many options for extending the functionality of the editor. Next up, a tutorial on how to integrate a Quill.js editor into your application.

## Setup Environment 
We will be using mostly JavaScript and HTML here to demonstrate, so it is assumed that you have some basic knowledge of both. Any method you have to view/serve your files will be good. In this tutorial we will use an express.js server to show our main html file(and the static js file that it links to). Besides what we show here, [this](https://medium.com/@naveednadaf/quick-node-express-js-project-setup-guide-88cd4d9a7af3) is another quick tutorial on how to set up an express server that goes over pretty much everything you'll need for this, from installation to routing. 

The first thing you'll need to do is generate your folder and enter it. Then initialize the node project

```
npm init
```

Once everything is installed, add express to the project. 
```
npm install express
```
At this point, you can generate your server file. Name it whatever you like, but if you name it something other than "index.js", make sure to go into the package.json file and change "main" from "index.js" to whatever your file name is. We used "app.js". 

Now that you have entered your file(henceforth, we will just call it app.js), you can do some setup.

```
const express = require('express');
const app = express();
const path = require('path');

const port = 5117
```

For storing static files such as CSS and JavaScript, we will use a folder called "resources". We will use the express static middleware to serve these files. 

```
// absolute path for the directories holding the files that are needed
const resources_dir = path.join(__dirname, 'resources');
app.use(express.static(resources_dir));
```

We will store the HTML in a folder called 'html'. For this tutorial, we will use one file "basic.html" from this folder. Lets setup a route serving this file. For now now basic.html can just be a basic template file, though we will be needing it later.

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset = "utf-8">
        <title> Template </title>
    </head>

    <body>
    </body>
</html>
```

Now add a route which serves this file as well as a listener. 

```
app.get('/', (req, res) => {
    res.sendFile((path.join(html_dir, 'basic.html')));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
```

Now we are done with the setup! From here on out everything will be focused on Quill. 

## Setting Quill Up
The first thing you'll need is to add to the html. Nothing needs to be in the body(yet), but we should add some links to the head. Specifically, links to the stylesheet for the Quill editor and the Quill library itself. 

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset = "utf-8">
        <title> Template </title>
        <link href="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.snow.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.js"></script>
    </head>

    <body>

    </body>
    
</html>
```

To actually add the Quill editor onto your page, the first thing you need to do is add a DOM element which will contain it, and some id to help with actually using that element. So in your body, add a div with the id "editing". 

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title> Quill Js</title>
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.snow.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.js"></script>
  </head>

  <body>

    <div id="editing"> </div>
    
  </body>
</html>
```

At this point, there is a choice between just using inline JavaScript to initialize the editor or using a separate JavaScript file and linking it in our html. For this tutorial, we will show how to use Quill with the use a separate file. The code is pretty much the same for inline use as well. 

In the new JavaScript file, we can initialize the editor like this

```
const quill = new Quill('#editing', {
    theme: 'snow'
  });
```

Make sure when you link to the JavaScript file, to do it after the container was initialized. If you don't, the console will throw an error, since the container won't have been rendered yet. Now, your JavaScript file should look like the above code box, and your HTML should look something like 

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title> Quill Js</title>
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.snow.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.0-rc.5/dist/quill.js"></script>
    
  </head>
  <body>
    <div id="editing">
    </div>
    <script src="quill_tutorial.js"></script>
  </body>

</html>
```

After this, just add some quick CSS to center it horizontally on the page, make the borders more clear, and limit its width a bit. If you also do it in a separate file, make sure to link it in your html with something like 

```
body{
    justify-content: center;
    text-align: center;
}

#editor_container{
    width: 60%;
    margin: auto;
    margin-bottom: 10px;
    padding: 0px;
    border: 2px solid rgb(0, 0, 0);
}

#editing{
    height: 30vh;
    width: auto;
    display: block;
    background-color: white;
    border-top: 2px solid rgb(0, 0, 0);
}
```

Now, when you look at what this HTML displays, you should see a basic Quill editor. Congrats!

![](/images/image_11.png?raw=true)

## Customization
At this point we now have a Quill editor on our page. The next objective is to add more customization to it. Luckily, Quill makes this fairly simple through the use of modules, specifically a toolbar.

You can generate a toolbar to be used when intializing the editor. Before you do the initialization, just make a new variable representing options you want to include. The toolbar is an array of arrays, in which each array represents some group of related items(which will also be grouped on the toolbar). 

So say for example, on top of what we had by default, we wish to add some more things to the toolbar. We can make it so the toolbar only contains the level 3 option for headers, along with strikethroughs and subscript/superscripts. Lets also add in some more default fonts, a color option, and a button which will clean all formatting off the text. To do this, we can initialize the toolbar like so. 

```
const toolbarContainer = [
  [{'header': ['3',false]}],
  [{'font': []}],
  [{'color': []}],
  ['bold', 'italic', 'underline', 'strike'],
  [{'align': ['', 'center', 'right', 'justify']}],
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  ['clean']
];
```

Some things to note
- Giving options for something as an empty array such as '[]' will just give the default options for the toolbar.
- Items with more complex options associated with them, such as list types or alignments, are represented by objects or nested arrays. 
- More simple items such as text formatting or single options like the clean option are just strings in their arrays. 
- To override the default settings for something, just set the final item of the array as false. This can be seen with the header option here, where the default settings are overriden and only level 3 headers are included.

After generating the toolbar, alter the Quill editor to include it as a module. 

```
const quill = new Quill('#editing', {
    modules : {
      toolbar: toolbarContainer
    },
    theme: 'snow'
  });
```

Now there are more options available on the toolbar. 
![](/images/image_12.png?raw=true)

## Using the Data

At this point you might be wondering how to actually use the data from the editor. You have a couple of options for this. 

### Delta 
In general, you will need to extract the data first. Data in Quill is represented through delta objects, which represent the formatted text through JSON. This is a JSON string version of a delta object that represents a single bolded word.

```
{"ops":[{"attributes":{"bold":true},"insert":"Quilljs bolded"},{"insert":"\n"}]}
```

You might not necessarily need to interact with delta objects to use content. To show an example of how to deal with data from the editor, we'll add a button in the html and an event listener in our JavaScript which will indicate content submission. 

The html body now looks like this. 

```
<body>
    <div id="editor_container">
      <div id="editing">
      </div>
    </div>
    <button id="submit_button"> Submit Content </button>
    <script src="quill_tutorial.js"></script>
  </body>
```

The event listener looks like this. You can get the current contents of the Quill editor by doing a call on the getContents() function for the object.

```
const submit_button = document.getElementById("submit_button")

submit_button.addEventListener('click', function (){
  const quillContent = quill.getContents();
  // do something with the contents(parse, send to server...)
})
```

### HTML
At this point, you now have the delta version of the editor contents. You now have a couple of choices, namely parse the delta object into whatever form is right for you, or simply get the html. The latter option will most likely require some manual parsing and might take more effort, as there are many cases to cover. However it is very flexible if done correctly. The second option is to completely forsake getting the delta objects and just get the HTML. This can be done with the following command

```
const quillHtml = quill.getSemanticHtml()
```

At this point the HTML equivalent of the editor contents are stored in the quillHtml variable! This is more simple than parsing the delta object.

**Warning:** Be sure to sanitize the html before putting it in use! You can do this after sending the data to the server. Specifically, make sure users don't input <script></script> or other malicious elements anywhere in the HTML. This is to help prevent any XSS attacks so your website stays safe and secure. In a lot of places, this There are many libraries to help with this, including [this](https://www.npmjs.com/package/sanitize-html) library for node and [this](https://pypi.org/project/html-sanitizer/) for python. Sanitizers usually do their jobs with a mixture of removing, escaping, and encoding potentially malicious elements in html.

### Using Both
If you're stuck deciding between whether to store HTML or delta objects, you can just use both. One of the biggest use cases for this would be in editing scenarios, where you want to take in previous content and display it in the editor again so the user can alter it. This can be done by sending both HTML and delta objects to the server. Then, when you want to display the data, just use the HTML, and when you want to show the editor again with specific content in it, you can load the delta object in. Loading delta objects into a quill editor can be done with the setContents() method. Say for example we wanted to set the contents of the editor to the bolded "Quilljs bolded" string we had earlier. We would just call setContents with the delta object, and the editor contents would be replaced.

```
quill.setContents({"ops":[{"attributes":{"bold":true},"insert":"Quilljs bolded"},{"insert":"\n"}]})
```

### Saving/Loading the Data
Now that we know how to get the data from the editor, we should consider how to send it to the server. One possible way to do so is through the use of a POST request, assuming you have an endpoint in your server for it. Say we had an endpoint /addcontent which would insert the content into some kind of data storage. We could do a fetch to that endpoint with the data as the body, stored in something like a JSON or FormData object. 

For the editing scenario we just went over, you would most likely want to do something similar. Say we have a scenario in which some kind of article has an edit button. To make the edit button effective, we can query the data storage with fetch and generate the Quill editor on the click of the button, then use quill.setContents(delta) to load in the data from the delta onto the editor. 

### Images
By default, when the image option is added to the toolbar(with ['image']), it will take in links from a textbox. Then, it will add an img element with the source being the link given. With this approach, images are also just part of the basic HTML/Delta contents.  

![](/images/image_13.png?raw=true)

If you want a different behavior, such as adding images through upload, you can directly alter the behavior of the toolbar itself by adding a handler. To add a handler, write a function first which will cover the case you want it to. So for images, maybe something like this

```

function imageHandler(){
  console.log("In image handler")
  let input = document.createElement('input')
  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')

  input.addEventListener('change', function(event){
    // handle image here
    // perhaps send to server, or contents in a variable to send to server upon submit along with other editor contents

  })

  input.click();

}
```
This handler will first generate an input element for files that only accepts images. Then, it adds an event listener to handle any changes that are done to the input element. That is where you can process the image or do whatever you wish with it. Finally, an input.click() will essentially simulate clicking on the input element, which is what will actually open up the file explorer or equivalent. 

Now that we have a function, we can change the behavior of the image button with 2 lines of JavaScript. 

```
const toolbar = quill.getModule('toolbar');
toolbar.addHandler('image', imageHandler);
```
This will replace the original handler for clicking the image button with the custom one we just made.

## Conclusion
Overall, if you're looking for a rich text editor to add to your site, Quill is a great solution. It offers both flexibility and power in a simple box. There's still several things you can do with it that we haven't covered in this tutorial, so make sure to keep an eye out on the links in the reference section. All the code used for this tutorial is present in this github. Thanks for reading.

## References and Links to More Info
[API Documentation](https://quilljs.com/docs/api)  
[Quickstart](https://quilljs.com/docs/quickstart/)  
[More Customization](https://quilljs.com/guides/how-to-customize-quill/)  
[Toolbars](https://quilljs.com/docs/modules/toolbar/)  
