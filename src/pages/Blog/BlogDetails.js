import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, IconButton, Box, Button } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BiArrowBack, BiLike, BiDislike } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token');
};

function CarInfo(props) {
  return (
  <>
      <Typography variant="h4" sx={{fontWeight:"600"}}>{props.title}</Typography>
      {props.children}
      </>  );
}

function BlogDetails() {
  const { id } = useParams();
  const [commentCount, setCommentCount] = useState(0);
  const [blogDetails, setBlogDetails] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/blog/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setBlogDetails(response.data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const fetchTotalComments = async () => {
    try {
      const commentsResponse = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/getComments/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Assuming your endpoint returns an array of comments
      const commentsData = commentsResponse.data;

      setAllComments(commentsData);
      setCommentCount(commentsData.length);
      // You can use allComments as needed
    } catch (error) {
      console.error('Error fetching total comments:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTotalComments();
    }
  }, [id]);

  const navigate = useNavigate();

  const fetchTotalLikes = async () => {
    try {
      const likesResponse = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/getTotalLikes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { like: totalLikes, dislike: totalDislikes } = likesResponse.data;
      setTotalLikes(totalLikes);
      setTotalDislikes(totalDislikes);
    } catch (error) {
      console.error('Error fetching total likes and dislikes:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTotalComments();
      fetchTotalLikes();
    }
  }, [id]);

  const handleDeleteComment = async ( commentEmail) => {
    try {
      const response = await axios.delete(
        `https://gocarsmithbackend.onrender.com/api/user/deleteCommentPersonalized/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
          data: {
            email: commentEmail, 
          },
          
        }
      );

      // Assuming the deletion was successful, you can update the comments state
      if (response.status === 200) {
        const updatedComments = allComments.filter(
          (comment) => comment._id !== id
        );
        setAllComments(updatedComments);
        setCommentCount(updatedComments.length);
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '35px' }}>
        
        <div style={{ margin: '30px 100px 50px 100px' }}>


          <div style={{display:"flex", justifyContent:"start", alignItems:"center"}}>
        <IconButton   sx={{ border: "1px solid #000", borderRadius: "50%", backgroundColor: "#fff",marginRight:"20px" }}>
          <BiArrowBack onClick={() => navigate('/Admin/blog')} />
        </IconButton>
          {blogDetails && (
            <CarInfo title={blogDetails.posttitle}>
            </CarInfo>
          )}
          </div>


          <Grid container spacing={2} mt={"20px"} mb={"20px"}>
            {blogDetails && blogDetails.cover && blogDetails.cover.length > 0 && (
              <Grid item xs={12}>
                <img
                  src={`https://gocarsmithbackend.onrender.com${blogDetails.cover[0].img}`}
                  alt={`Cover`}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          {blogDetails && (
            <CarInfo title="Description">
              <Typography>{blogDetails.description}</Typography>
            </CarInfo>
          )}
          <Grid container spacing={2} mt={"20px"} mb={"20px"}>
            {blogDetails && blogDetails.cover && blogDetails.cover.length > 1 && (
              <Grid item xs={12}>
                <img
                  src={`https://gocarsmithbackend.onrender.com${blogDetails.cover[1].img}`}
                  alt={`Cover`}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          <CarInfo title="Content">
            <Typography>{blogDetails && blogDetails.content}</Typography>
          </CarInfo>
          <Grid container spacing={2} mt={"20px"} mb={"20px"}>
            {blogDetails && blogDetails.cover && blogDetails.cover.length > 2 && (
              <Grid item xs={12}>
                <img
                  src={`https://gocarsmithbackend.onrender.com${blogDetails.cover[2].img}`}
                  alt={`Cover`}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          <CarInfo title="Tags" >
            <Typography style={{paddingBottom:"15px" ,paddingTop:"10px"}}>{blogDetails && ` ${blogDetails.tags.join(', ')}`}</Typography>
          </CarInfo>
          {/* Display author if available */}
          <CarInfo title="Author">
            <Typography style={{paddingBottom:"10px" ,paddingTop:"10px"}}>{blogDetails && `${blogDetails.author}`}</Typography>
          </CarInfo>

          {/* New Grid for Like and Dislike */}
          <CarInfo>
            <Grid container spacing={2} mt={"20px"} mb={"20px"}>
              <Grid item xs={3}>
                <BiLike style={{ marginRight: '8px', fontSize: '24px' }} />
                <Typography variant="h6">Likes: {totalLikes}</Typography>
              </Grid>
              <Grid item xs={3}>
                <BiDislike style={{ marginRight: '5px', fontSize: '24px' }} />
                <Typography variant="h6">Dislikes: {totalDislikes}</Typography>
              </Grid>
            </Grid>
          </CarInfo>

          {/* Comment Grid */}
          {allComments && (
            <CarInfo title="Comments">
              <div>
                {allComments.map((comment) => (
                  <div key={comment._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                    <Typography>{comment.comment}</Typography>
                    <div style={{ marginTop: '5px' }}>
                      <Typography>Email: {comment.email}</Typography>
                      {/* Additional information from the comment object can be displayed here */}
                      {/* For example: <Typography>{comment.createdAt}</Typography> */}
                    </div>
                    {/* Add delete button with onClick handler */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ marginTop: '10px' }}
                      onClick={() => handleDeleteComment( comment.email)}
                    >
                      Delete
                    </Button>

                  </div>
                ))}
              </div>
            </CarInfo>
          )}
        </div>
      </Box>
    </Box>
  );
}

export default BlogDetails;
