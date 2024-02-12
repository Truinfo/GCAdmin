import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Paper,
  Button,
  Modal,
  TextField,
} from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
const EmailNotifications = () => {
  const [emailDetails, setEmailDetails] = useState([]);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState({ text: '', attachments: [] });
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  useEffect(() => {
    fetchEmailNotifications();
  }, []);
  const authenticate = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication token is missing');
      return null;
    }
    return token;
  };
  const fetchEmailNotifications = async () => {
    try {
      const token = authenticate();
      if (!token) {
        return;
      }
      const response = await axios.get('https://gocarsmithbackend.onrender.com/api/admin/getEmailNotifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmailDetails(response.data);
    } catch (error) {
      console.error('Error fetching email notifications:', error);
      setError('Error fetching email notifications');
    }
  };
  const openAttachment = async (attachment) => {
    const token = authenticate();
    if (!token) {
      return;
    }
    try {
      const { fileName } = attachment;
      window.open(`https://gocarsmithbackend.onrender.com/api/admin/attachments/${fileName}`, '_blank');
    } catch (error) {
      console.error('Error opening attachment:', error);
    }
  };
  const handleReply = (email) => {
    setSelectedEmail(email);
    setReplyModalOpen(true);
    // Initialize reply content with email details and empty attachments
    setReplyContent({
      text: '', // Set the initial reply text to an empty string
      attachments: [],
    });
  };
  const handleReplyModalClose = () => {
    setReplyModalOpen(false);
  };
  const handleSendReply = async () => {
    const token = authenticate();
    if (!token || !selectedEmail) {
      return;
    }
    try {
      // Implement the logic to send the reply using axios
      // You may need to create an API endpoint for sending replies
      // Example:
      const response = await axios.post(
        'https://gocarsmithbackend.onrender.com/api/admin/sendReply',
        {
          to: selectedEmail.from,
          subject: `Re: ${selectedEmail.subject}`,
          text: replyContent.text,
          attachments: replyContent.attachments,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //  Handle the response as needed
      //  Close the reply modal and reset the reply content
      setReplyModalOpen(false);
      setReplyContent({ text: '', attachments: [] });
    } catch (error) {
      console.error('Error replying to email:', error);
    }
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '45px' }}>
          <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
              Email Notifications
            </Typography>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <Paper elevation={3} style={{ padding: '20px' }}>
                <List>
                  {emailDetails.map((email) => (
                    <ListItem key={email.seqno} divider>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="textPrimary">
                              <strong>From:</strong> {email.from}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              <strong>Subject:</strong> {email.subject}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              <strong>Text:</strong> {email.text}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              <strong>Date:</strong> {email.date}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="textPrimary">
                              <strong>Seen:</strong> {email.seen ? 'Yes' : 'No'}
                            </Typography>
                            <br />
                            {email.attachments.length > 0 && (
                              <div>
                                <strong>Attachments:</strong>
                                <ul>
                                  {email.attachments.map((attachment, index) => (
                                    <li key={index}>
                                      {' '}
                                      {attachment.fileName}{' '}
                                      {/* "Open" button for each attachment */}
                                      <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => openAttachment(attachment)}
                                      >
                                        Open
                                      </Button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </React.Fragment>
                        }
                      />
                      {/* "Reply" button at the bottom right corner */}
                      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => handleReply(email)}
                          style={{ marginLeft: '8px' }}
                        >
                          Reply
                        </Button>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Container>
        </Box>
        <Modal open={replyModalOpen} onClose={handleReplyModalClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Reply to Email
            </Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              label="Reply Text"
              value={replyContent.text}
              onChange={(e) => setReplyContent({ ...replyContent, text: e.target.value })}
            />
            {/* Add attachment handling UI */}
            <input
              type="file"
              onChange={(e) =>
                setReplyContent({
                  ...replyContent,
                  attachments: [...replyContent.attachments, e.target.files[0]],
                })
              }
            />
            {/* Display attached files */}
            {replyContent.attachments.map((attachment, index) => (
              <div key={index}>{attachment.name}</div>
            ))}
            {/* Send Reply and Close buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSendReply}>
                Send Reply
              </Button>
              <Button variant="contained" onClick={handleReplyModalClose}>
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
export default EmailNotifications;