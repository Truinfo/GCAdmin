import React, { useState, useEffect } from 'react';
import { Container, Table, TableHead, TableBody, TableRow, TableCell, Typography, Pagination, Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import axios from 'axios';
import { format } from 'date-fns';


const ReviewsPage = () => {
  const reviewsPerPage = 5;

  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const ServiceCenterId = localStorage.getItem('ServiceCenterId');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Make a GET request to your backend API endpoint for fetching reviews
        const response = await axios.get(`https://gocarsmithbackend.onrender.com/api/admin/ServiceCenterReviews/${ServiceCenterId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Adjust the endpoint accordingly

        // Set the reviews in the component state
        setReviews(response.data.reviews);
        console.log(response)
      } catch (error) {
        console.error('Error fetching reviews:', error);

        // Set an error state if there's an issue
        setError('Failed to retrieve reviews');
      }
    };

    // Call the fetchReviews function when the component mounts
    fetchReviews();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderStars = (rating) => {
    const starElements = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starElements.push(<StarIcon key={`star-${i}`} color="warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        starElements.push(<StarHalfIcon key="half-star" color="warning" />);
      } else {
        starElements.push(<StarBorderIcon key="emptyStar" color="warning" />);
      }
    }

    return starElements;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Review List
      </Typography>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Review Text</TableCell>
            <TableCell>Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentReviews.map((review) => (
            <TableRow key={review._id}>
              <TableCell>{review.user?.firstName}</TableCell>
              <TableCell>{format(new Date(review.createdAt), 'yyyy-MM-dd')}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>
                <div style={{ display: 'flex' }}>
                  {renderStars(review.rating)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={Math.ceil(reviews.length / reviewsPerPage)}
        page={currentPage}
        onChange={(event, page) => paginate(page)}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10px" }}
      />
    </Container>
  );
};

export default ReviewsPage;
