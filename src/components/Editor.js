import React, { useEffect } from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = () => {

    return <ReactQuill theme="snow" style={{"color":"white","font-size":"20px"}} />;
}

export default Editor
