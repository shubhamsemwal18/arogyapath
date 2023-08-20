import {Editor} from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from "react";
import {EditorState, convertToRaw} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useEffect } from "react";

function index(props) {

    var stateFromHTML = require('draft-js-import-html').stateFromHTML;
    let contentState = stateFromHTML(props.intialValue);
    
    useEffect(()=>{
        setEditorState(EditorState.createWithContent(contentState))
    },[])

    const [editorState, setEditorState] = useState()
      

    let handleChange =(value)=>{
        setEditorState(value)
        props.editorchange(draftToHtml(convertToRaw(value.getCurrentContent())), props.id)
    }

    // function uploadImageCallBack(file) {
    //     return new Promise(
    //       (resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.open('POST', 'https://api.imgur.com/3/image');
    //         xhr.setRequestHeader('Authorization', 'Client-ID c166b3ccc22b789');
    //         const data = new FormData();
    //         data.append('image', file);
    //         xhr.send(data);
    //         xhr.addEventListener('load', () => {
    //           const response = JSON.parse(xhr.responseText);
    //           console.log(response)
    //           resolve(response);
    //         });
    //         xhr.addEventListener('error', () => {
    //           const error = JSON.parse(xhr.responseText);
    //           console.log(error)
    //           reject(error);
    //         });
    //       }
    //     );
    //   }

  return (
    <div>
        <Editor
        wrapperClassName="common-border-box"
        editorState={editorState}  
        onEditorStateChange={handleChange}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign'],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image : { inDropdown : false},
          // image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
        }}
      />
    </div>
  )
}

export default index