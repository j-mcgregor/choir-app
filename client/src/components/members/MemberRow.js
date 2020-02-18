import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';

export default function MemberRow({
  member,
  handleSelect,
  handleDelete,
  handleUpdate,
  selected
}) {
  const { _id, name, email } = member;
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editEmail, setEditEmail] = useState(email);

  const canSave = name !== editName || email !== editEmail;

  const handleToggleEdit = () => setIsEdit(!isEdit);
  const handleChangeName = e => setEditName(e.target.value);
  const handleChangeEmail = e => setEditEmail(e.target.value);

  const handleUpdateMember = () => {
    handleUpdate(_id, { name: editName, email: editEmail });
    setIsEdit(false);
  };

  return (
    <tr>
      <td width="80">
        <label>
          <input
            type="checkbox"
            onChange={() => handleSelect(_id)}
            checked={selected.includes(_id)}
          />
          <span></span>
        </label>
      </td>
      <td width="200">
        {isEdit ? (
          <input value={editName} onChange={handleChangeName} />
        ) : (
          editName
        )}
      </td>
      <td width="300">
        {isEdit ? (
          <input value={editEmail} onChange={handleChangeEmail} />
        ) : (
          editEmail
        )}
      </td>
      <td>
        <FontAwesomeIcon
          icon={faTrash}
          className="icon"
          onClick={() => handleDelete(_id)}
        />
        <FontAwesomeIcon
          icon={faEdit}
          className="icon"
          onClick={handleToggleEdit}
        />
        <button disabled={!isEdit || !canSave} className="save-btn">
          <FontAwesomeIcon
            icon={faSave}
            className="icon save"
            onClick={handleUpdateMember}
          />
        </button>
      </td>
    </tr>
  );
}
