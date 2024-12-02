// Dashboard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    deleteObject
  } from "firebase/storage";
import { storage } from "../firebase";
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const [imageUploads, setImageUploads] = useState([]); // Array for multiple images
    const [audioUpload, setAudioUpload] = useState(null); // Single audio file    
    const [fileUrls, setFileUrls] = useState([]); // Store URLs for both images and audio
    const [uploadStatus, setUploadStatus] = useState(''); // 'loading', 'success', 'error', or ''

    const imagesListRef = ref(storage, `user_data/${currentUser?.uid}/images/`);

    // const userFolderRef = ref(storage, `user_data/${currentUser?.uid}`);
    // const audiosListRef = ref(storage, `user_data/${currentUser?.uid}/audios`);
    // const [uploadStatus, setUploadStatus] = useState('');

    // const uploadFile = () => {
    //     if (imageUpload == null) return;

    //     setUploadStatus('loading'); // Start loading indicator
    //     const imageRef = ref(storage, `user_data/${currentUser.uid}/images/${imageUpload.name + uuidv4()}`);
    //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //       getDownloadURL(snapshot.ref).then((url) => {
    //         setImageUrls((prev) => [...prev, url]);
    //          setUploadStatus('success'); // Set success status
    //       });
    //     })
    //     .catch(() => setUploadStatus('error')); // Error handling
    //   };
    const uploadFiles = () => {
        if (imageUploads.length === 0 || !audioUpload || !currentUser?.uid) return;
      
        setUploadStatus('loading');
        
        // Prepare files to upload (all images + single audio)
        const filesToUpload = [
          ...imageUploads.map((file) => ({ file, folder: 'images', type: 'image' })),
          { file: audioUpload, folder: 'audios', type: 'audio' }
        ];
      
        // Map over files and upload each
        const uploadPromises = filesToUpload.map(({ file, folder }) => {
          const filePath = `user_data/${currentUser.uid}/${folder}/${file.name + uuidv4()}`;
          const fileRef = ref(storage, filePath);
      
          return uploadBytes(fileRef, file).then((snapshot) =>
            getDownloadURL(snapshot.ref).then((url) => {
              setFileUrls((prev) => [...prev, url]);
              return url; // added
            })
          );
        });
      
        Promise.all(uploadPromises)
        .then(() => setUploadStatus('success'))
        .catch(() => setUploadStatus('error'));
      };
      
      // Function to list all files in storage
      const fetchUploadedFiles = () => {
        if (!currentUser?.uid) return;

        const imageRef = ref(storage, `user_data/${currentUser.uid}/images`);
        const audioRef = ref(storage, `user_data/${currentUser.uid}/audios`);

        const listPromises = [imageRef, audioRef].map((folderRef, index) =>
          listAll(folderRef).then((result) =>
            Promise.all(result.items.map((itemRef) =>
              getDownloadURL(itemRef).then((url) => ({ 
                url, 
                path : itemRef.fullPath, // added
                type: index === 0 ? 'image' : 'audio' 
              }))
            ))
          )
        );

        Promise.all(listPromises)
          .then((results) => setFileUrls(results.flat()))
          .catch((error) => console.error('Error fetching files:', error));
      };

      const deleteFile = (filePath) => {
        const fileRef = ref(storage, filePath);
        deleteObject(fileRef)
            .then(() => {
                setFileUrls((prev) => prev.filter((file) => file.path !== filePath));
            })
            .catch((error) => console.error('Error deleting file:', error));
      };

       // Fetch files on component mount
      useEffect(() => {
        fetchUploadedFiles();
      }, [currentUser]);


    return (
        // <div>
        //     <h1>Welcome to your Dashboard</h1>
        //     {
        //         currentUser ? (
        //         <p>Hello, {currentUser.email} !</p>
        //         ) : (
        //         <p>Loading...</p>
        //         )
        //     }
        //      <div>
        //         {/* Multiple image input */}
        //         <div>
        //             <h4>Upload two images</h4>
        //             <input 
        //             type="file" 
        //             accept="image/*" 
        //             multiple 
        //             onChange={(event) => setImageUploads(Array.from(event.target.files))}
        //             />
        //         </div>
        //         {/* Single audio input */}
        //         <br />
        //         <br />
        //         <div>
        //             <h4>Upload one audio file</h4>
        //             <input 
        //             type="file" 
        //             accept="audio/*" 
        //             onChange={(event) => setAudioUpload(event.target.files[0])}
        //             />
        //         </div>
        //         <br />
        //         <br />
        //         <button onClick={uploadFiles}>Upload Files</button>

        //         {/* Status messages */}
        //         {uploadStatus === 'loading' && <p>Uploading...</p>}
        //         {uploadStatus === 'success' && <p>Files uploaded successfully!</p>}
        //         {uploadStatus === 'error' && <p>Failed to upload files.</p>}

        //         {/* Display uploaded files */}
        //         <div>
        //           <h3>Uploaded Files:</h3>
        //           {/* Display images */}
        //           {fileUrls.filter(({ type }) => type === 'image').map(({ url }, index) => (
        //             <img key={index} src={url} alt={`Uploaded ${index}`} style={{ width: '200px', margin: '10px' }} />
        //           ))}

        //           {/* Display audio files */}
        //           {fileUrls.filter(({ type }) => type === 'audio').map(({ url }, index) => (
        //             <audio key={index} controls src={url} style={{ display: 'block', margin: '10px' }} />
        //           ))}
        //       </div>
        //     </div>
        // </div>


        // <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
        //     <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your Dashboard</h1>
        //     {currentUser ? (
        //         <p className="text-gray-600">Hello, {currentUser.email}!</p>
        //     ) : (
        //         <p className="text-gray-600">Loading...</p>
        //     )}

        //     <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mt-6">
        //         <div>
        //             <h4 className="font-semibold text-gray-700">Upload Images</h4>
        //             <input 
        //                 type="file" 
        //                 accept="image/*" 
        //                 multiple 
        //                 onChange={(event) => setImageUploads(Array.from(event.target.files))}
        //                 className="w-full mt-2 p-2 border border-gray-300 rounded-md"
        //             />
        //         </div>
        //         <div className="mt-4">
        //             <h4 className="font-semibold text-gray-700">Upload Audio File</h4>
        //             <input 
        //                 type="file" 
        //                 accept="audio/*" 
        //                 onChange={(event) => setAudioUpload(event.target.files[0])}
        //                 className="w-full mt-2 p-2 border border-gray-300 rounded-md"
        //             />
        //         </div>
        //         <button 
        //             onClick={uploadFiles} 
        //             className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md"
        //         >
        //             Upload Files
        //         </button>

        //         {/* Status messages */}
        //         {uploadStatus === 'loading' && <p className="text-yellow-500 mt-2">Uploading...</p>}
        //         {uploadStatus === 'success' && <p className="text-green-500 mt-2">Files uploaded successfully!</p>}
        //         {uploadStatus === 'error' && <p className="text-red-500 mt-2">Failed to upload files.</p>}
        //     </div>

        //     {/* <div className="w-full max-w-md mt-8">
        //         <h3 className="text-lg font-semibold text-gray-700">Uploaded Files:</h3>
        //         <div className="grid grid-cols-1 gap-4 mt-4">
        //             {fileUrls.filter(({ type }) => type === 'image').map(({ url }, index) => (
        //                 <img key={index} src={url} alt={`Uploaded ${index}`} className="w-full rounded-lg shadow-md" />
        //             ))}
        //             {fileUrls.filter(({ type }) => type === 'audio').map(({ url }, index) => (
        //                 <audio key={index} controls src={url} className="w-full mt-2 rounded-md border border-gray-300" />
        //             ))}
        //         </div>
        //     </div>
        //      */}
        //      <div className="mt-6">
        //         <h3 className="text-2xl font-semibold">Uploaded Files:</h3>
        //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        //             {fileUrls.map(({ url, path, type }, index) => (
        //                 <div key={index} className="bg-white shadow-md p-4 rounded-lg">
        //                     {type === 'image' ? (
        //                         <img src={url} alt={`Uploaded ${index}`} className="w-full h-40 object-cover rounded" />
        //                     ) : (
        //                         <audio controls src={url} className="w-full mt-2"></audio>
        //                     )}
        //                     <button
        //                         onClick={() => deleteFile(path)}
        //                         className="px-3 py-1 bg-red-500 text-white rounded mt-2 w-full"
        //                     >
        //                         Remove
        //                     </button>
        //                 </div>
        //             ))}
        //         </div>
        //       </div>
        // </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      {currentUser ? (
        <p className="text-gray-400">Hello, {currentUser.email}!</p>
      ) : (
        <p className="text-gray-400">Loading...</p>
      )}

      <div className="w-full max-w-lg bg-gray-800 shadow-md rounded-lg p-6 mt-6">
        <div>
          <h4 className="font-semibold text-gray-200">Upload Images</h4>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(event) => setImageUploads(Array.from(event.target.files))}
            className="w-full mt-2 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>
        <div className="mt-4">
          <h4 className="font-semibold text-gray-200">Upload Audio File</h4>
          <input
            type="file"
            accept="audio/*"
            onChange={(event) => setAudioUpload(event.target.files[0])}
            className="w-full mt-2 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
          />
        </div>
        <button
          onClick={uploadFiles}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md"
        >
          Upload Files
        </button>

        {/* Status messages */}
        {uploadStatus === 'loading' && <p className="text-yellow-400 mt-2">Uploading...</p>}
        {uploadStatus === 'success' && <p className="text-green-400 mt-2">Files uploaded successfully!</p>}
        {uploadStatus === 'error' && <p className="text-red-400 mt-2">Failed to upload files.</p>}
      </div>

      <div className="mt-6 w-full max-w-lg">
        <h3 className="text-lg font-semibold">Uploaded Files:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {fileUrls.map(({ url, path, type }, index) => (
            // <div key={index} className="bg-gray-800 shadow-md p-4 rounded-lg">
            //   {type === 'image' ? (
            //     <img src={url} alt={`Uploaded ${index}`} className="w-full h-40 object-cover rounded" />
            //   ) : (
            //     <audio controls src={url} className="w-full mt-2 rounded-md border border-gray-600"></audio>
            //   )}
            //   <button
            //     onClick={() => deleteFile(path)}
            //     className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded mt-2 w-full"
            //   >
            //     Remove
            //   </button>
            // </div>
            <div key={index} className="bg-gray-800 shadow-md p-4 rounded-lg">
        {type === 'image' ? (
          <div className="relative">
            <img src={url} alt={`Uploaded ${index}`} className="w-full h-40 object-cover rounded" />
            <button
              onClick={() => deleteFile(path)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ) : type === 'audio' ? (
          <div>
            <audio controls src={url} className="w-full mt-2"></audio>
            <button
              onClick={() => deleteFile(path)}
              className="px-3 py-1 bg-red-500 text-white rounded mt-2 w-full"
            >
              Remove
            </button>
          </div>
        ) : null} {/* Handle cases where type is neither image nor audio */}
      </div>
          ))}
        </div>
      </div>
    </div>
    );
};

export default Dashboard;