<<<<<<< HEAD
=======
import React, { useState } from 'react';
import AWS from 'aws-sdk';

function TestPage() {
  const [selectedFiles, setSelectedFiles] = useState({})
  const [uploadProg, setUploadProg] = useState([])


   const handleFile = event => {
      setSelectedFiles(event?.target?.files)
      setUploadProg(new Array(Object.keys(event?.target?.files).length).fill(0))
   }

   const upload = event => {
     Object.keys(selectedFiles).forEach((key, index) => {
      console.log(key)
      console.log(selectedFiles[key])
      var params = {
        Body: selectedFiles[key], 
        Bucket: 'socialmedia-posts', 
        Key: `exampleobject${index}`, 
       };

       s3.putObject(params)
        .on('httpUploadProgress', (progressEvent, response) => {
          const newUploadProg = [...uploadProg]
          const percent = parseInt(100*progressEvent.loaded / progressEvent.total)
          newUploadProg[index] = percent
          console.log(uploadProg)
          console.log(newUploadProg)
          console.log('______________')
          setUploadProg(newUploadProg)
        })
        .send((err, data) => {
          if (err) console.log(err, err.stack);
          else     console.log(data);
         })
    })  
   }

  return (
    <div className="App">
      <header className="App-header">
        <img src="" className="App-logo" alt="logo" />
        <input type="file" name="file" onChange={handleFile} multiple/>
        <button type="button" class="btn btn-success btn-block" onClick={upload}>Upload</button>
        {uploadProg.map(percent => (<div style={{
          margin: 5,
          width: 100,
          height: 10,
          backgroundColor: 'green'
        }}>
          <div style={{
            height: 8,
            width: percent,
            backgroundColor: 'yellow',
          }}>
          </div>
        </div>))}
      </header>
    </div>
  );
}

export default TestPage;
>>>>>>> 27e86aa726cc763f956b4dd755fa0fd080031df1
