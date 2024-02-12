import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { RiBookmarkFill } from "react-icons/ri"
import { TbMoneybag } from "react-icons/tb"
import { MdInventory } from "react-icons/md"
import { FaUsers } from "react-icons/fa"
import { BiRupee } from 'react-icons/bi'; // Import all icons at once
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import Sidebar from '../components/Sidebar/Sidebar';
import axios from "axios";

const data = [
  { label: 'Jan', Income: 21, Expenses: 41 },
  { label: 'Feb', Income: 35, Expenses: 79 },
  { label: 'Mar', Income: 75, Expenses: 57 },
  { label: 'Apr', Income: 51, Expenses: 47 },
  { label: 'May', Income: 41, Expenses: 63 },
  { label: 'Jun', Income: 47, Expenses: 71 },
  { label: 'Jul', Income: 75, Expenses: 57 },
  { label: 'Aug', Income: 51, Expenses: 47 },
  { label: 'Sep', Income: 41, Expenses: 63 },
  { label: 'Oct', Income: 47, Expenses: 71 },
  { label: 'Nov', Income: 41, Expenses: 63 },
  { label: 'Dec', Income: 47, Expenses: 71 }
];

const data1 = [
  { label: 'Mumbai', Completed: 21, Pending: 41 },
  { label: 'Bhubaneswar', Completed: 35, Pending: 79 },
  { label: 'Chennai', Completed: 75, Pending: 57 },
  { label: 'Delhi', Completed: 51, Pending: 47 },
  { label: 'Hyderabad', Completed: 41, Pending: 63 },
  { label: 'Kolkata', Completed: 47, Pending: 71 },
  { label: 'Lucknow', Completed: 75, Pending: 57 },
  { label: 'Bangalore', Completed: 51, Pending: 47 },
  { label: 'Patna', Completed: 41, Pending: 63 },
  { label: 'Vizag', Completed: 47, Pending: 71 }
];

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'];

