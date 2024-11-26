import React, { useState } from 'react';
import './Modal.css';

function Modal({ show, onClose, onSave, careRequest }) {
  const [editedCareRequest, setEditedCareRequest] = useState({ ...careRequest });

  if (!show) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCareRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedCareRequest);
    onClose(); // Close the modal after saving
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Care Request</h2>
        
        {/* Comment */}
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            value={editedCareRequest.comment}
            onChange={handleInputChange}
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>

        {/* Special Cares */}
        <div>
          <label htmlFor="specialCares">Special Cares:</label>
          <textarea
            name="specialCares"
            value={editedCareRequest.pet.specialCares}
            onChange={handleInputChange}
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>

        {/* Dates */}
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={editedCareRequest.startDate.split('T')[0]} // Extract date part
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>

        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            name="endDate"
            value={editedCareRequest.endDate.split('T')[0]} // Extract date part
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
          />
        </div>

        {/* Save and Cancel buttons */}
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default Modal