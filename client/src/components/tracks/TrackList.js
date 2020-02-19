import React from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import { deleteFile, getFiles } from '../../actions/fileActions';
import genKey from '../../utils/genKey';
import Spinner from '../shared/Spinner';

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

  const handleDownload = async (id, filename) => {
    try {
      const response = await axios.get(`/api/files/download/${id}`, {
        responseType: 'blob'
      });
      FileSaver.saveAs(response.data, `${filename}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Track</th>
            <th>Description</th>
            <th>Type</th>
            <th>Player</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files && files.length ? (
            files.map((f, i) => {
              const { metadata } = f;
              return (
                <tr key={genKey(f.filename, i)}>
                  <td>{f.filename}</td>
                  <td>{metadata.description || ''}</td>
                  <td>{metadata.trackType || ''}</td>
                  <td style={{ minWidth: '200px' }}>
                    <ReactPlayer
                      url={`/api/files/stream/${f._id}`}
                      controls
                      height="30px"
                      width="100%"
                      config={{
                        file: {
                          forceAudio: true,
                          attributes: {
                            nodownload: 'true'
                          }
                        }
                      }}
                    />
                  </td>
                  <td>
                    <button className="btn-floating mr-sm" onClick={() => handleCopy(f._id)}>
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button
                      className="btn-floating mr-sm lime accent-2"
                      onClick={() => handleDownload(f._id, f.filename)}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </button>
                    {isAuthenticated ? (
                      <button className="btn-floating mr-sm red accent-2" onClick={() => handleDelete(f._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2">{files.length === 0 ? 'No tracks' : <Spinner />}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
