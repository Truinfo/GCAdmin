import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';

const TrashBin = () => {
  const [deletedData, setDeletedData] = useState([]);
  const [viewPostDetails, setViewPostDetails] = useState(null);
  const token = localStorage.getItem('token')

  useEffect(() => {
    // Fetch deleted Data when the component mounts
    fetchDeletedData();
  }, []);

  const fetchDeletedData = async () => {
    try {
      const response = await axios.get('https://gocarsmithbackend.onrender.com/api/admin/trash',
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      setDeletedData(response.data || []);
    } catch (error) {
      console.error('Error fetching deleted Data:', error);
    }
  };

  const restoreData = async (dataId) => {
    try {
      const response = await axios.put(`https://gocarsmithbackend.onrender.com/api/admin/trash/restore/${dataId}`);
      const restoredData = response.data.restoredData;

      // Update local state
      const updatedDeletedData = deletedData.filter((data) => data._id !== dataId);
      setDeletedData(updatedDeletedData);
    } catch (error) {
      console.error('Error restoring Data:', error);
    }
  };

  const permanentlyDeleteData = async (dataId) => {
    try {
      await axios.delete(`https://gocarsmithbackend.onrender.com/api/admin/trash/delete/${dataId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      // Update local state
      const updatedDeletedData = deletedData.filter((data) => data._id !== dataId);
      setDeletedData(updatedDeletedData);
    } catch (error) {
      console.error('Error permanently deleting Data:', error);
    }
  };

  const clearTrash = async () => {
    try {
      await axios.delete('https://gocarsmithbackend.onrender.com/api/admin/trash/clear',
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

      // Update local state
      setDeletedData([]);
      setViewPostDetails(null); // Clear the post details when clearing the trash
    } catch (error) {
      console.error('Error clearing Trash:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Include the Sidebar component */}
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '55px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" style={{ marginTop: '20px' }}>Trash Bin</Typography>
            <button onClick={clearTrash} className="create_button" style={{ marginRight: '20px' }} >Clear Trash</button>
          </div>
          <div>
            {deletedData.length === 0 ? (
              <Typography variant="body1">The trash bin is empty.</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data From</TableCell>
                      <TableCell>Deleted Path</TableCell>
                      <TableCell>Deleted Date</TableCell>
                      <TableCell>View</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {deletedData.map((data) => (
                      <TableRow key={data._id}>
                        <TableCell>{data.dataFrom}</TableCell>
                        <TableCell>{data.deletedPath}</TableCell>
                        <TableCell>{data.deletedAt}</TableCell>
                        <TableCell>
                          <button onClick={() => setViewPostDetails(data.original[0])} className="create_button">View</button>
                        </TableCell>
                        <TableCell>
                          <button onClick={() => restoreData(data._id)} className="create_button">Restore</button>
                          <button onClick={() => permanentlyDeleteData(data._id)} className="create_button" style={{ marginLeft: '10px' }}>Permanently Delete</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          {/* Display the post details */}
          {viewPostDetails && (
            <Card>
              <CardContent>
                {/* Conditionally render Typography components */}
                {viewPostDetails.posttitle && <Typography variant="h6">{viewPostDetails.posttitle}</Typography>}
                {viewPostDetails._id && <Typography variant="body2">{viewPostDetails._id}</Typography>}
                {viewPostDetails.posttitle && <Typography variant="body2">{viewPostDetails.posttitle}</Typography>}
                {viewPostDetails.description && <Typography variant="body2">{viewPostDetails.description}</Typography>}
                {viewPostDetails.content && <Typography variant="body2">{viewPostDetails.content}</Typography>}
                {viewPostDetails.cover && viewPostDetails.cover[0] && viewPostDetails.cover[0].img && (
                  <Typography variant="body2">
                    <img src={`https://gocarsmithbackend.onrender.com${viewPostDetails.cover[0].img}`} alt="cover" />
                  </Typography>
                )}
                {viewPostDetails.Object && <Typography variant="body2">{viewPostDetails.Object}</Typography>}
                {viewPostDetails.tags && viewPostDetails.tags[0] && <Typography variant="body2">{viewPostDetails.tags[0]}</Typography>}
                {viewPostDetails.category && <Typography variant="body2">{viewPostDetails.category}</Typography>}
                {viewPostDetails.subCategories && <Typography variant="body2">{viewPostDetails.subCategories}</Typography>}
                {/* {viewPostDetails.comments && <Typography variant="body2">{viewPostDetails.comments}</Typography>} */}
                {/* {viewPostDetails.likes && <Typography variant="body2">{viewPostDetails.likes}</Typography>} */}

                {/* Add other details as needed */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                  <button style={{backgroundColor:"black",color:"white",padding:"8px",fontWeight:"bold"}} onClick={() => setViewPostDetails(null)}>Close</button>
                </Box>
              </CardContent>
            </Card>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default TrashBin;