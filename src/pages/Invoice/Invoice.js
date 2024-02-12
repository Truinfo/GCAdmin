import * as React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { BiRupee } from "react-icons/bi";
import { BiSolidReceipt, BiSolidTimer } from "react-icons/bi";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { RiDraftFill } from "react-icons/ri";
import InvoiceList from "./InvoiceList";
import axios from "axios";
const  Invoice=()=> {
  const navigate = useNavigate();
  const [invoices, setInvoices] = React.useState([]);
  const token = localStorage.getItem('token');
  
  React.useEffect(() => {
    const getTotalInvoice=()=>{
      axios.get('https://gocarsmithbackend.onrender.com/api/admin/getGeneratedInvoice',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setInvoices(response.data||[]))
      .catch(error => console.error('Error fetching invoices:', error));
    }
    getTotalInvoice()
    // Fetch the list of invoices when the component mounts
  }, []); ;
  const countInvoices = (invoices) => {
    // Use Array.reduce to count pending and completed invoices
    const counts = invoices.reduce(
      (accumulator, invoice) => {
        if (invoice.status === 'Pending') {
          accumulator.pendingCount += 1;
          accumulator.pendingAmount += invoice.total;
        } else if (invoice.status === 'Completed') {
          accumulator.completedCount += 1;
          accumulator.completedAmount += invoice.total;
        }else if (invoice.status === 'Draft') {
          accumulator.draftCount += 1;
          accumulator.draftAmount += invoice.total;
        }
        return accumulator;
      },
      { pendingCount: 0, completedCount: 0,draftCount:0, pendingAmount: 0, completedAmount: 0,draftAmount:0 }
    );
    return counts;
  };
  // Call the function with your array of invoices
  const invoiceCounts = countInvoices(invoices);
 console.log(invoiceCounts.pendingAmount,invoiceCounts.completedAmount) 
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {/* Include the Sidebar component */}
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "30px" }}>
          <Container >
            <Row style={{ marginBottom: "10px" }}>
              <Col lg={10}>
                <h1>Invoice</h1>
              </Col>
              <Col lg={2}>
                {/* <button
                  className="create_button"
                  onClick={() => navigate("/NewInvoice")}
                >
                  + New Invoice
                </button> */}
              </Col>
            </Row>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                marginBottom: "15px",
                marginTop: "15px",
                justifyContent: "space-between",
                marginLeft: "15px",
                marginRight: "15px",
              }}
            >
              <div>
                <Grid container spacing={3}>
                  <Grid item>
                    <div
                      style={{
                        position: "relative",
                        width: "75px", // Adjust size as needed
                        height: "75px", // Adjust size as needed
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={100}
                        size={75}
                        style={{ color: "green" }}
                      />
                      <BiSolidReceipt
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          color: "green",
                          transform: "translate(-50%, -50%)",
                          fontSize: 35, // Adjust the size of the icon
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Stack spacing={0}>
                      <Typography variant="h6">Total</Typography>
                      <p style={{ marginBottom: "5px" }}>{invoices.length} Invoices</p>
                      <h5 style={{ marginTop: "-3px" }}><BiRupee/> {invoiceCounts.completedAmount+invoiceCounts.pendingAmount}</h5>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid item>
                    <div
                      style={{
                        position: "relative",
                        width: "75px", // Adjust size as needed
                        height: "75px", // Adjust size as needed
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={40}
                        size={75}
                        style={{ color: "steelblue" }}
                      />
                      <BsFillFileEarmarkCheckFill
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          color: " steelblue ",
                          transform: "translate(-50%, -50%)",
                          fontSize: 35, // Adjust the size of the icon
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Stack spacing={0}>
                      <Typography variant="h6">Paid</Typography>
                      <p style={{ marginBottom: "5px" }}>{invoiceCounts.completedCount} Invoices</p>
                      <h5 style={{ marginTop: "-3px" }}><BiRupee/>{invoiceCounts.completedAmount}</h5>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid item>
                    <div
                      style={{
                        position: "relative",
                        width: "75px", // Adjust size as needed
                        height: "75px", // Adjust size as needed
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={20}
                        size={75}
                        style={{ color: "orange" }}
                      />
                      <BiSolidTimer
                        style={{
                          position: "absolute",
                          top: "50%",
                          color: "orange",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: 35, // Adjust the size of the icon
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Stack spacing={0}>
                      <Typography variant="h6">Pending</Typography>
                      <p style={{ marginBottom: "5px" }}>{invoiceCounts.pendingCount} Invoices</p>
                      <h5 style={{ marginTop: "-3px" }}><BiRupee/>{invoiceCounts.pendingAmount}</h5>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid item>
                    <div
                      style={{
                        position: "relative",
                        width: "75px", // Adjust size as needed
                        height: "75px", // Adjust size as needed
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={40}
                        size={75}
                        style={{ color: "gray" }}
                      />
                      <RiDraftFill
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          color: "gray",
                          transform: "translate(-50%, -50%)",
                          fontSize: 35, // Adjust the size of the icon
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid
                    item
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Stack spacing={0}>
                      <Typography variant="h6">Draft</Typography>
                      <p style={{ marginBottom: "5px" }}>{invoiceCounts.draftCount} Invoices</p>
                      <h5 style={{ marginTop: "-3px " }}><BiRupee/> {invoiceCounts.draftAmount}</h5>
                    </Stack>
                  </Grid>
                </Grid>
              </div>
              {/* Repeat the same structure for other progress indicators */}
            </Stack>
          </Container>
          <InvoiceList/>
        </Box>
      </Box>
    </div>
  );
}
export default Invoice;