export default function Dash() {
  const [items, setItems] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [error, setError] = useState(null);
  const [totalAppointments, setTotalAppointmnets] = useState([]);
  const [totalOnsiteAppointmnets, setTotalOnsiteAppointmnets] = useState([]);
  const [InventoryCount, setInventoryCount] = useState([]);
  const [OnSiteAppointmentsUsers, setOnSiteAppointmentsUsers] = useState([]);
  const [tableType, setTableType] = useState(null);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');
console.log(token)
  useEffect(() => {
    const fetchInventoryCount = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/getInventoryCount/get`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        
        );
        const data = response.data;
        setInventoryCount(data);
        console.log("InventoryCount:", data); // Add this line to check the state
      } catch (error) {
        console.error(error);
        setError("Failed to fetch inventory counts");
      }
    };

    fetchInventoryCount();
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/getCustomers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
         
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
    const fetchDataOnsiteAppointment = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/getAllAppointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOnSiteAppointmentsUsers(response.data);

      } catch (error) {

        console.error("Error fetching appointments:", error);
      }
    };

    fetchDataOnsiteAppointment();
    const fetchTotalOnsiteAppointment = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/TotalAllAppointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalOnsiteAppointmnets(response.data);
        console.log(response.data)
      } catch (error) {

        console.error("Error fetching appointments:", error);
      }
    };

    fetchTotalOnsiteAppointment();
    const fetchTotalAppointments = async () => {
      try {
        const response = await axios.get(
          `https://gocarsmithbackend.onrender.com/api/admin/TotalAllAppointments/ALL`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalAppointmnets(response.data);
        console.log(response.data)
      } catch (error) {

        console.error("Error fetching appointments:", error);
      }
    };

    fetchTotalAppointments();
    const getTotalInvoice = () => {
      axios
        .get(
          `https://gocarsmithbackend.onrender.com/api/admin/getTotalInvoices`
        )
        .then((response) => setInvoices(response.data || []))
        .catch((error) => console.error("Error fetching invoices:", error));
      console.log("Total Invoices", invoices)
    };
    getTotalInvoice();
  }, []);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        // Make a GET request to your backend API endpoint for fetching inventory items
        const response = await axios.get(
          "https://gocarsmithbackend.onrender.com/api/admin/getInventory",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }

        ); // Adjust the endpoint accordingly

        const inventoryItems = response.data;

        const itemsCount = inventoryItems.length;

        setItems(inventoryItems);
        setItemsCount(itemsCount); // Assuming you have a state variable named itemsCount
        console.log(itemsCount);
      } catch (error) {
        console.error("Error fetching inventory items:", error);

        // Set an error state if there's an issue
        setError("Failed to retrieve inventory items");
      }
    };

    // Call the fetchInventoryItems function when the component mounts
    fetchInventoryItems();
  }, []);

  const sumOfIncome = () => {
    // Ensure that invoices is not null or undefined
    if (!invoices || !invoices.length) {
      return 0;
    }
    // Calculate the total income using reduce
    const totalIncome = invoices.reduce((total, invoice) => {
      // Parse the total amount to a floating-point number
      const invoiceAmount = parseFloat(invoice.total) || 0;
      return total + invoiceAmount;
    }, 0);

    // Log the total income (optional)

    return totalIncome;
  };

  const totaluser = users.length + OnSiteAppointmentsUsers.length;
 
  
  const AllAppointments = totalAppointments.length + totalOnsiteAppointmnets.length;
  const allAppointments = [...totalAppointments, ...totalOnsiteAppointmnets];


  const generateExcelTable = () => {
    return (
      <div><table id="bookingTable" style={{ width: "100%", borderCollapse: "collapse", marginTop: '15px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Customer Name</th>
            <th>Contact Number</th>
            <th>Car Model</th>
            <th>Brand</th>
            <th>Fuel Type</th>
            <th>Email</th>
            <th>Service Center ID</th>
            <th>Appointment Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Payment Method</th>
            <th>Subtotal</th>
            <th>GST</th>
            <th>Discount</th>
            <th>Safety Fee</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through your data and create rows */}

          {allAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment._id}</td>
              <td>{appointment.userId}</td>
              <td style={{ textAlign: 'left' }}>{appointment.customerName}</td>
              <td style={{ textAlign: 'left' }}>{appointment.contactNumber}</td>
              <td style={{ textAlign: 'left' }}>{appointment.carModel}</td>
              <td style={{ textAlign: 'left' }}>{appointment.Brand}</td>
              <td style={{ textAlign: 'left' }}>{appointment.fuelType}</td>
              <td style={{ textAlign: 'left' }}>{appointment.email}</td>
              <td style={{ textAlign: 'left' }}>{appointment.serviceCenterId}</td>
              <td style={{ textAlign: 'left' }}>{appointment.appointmentDate}</td>
              <td style={{ textAlign: 'left' }}>{appointment.time}</td>
              <td style={{ textAlign: 'left' }}>{appointment.status}</td>
              <td style={{ textAlign: 'left' }}>{appointment.paymentMethod}</td>
              <td style={{ textAlign: 'left' }}>{appointment.subTotal}</td>
              <td style={{ textAlign: 'left' }}>{appointment.gst}</td>
              <td style={{ textAlign: 'left' }}>{appointment.Discount}</td>
              <td style={{ textAlign: 'left' }}>{appointment.SafetyFee}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <ReactHTMLTableToExcel
          id="downloadTableButton"
          className="download-table-xls-button"
          table="bookingTable"
          filename="appointments"
          sheet="sheet1"
          buttonText="Download as XLS"
        /></div>

    );
  };
  const generateIventoryTable = () => {
    return (
      <div><table id="bookingTable" style={{ width: "100%",  marginTop: '15px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td style={{ textAlign: 'left' }}>{item._id}</td>
              <td style={{ textAlign: 'left' }}>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <ReactHTMLTableToExcel
          id="downloadTableButton"
          className="download-table-xls-button"
          table="bookingTable"
          filename="Inventory"
          sheet="sheet1"
          buttonText="Download as XLS"
        /></div>

    );
  };
  const generateInvoiceTable = () => {
    return (
      <div><table id="bookingTable" style={{ width: "100%",  marginTop: '15px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>serviceCenterId</th>
            <th>Customer Name</th> 
            <th>Customer Email</th>
            <th>Contact Number</th>
            <th>CarModel</th>
            <th>Invoice Number</th>
            <th>Invoice Date</th>
            <th>Service Date</th>
            <th>Safety Fee</th>
            <th>ServiceCenter Location</th>
            <th>Tax</th>
            <th>Labour Charges</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td style={{ textAlign: 'left' }}>{invoice._id}</td>
              <td style={{ textAlign: 'left' }}>{invoice.serviceCenterId}</td>
              <td style={{ textAlign: 'left' }}>{invoice.customerName}</td>
              <td style={{ textAlign: 'center' }}>{invoice.customerEmail}</td>
              <td style={{ textAlign: 'left' }}>{invoice.contactNumber}</td>
              <td style={{ textAlign: 'center' }}>{invoice.carModel}</td>
              <td style={{ textAlign: 'left' }}>{invoice.invoiceNumber}</td>
              <td style={{ textAlign: 'center' }}>{invoice.invoiceDate}</td>
              <td style={{ textAlign: 'left' }}>{invoice.serviceDate}</td>
              <td style={{ textAlign: 'left' }}>{invoice.SafetyFee}</td>
              <td style={{ textAlign: 'center' }}>{invoice.serviceCenterLocation}</td>
              <td style={{ textAlign: 'center' }}>{invoice.tax}</td>
              <td style={{ textAlign: 'center' }}>{invoice.labourCharges}</td>
              <td style={{ textAlign: 'center' }}>{invoice.discounts}</td>
              <td style={{ textAlign: 'center' }}>{invoice.total}</td>
              <td style={{ textAlign: 'center' }}>{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
        <ReactHTMLTableToExcel
          id="downloadTableButton"
          className="download-table-xls-button"
          table="bookingTable"
          filename="Invoice"
          sheet="sheet1"
          buttonText="Download as XLS"
        /></div>

    );
  };
  const generateCustomerTable = () => {
    return (
      <div>
        <ReactHTMLTableToExcel
          id="downloadTableButton"
          className="download-table-xls-button"
          table="bookingTable"
          filename="Users"
          sheet="sheet1"
          buttonText="Download as XLS"
        />
        <table id="bookingTable" style={{ width: "100%",  marginTop: '15px' }}>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Location</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {totalOnsiteAppointmnets.map((use) => (
            <tr key={use._id}>
              <td style={{ textAlign: 'left' }}>{use.userId}</td>
              <td style={{ textAlign: 'left' }}>{use.customerName}</td>
              <td style={{ textAlign: 'left' }}>{use.email}</td>
              <td style={{ textAlign: 'left' }}>{use.contactNumber}</td>
              <td style={{ textAlign: 'left' }}>
        {use.customerLocation ? use.customerLocation.address1 : 'N/A'}
      </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>

    );
  };
 
  const handleGenerateTableClick = () => {
    setTableType('appointments');
  };

  const handleGenerateInventoryTableClick = () => {
    setTableType('inventory');
  };
  const handleGenerateInvoiceTableClick = () => {
    setTableType('invoice');
  };
  const handleGenerateCustomerTableClick = () => {
    setTableType('customer');
  };
  
  const handleCloseTable = () => {
    setTableType(null);
  };

  const generateTable = () => {
    if (tableType === 'appointments') {
      return generateExcelTable();
    } else if (tableType === 'inventory') {
      return generateIventoryTable();
    } else if (tableType === 'invoice') {
      return generateInvoiceTable();
    } else if (tableType === 'customer') {
      return generateCustomerTable();
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: '45px', marginBottom: '45px' }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
            <Card onClick={handleGenerateTableClick} style={{ cursor: 'pointer',height:"170px" }}>
                <CardHeader title="Total Booking" />
                <CardContent>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography variant="h4">{AllAppointments}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4">
                        <RiBookmarkFill />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card onClick={handleGenerateInventoryTableClick} style={{ cursor: 'pointer',height:"170px" }}>
                <CardHeader title="Total Inventory" />
                <CardContent>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography variant="h4">{itemsCount}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4">
                        <MdInventory />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card onClick={handleGenerateInvoiceTableClick}  style={{ cursor: 'pointer',height:"170px" }}>
                <CardHeader title="Total Income" />
                <CardContent>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography variant="h4">
                        <BiRupee />{sumOfIncome()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4">
                        <TbMoneybag />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card onClick={handleGenerateCustomerTableClick} style={{ cursor: 'pointer' ,height:"170px" }}>
                <CardHeader  title="Total Users" />
                <CardContent>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography variant="h4">{totaluser}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h4">
                        <FaUsers />
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" align="center" gutterBottom>
              <b>Income Vs Expenses</b>
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                >
                  <Tooltip />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Legend />
                  <Line type="monotone" dataKey="Income" stroke="#FB8833" />
                  <Line type="monotone" dataKey="Expenses" stroke="#17A8F5" />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={6} style={{ marginTop: "90px" }}>
              <Typography variant="h4" align="center" gutterBottom>
                <b>Inventory Count</b>
              </Typography>
              <ResponsiveContainer width="100%" height={300} >
                <PieChart>
                  <Pie
                    data={InventoryCount.map((entry) => ({
                      name: entry.categoryName,
                      value: entry.itemCount,
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"

                  >
                    {InventoryCount.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value, name) => [`${name}: ${value}`, ""]}
                  />
                  <Legend

                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    iconSize={30}
                    formatter={(value, entry, index) => (
                      <span style={{ color: colors[index % colors.length] }}>
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                <b>Appointment Analytics</b>
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data1}
                  margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                >
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Completed" fill="#FB8833" />
                  <Bar dataKey="Pending" fill="#17A8F5" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog
        open={tableType !== null}
        onClose={handleCloseTable}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Table Details</DialogTitle>
        <DialogContent>
          {generateTable()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTable}  style={{border:"1px solid #3495eb"}}color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
