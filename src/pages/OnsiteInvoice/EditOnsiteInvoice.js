import { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";



const EditOnsiteInvoice = ({ invoiceData, onClose,InvoiceId }) => {
    const [editedInvoiceData, setEditedInvoiceData] = useState({ ...invoiceData });

    useEffect(() => {
        setEditedInvoiceData((prevData) => ({
            ...prevData,
            items: prevData.items || [],
            addedItems: prevData.addedItems || [],
            ServiceName: prevData.ServiceName || [],
        }));
    }, [invoiceData.items, invoiceData.ServiceName]);

    const [expandedRows, setExpandedRows] = useState({});



    // const  ItemsTotalPrice=editedInvoiceData.addedItems.reduce((accumulator, currentValue)=>{
    //     return (accumulator + (parseInt(currentValue.unitPrice)*parseInt(currentValue.quantity))|0);
    //   },0)
    //   const totalOfLstOfItems=editedInvoiceData.ServiceName.reduce((total, item) => {
    //     return total + parseInt(item.price);
    //   }, 0)
    //   const totalTax=parseInt((parseInt(invoiceData.service_Charges)+totalOfLstOfItems+ItemsTotalPrice)*0.15)
    // const [total,setTotal]=
    // useState(parseInt((totalTax+parseInt(editedInvoiceData.service_Charges)+totalOfLstOfItems+ItemsTotalPrice)-parseInt(editedInvoiceData.discounts)))

    const calculateTotal = (addedItems, ServiceName) => {
        const ItemsTotalPrice = addedItems.reduce((accumulator, currentValue) => {
            return accumulator + parseInt(currentValue.unitPrice) * parseInt(currentValue.quantity);
        }, 0);

        const totalOfLstOfItems = ServiceName.reduce((total, item) => {
            return total + parseInt(item.price);
        }, 0);

        const totalTax = parseInt((parseInt(invoiceData.service_Charges) + totalOfLstOfItems + ItemsTotalPrice) * 0.15);

        const total = parseInt((totalTax + parseInt(editedInvoiceData.service_Charges) + totalOfLstOfItems + ItemsTotalPrice) - parseInt(editedInvoiceData.discounts));

        return total;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedInvoiceData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (index, field, value) => {
        setEditedInvoiceData((prevData) => {
            const updatedItems = [...prevData.addedItems];
            updatedItems[index][field] = value;
            const updatedTotal = calculateTotal(updatedItems, prevData.ServiceName);
            return {
                ...prevData,
                addedItems: updatedItems,
                total: updatedTotal
            };
        });
    };

    const handleAddItem = () => {
        setEditedInvoiceData((prevData) => ({
            ...prevData,
            addedItems: [
                ...prevData.addedItems,
                { discription: "", quantity: 1, unitPrice: 0 },
            ],
        }));
    };

    const handleRemoveItem = (index) => {
        setEditedInvoiceData((prevData) => {
            const updatedItems = [...prevData.items];
            updatedItems.splice(index, 1);
            return {
                ...prevData,

                items: updatedItems,
            };
        });
    };
    console.log(editedInvoiceData)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Your logic for updating the invoice data
        try {
            const response = await axios.put(`https://gocarsmithbackend.onrender.com/api/updateOnsiteInvoiceById/${InvoiceId}`,
                editedInvoiceData,
            );

            if (response) {
                onClose();
                
            }

        } catch (error) {
            console.error("Error updating invoice:", error);
        }
    };
    const generateAdditionalContent = (services) => {
        return (
            <TableCell colSpan={6}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Service Title</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Price</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services?.map((service, index) => (
                            <TableRow key={service._id}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableCell>
        );
    };
    return (
        <Dialog open={true} >
            <DialogTitle>Create Invoice</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Box>
                        
                        <TextField
                            name="carModel"
                            value={editedInvoiceData.carModel}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="customerName"
                            value={editedInvoiceData.customerName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                       
                        <TextField
                            name="customerEmail"
                            value={editedInvoiceData.customerEmail}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="serviceDate"
                            value={editedInvoiceData.serviceDate}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="status"
                            value={editedInvoiceData.status}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="invoiceNumber"
                            value={editedInvoiceData.invoiceNumber}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            name="InvoiceDate"
                            value={editedInvoiceData.invoiceDate}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Tax"
                            name="tax"
                            value={editedInvoiceData.tax}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            margin="normal"
                            required
                        />
                        <TextField
                            label="customLocation"
                            name="customLocation"
                            value={editedInvoiceData.customLocation}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="text"
                            required
                        />
                        <TextField
                            label="service Center Location"
                            name="serviceCenterLocation"
                            value={editedInvoiceData.serviceCenterLocation}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />

                        {expandedRows[editedInvoiceData._id] && generateAdditionalContent(invoiceData.listOfServices)}
                        <TextField
                            label="discount"
                            name="discount"
                            value={editedInvoiceData.discount}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="number"
                            required
                        />
                        <TextField
                            label="Service_Charges"
                            name="Service_Charges"
                            value={editedInvoiceData.Service_Charges}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="number"
                            required
                        />
                        
                        {editedInvoiceData.addedItems?.map((item, index) => (
                            <Box key={index} display="flex" alignItems="center">
                                <TextField
                                    label="Description"
                                    value={item.discription}
                                    onChange={(e) => handleItemChange(e, "discription", e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    name="discription"
                                />
                                <TextField
                                    label="Quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(e, "quantity", e.target.value)}
                                    type="number"
                                    margin="normal"
                                    name="quantity"
                                />
                                <TextField
                                    label="Unit Price"
                                    value={item.unitPrice}
                                    onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                                    type="number"
                                    margin="normal"
                                    name="unitPrice"
                                />
                                <Button type="button" onClick={() => handleRemoveItem(index)}>
                                    Remove
                                </Button>
                            </Box>
                        ))}


                        <TextField
                            label="total"
                            name="total"
                            value={editedInvoiceData.total}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />

                        <Button type="button" onClick={handleAddItem}>
                            Add Items
                        </Button>
                        {/* <Typography variant="h6">Total Amount: {editedInvoiceData.total}</Typography> */}
                        <Button type="submit" variant="contained" color="primary">
                            Save Invoice
                        </Button>
                    </Box>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit} color="primary">
                    Save Invoice
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditOnsiteInvoice;