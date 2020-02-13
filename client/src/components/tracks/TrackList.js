import React from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

import genKey from '../../utils/genKey';

const TrackList = ({ files, isAuthenticated }) => {
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
                      url={`/api/files/download/${f._id}`}
                      controls
                      height="40px"
                      width="100%"
                      style={{ marginBottom: '10px' }}
                    />
                  </div>
                  <div className="col s3">
                    <button className="btn-floating mr-sm">
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    {isAuthenticated ? (
                      <button className="btn-floating mr-sm red accent-2">
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
