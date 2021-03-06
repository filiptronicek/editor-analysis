# Editor analysis
**A text editor, with a little bit of AI**

It uses the [Azure Analytics AI module](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) 

If you're into that, check out the blog post on [studuj.digital](https://studuj.digital/2021/01/03/jak-naprogramovat-aplikaci-ktera-vyhleda-klicovy-obsah-textu/), which has a tutorial on how to do this yourself.

## Setup
Before anything, make sure you have your Azure keys in creds.js as the variables ```endpoint``` and ```key```

Example of `creds.js`:
```js
const creds = {
    key: "Your_key",
    endpoint: "Your_endpoint"
}
```

1. clone the repo with ```git clone https://github.com/MicrosoftSTC/ai-editor/```
2. install the dependencies with ```npm i```
3. start the server with ```npm start```, and you are all set
