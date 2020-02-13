import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../actions/fileActions';
import Dropzone from 'react-dropzone';
import FileBox from './fileBox/FileBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './Upload.scss';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  const { filesLoading } = useSelector(state => ({
    filesLoading: state.files.loading
  }));

  const dispatch = useDispatch();

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmitFiles = async e => {
    e.target.value = 'Uploading...';
    e.preventDefault();

    const headers = {
      Type: 'formData',
      Authorization: localStorage.getItem('token') || '',
      UploadDescription: description
    };

    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
    });

    dispatch(uploadFiles(formData, headers));
  };

  const handleOnDrop = files => {
    setFiles(files);
  };

  const handleOnRemove = (e, i) => {
    e.preventDefault();
    e.stopPropagation(); //prevent clicking outer div
    let tempFiles = [...files];
    tempFiles.splice(i, 1);
    setFiles(tempFiles);
  };

  return (
    <div className="container upload-container">
      <h2>Upload your files</h2>
      <form onSubmit={handleSubmitFiles} encType="multipart/form-data">
        <Dropzone onDrop={handleOnDrop}>
          {({ getRootProps, getInputProps }) => {
            return (
              <section>
                <div className="dropzone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  {files.length
                    ? files.map((f, i) => (
                        <FileBox
                          key={f.name}
                          fileName={f.name}
                          size={f.size}
                          onRemove={handleOnRemove}
                          index={i}
                        />
                      ))
                    : ''}
                </div>
              </section>
            );
          }}
        </Dropzone>
        <div className="row space-between">
          <div className="input-field col s6">
            <input
              maxLength="30"
              placeholder="Describe your upload... (30 chars)"
              type="text"
              onChange={handleChangeDescription}
            />
          </div>
          <div className="input-field col s3">
            <button
              type="submit"
              className="btn waves-effect waves-light hoverable"
              disabled={filesLoading}
            >
              <FontAwesomeIcon icon={faUpload} className="mr-1" />
              {filesLoading ? 'Uploading' : 'Upload'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;

{
  /* <Dropzone handleOnDrop={handleOnDrop.bind(this)} className="dropzone">
  {files && files.length === 0 ? (
    <p>
      Try dropping some files here, or click to select files to upload.
    </p>
  ) : (
    <div>
      {files.map((f, index) => (
        <FileBox
          key={f.name}
          fileName={f.name}
          size={f.size}
          handleOnRemove={handleOnRemove}
          index={index}
        />
      ))}
    </div>
  )}
</Dropzone> */
}
