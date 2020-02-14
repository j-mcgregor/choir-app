import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { deleteFile, getFiles } from '../../actions/fileActions';
import genKey from '../../utils/genKey';

const TrackList = ({ files, isAuthenticated }) => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    let headers = {
      Authorization: localStorage.getItem('token') || ''
    };

    dispatch(deleteFile(id, headers, getFiles));
  };

  const handleCopy = id => {
    let tempEle = document.createElement('input');
    tempEle.value = `${window.location.host}/api/files/stream/${id}`;
    document.body.appendChild(tempEle);
    tempEle.select();
    document.execCommand('copy');
    document.body.removeChild(tempEle);
  };

  const handleDownload = async id => {
    try {
      const response = await axios.get(`/api/files/download/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4 className="left-align">
        Tracks {files && files.length ? `: ${files.length}` : ''}
      </h4>

      {files && files.length
        ? files.map((f, i) => {
            return (
              <div className="player-container" key={genKey(f.filename, i)}>
                <div className="row">
                  <div className="col s9">
                    <label>{f.filename}</label>
                  </div>
                  <div className="col s3"></div>
                </div>
                <div className="row">
                  <div className="col s8 player">
                    <ReactPlayer
                      url={`/api/files/stream/${f._id}`}
                      controls
                      height="30px"
                      width="100%"
                      style={{ marginBottom: '10px' }}
                      config={{
                        file: {
                          forceAudio: true
                        }
                      }}
                    />
                  </div>
                  <div className="col s3">
                    <button
                      className="btn-floating mr-sm"
                      onClick={() => handleCopy(f._id)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                      className="btn-floating mr-sm"
                      onClick={() => handleDownload(f._id)}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                    {isAuthenticated ? (
                      <button
                        className="btn-floating mr-sm red accent-2"
                        onClick={() => handleDelete(f._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : ''}
    </div>
  );
};

export default TrackList;
