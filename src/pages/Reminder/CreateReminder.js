import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
  Input,
  InputLabel,
} from '@mui/material';

const CreateReminder = () => {
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    uploadImage: false,
    uploadVideo: false,
    image: null,
    video: null,
  });

  const [openForm, setOpenForm] = useState(true); // State to control form visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is a date or time field
    if (name === 'startTime' || name === 'endTime') {
      // Format the time to HH:mm
      const formattedTime = value.replace('T', ' ').substring(0, 16);

      setFormData({
        ...formData,
        [name]: formattedTime,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleVideoChange = (e) => {
    setFormData({
      ...formData,
      video: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('startTime', formData.startTime);
    formDataToSend.append('endTime', formData.endTime);

    if (formData.uploadImage) {
      formDataToSend.append('image', formData.image);
    }

    if (formData.uploadVideo) {
      formDataToSend.append('video', formData.video);
    }

    try {
      const response = await axios.post(
        'https://gocarsmithbackend.onrender.com/api/admin/createReminder',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Reminder created:', response.data);
      window.alert('Successful');

      // Close the form after successful submission
      setOpenForm(false);
    } catch (error) {
      console.error('Error creating reminder:', error.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {openForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            width: '500px',
            margin: '20px',
          }}
        >
          <TextField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextareaAutosize
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rowsMin={3}
            placeholder="Description"
            style={{ width: '100%', margin: '10px 0', padding: '15px' }}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '10px' }}
          />
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="uploadImage"
                  checked={formData.uploadImage}
                  onChange={handleCheckboxChange}
                />
              }
              label="Upload Image"
            />
            {formData.uploadImage && (
              <>
                <InputLabel>Image:</InputLabel>
                <Input type="file" accept="image/*" name="image" onChange={handleImageChange} />
              </>
            )}
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  name="uploadVideo"
                  checked={formData.uploadVideo}
                  onChange={handleCheckboxChange}
                />
              }
              label="Upload Video"
            />
            {formData.uploadVideo && (
              <>
                <InputLabel>Video:</InputLabel>
                <Input type="file" accept="video/*" name="video" onChange={handleVideoChange} />
              </>
            )}
          </FormGroup>
          <button type="submit" variant="contained" className="create_button">
            Create Reminder
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateReminder;