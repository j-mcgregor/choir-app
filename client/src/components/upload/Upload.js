import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../../actions/fileActions';
import Spinner from '../shared/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import './Upload.scss';

const Upload = props => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [trackType, setTrackType] = useState('ALL');

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
      UploadDescription: description,
      TrackType: trackType
    };

    const formData = new FormData();

    files.forEach(file => {
      formData.append('files', file);
      formData.append('description', description);
      formData.append('trackType', trackType);
    });

    dispatch(uploadFiles(formData, headers, props.history));
  };

  const handleFile = e => {
    setFiles([...e.target.files]);
  };

  const handleTrackType = e => {
    setTrackType(e.target.value);
  };

  return (
    <div className="container upload-container">
      <h4>Upload your files</h4>
      <form onSubmit={handleSubmitFiles} encType="multipart/form-data">
        {filesLoading ? (
          <Spinner />
        ) : (
          <div>
            <div className="row">
              <div className="file-field input-field col s7">
                <div className="btn">
                  <span>File</span>
                  <input type="file" onChange={handleFile} multiple />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" />
                </div>
              </div>
              <div className="input-field col s5">
                <input
                  maxLength="30"
                  placeholder="Describe your upload... (30 chars)"
                  type="text"
                  onChange={handleChangeDescription}
                />
              </div>
            </div>
            <div className="row">
              <div className="col s12 space-between">
                <label>
                  <input
                    value="ALL"
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={handleTrackType}
                    checked={trackType === 'ALL'}
                  />
                  <span>All</span>
                </label>
                <label>
                  <input
                    value="SOPRANO"
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={handleTrackType}
                    checked={trackType === 'SOPRANO'}
                  />
                  <span>Soprano</span>
                </label>
                <label>
                  <input
                    value="ALTO"
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={handleTrackType}
                    checked={trackType === 'ALTO'}
                  />
                  <span>Alto</span>
                </label>
                <label>
                  <input
                    value="TENOR"
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={handleTrackType}
                    checked={trackType === 'TENOR'}
                  />
                  <span>Tenor</span>
                </label>
                <label>
                  <input
                    value="BASS"
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={handleTrackType}
                    checked={trackType === 'BASS'}
                  />
                  <span>Bass</span>
                </label>
                <label>
                  <input
                    value="RECORDINGS"
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={handleTrackType}
                    checked={trackType === 'RECORDINGS'}
                  />
                  <span>Recordings</span>
                </label>
              </div>
              <div className="input-field col s3">
                <button type="submit" className="btn waves-effect waves-light hoverable" disabled={filesLoading}>
                  <FontAwesomeIcon icon={faUpload} className="mr-1" />
                  {filesLoading ? 'Uploading' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Upload;
