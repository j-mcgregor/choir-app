import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
  deleteManyMembers
} from '../../actions/memberActions';
import MemberRow from './MemberRow';
import './Members.scss';
import genKey from '../../utils/genKey';

const MembersContainer = () => {
  const dispatch = useDispatch();

  const { membersList } = useSelector(
    state => ({
      membersList: state.members
    }),
    shallowEqual
  );

  const { members, errors } = membersList;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getMembers());
  }, [dispatch]);

  useEffect(() => {
    console.log('updated');
  }, [membersList]);

  const handleSelect = id => {
    if (selected.includes(id)) {
      const currentSelected = selected.filter(s => s !== id);
      setSelected(currentSelected);
    } else {
      const currentSelected = [...selected];
      currentSelected.push(id);
      setSelected(currentSelected);
    }
  };

  const handleChangeName = e => setName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);

  const handleAddMember = () => {
    const newMember = { name, email };
    dispatch(createMember(newMember, window.location));
  };

  const handleDelete = id => {
    dispatch(deleteMember(id, window.location));
  };

  const handleDeleteMany = () => {
    dispatch(deleteManyMembers(selected, window.location));
  };

  const handleUpdate = (id, updatedMember) => {
    dispatch(updateMember(id, updatedMember));
  };

  const handleSendEmail = () => {
    const recipients = members.filter(m => selected.find(s => m._id === s));
    const el = document.createElement('a');
    el.setAttribute('href', `mailto:${recipients.map(r => r.email)}`);
    el.click();
  };

  const handleSelectAll = () => {
    if (selected.length === members.length) {
      setSelected([]);
    } else {
      const allIds = members.map(m => m._id);
      setSelected(allIds);
    }
  };

  return (
    <div className="container members-container">
      <div className="col s12">
        <h5>Members</h5>
        <hr style={{ margin: '3rem 0' }} />
      </div>
      <div className="col s12">
        <div className="row">
          <div className="input-field col s4">
            <input
              placeholder="Name"
              id="name"
              type="text"
              className={`validate ${errors && errors.name ? 'invalid' : ''}`}
              onChange={handleChangeName}
              value={name}
            />
            <label htmlFor="name">Name</label>
            {errors && errors.name && (
              <small className="red-text">{errors.name}</small>
            )}
          </div>
          <div className="input-field col s4">
            <input
              id="email"
              type="email"
              className={`validate ${errors && errors.email ? 'invalid' : ''}`}
              onChange={handleChangeEmail}
              value={email}
            />
            <label htmlFor="email">Email</label>
            {errors && errors.email && (
              <small className="red-text">{errors.email}</small>
            )}
          </div>
          <div className="input-field col s4">
            <button
              type="button"
              onClick={handleAddMember}
              className="waves-effect waves-light btn"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
      <div className="options-container">
        <div className="row">
          <div className="col s8">
            {selected && selected.length ? (
              <span>
                {selected.length}{' '}
                {selected.length === 1 ? 'member selected' : 'members selected'}
              </span>
            ) : (
              'Select member(s)'
            )}
          </div>
          <div className="col s4">
            <button
              className="btn mr-1"
              disabled={!selected.length}
              onClick={handleDeleteMany}
            >
              <FontAwesomeIcon icon={faTrash} className="icon" />
            </button>
            <button
              className="btn"
              disabled={!selected.length}
              onClick={handleSendEmail}
            >
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
            </button>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selected.length > 1 && selected.length === members.length
                  }
                />
                <span></span>
              </label>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members && members.length ? (
            members.map((m, i) => {
              return (
                <MemberRow
                  key={genKey(m.name, i)}
                  member={m}
                  handleSelect={handleSelect}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  selected={selected}
                />
              );
            })
          ) : (
            <tr>
              <td>No members</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MembersContainer;
