import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Brands from "./pages/Brands/Brands";
import Models from "./pages/Brands/Models";
import Signin from "./components/signin/Signin";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import BlogList from "./pages/Blog/BlogList";
import Centers from "./pages/ServiceCenter/Centers";
import Inventery from "./pages/Inventory/Inventery";
import Customers from "./pages/Customers/Customers";
import Appoinments from "./pages/Appointments/Appointments";
import OnsiteAppointments from "./pages/Appointments/OnsiteAppointments";
import Notification from "./pages/Notification/Notification";
import Coupons from "./pages/Coupons/Coupons";
import CreateReminder from "./pages/Reminder/CreateReminder";
import Invoice from "./pages/Invoice/Invoice";
import Passwordchange from "./components/forgotpassword/Passwordchange";
import Error from "./components/forgotpassword/Error";
import CreateModel from "./pages/Brands/CreateModel";
import Service from "./pages/Brands/Service";
import CreateBrand from "./pages/Brands/CreateBrand";
import Description from "./pages/Brands/Description";
import SignUp from "./components/signup/SignUp";
import Verification from "./components/forgotpassword/Verification";
import Services from "./pages/Customers/Services";
import Details from "./pages/ServiceCenter/Details";
import Locations from "./pages/ServiceCenter/Locations";
import CreateInvoice from "./pages/Invoice/CreateInvoice";
import BlogCreate from "./pages/Blog/BlogCreate";
import StaffDetails from "./pages/ServiceCenter/StaffDetails";
import InvoiceDetail from "./pages/Invoice/InvoiceDetail";
import CreateCoupons from "./pages/Coupons/CreateCoupon";
import CreateAppointment from "./pages/Appointments/CreateAppointment";
import BlogDetails from "./pages/Blog/BlogDetails";
import EmailNotifications from "./pages/Notification/Emails";
import EditService from "./pages/Brands/EditServices"
import RequestsList from "./pages/Notification/Requests";
import OrdersList from "./pages/Notification/Orders";
import OnsiteInvoice from "./pages/OnsiteInvoice/OnsiteInvoice";
import TrashBin from "./pages/TrashBin/TrashBin";
import Token from "./components/signin/token";
import ServiceCenterVirification from "./pages/ServiceCenter/serviceCenterVerification";
import Registration from "./pages/ServiceCenter/Registration";
import CheckEmailVerifiedOrNot from "./pages/ServiceCenter/CheckEmail";
import UserProfile from "./pages/UserProfile";
import NotificationSender from "./pages/ServiceCenter/sendNotifications";
import ReminderList from "./pages/Reminder/Reminder";
import OnsiteService from "./pages/Customers/OnsiteService";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Token /> 
        <Routes>
        <>
          <Route path="/Admin/Home" element={<Dashboard />} />
          <Route path="/Admin/blog" element={<BlogList />} />
          <Route path="/Admin/CreateBlog" element={<BlogCreate />} />
          <Route path="/Admin/BlogDetails/:id" element={<BlogDetails />} />
          <Route path="/Admin/Servicecenter/:_id" element={<Centers />} />
          <Route path="/Admin/ServiceCenterVirification" element={<ServiceCenterVirification />} />
          <Route path="/Admin/Registration" element={<Registration />} />
          <Route path="/Admin/CheckEmail" element={<CheckEmailVerifiedOrNot />} />
          <Route path="/Admin/ServiceLocations" element={<Locations />} />
          <Route path="/" element={<Signin />} />
          <Route path="/Admin/adminSignup" element={<SignUp />} />
          <Route path="/Admin/Forgotpassword" element={<ForgotPassword />} />
          <Route path="/Admin/Changepassword" element={<Passwordchange />} />
          <Route path="/Admin/Brands" element={<Brands />} />
          <Route path="/Admin/models/:BrandId" element={<Models />} />
          <Route path="/Admin/Createbrand" element={<CreateBrand />} />
          <Route path="/Admin/createmodel" element={<CreateModel />} />
          <Route path="/Admin/detail/:modelId" element={<Description />} />
          <Route path="/Admin/Inventery" element={<Inventery />} />
          <Route path="/Admin/Details" element={<Details />} />
          <Route path="/Admin/editService/:locations/:modelId/:fuelType" element={<EditService/>}/>
          <Route path="/Admin/Customers" element={<Customers />} />
          <Route path="/Admin/onsiteService" element={<OnsiteService />} />
          <Route path="/Admin/Services" element={<Services />} />
          <Route path="/Admin/:BrandId/:modelId/addService" element={<Service/>}/>
          <Route path="/Admin/Appointments" element={<Appoinments />} />
          <Route path="/Admin/OnsiteAppointments" element={<OnsiteAppointments />} />
          <Route path="/Admin/CreateAppointment" element={<CreateAppointment />} />
          <Route path="/Admin/Coupons" element={<Coupons />} />
          <Route path="/Admin/CreateReminder" element={<CreateReminder />} />
          <Route path="/Admin/Reminder" element={<ReminderList />} />
          <Route path="/Admin/Employeedetails" element={<StaffDetails />} />
          <Route path="/Admin/Invoice" element={<Invoice />} />
          <Route path="/Admin/OnsiteInvoice" element={<OnsiteInvoice />} />
          <Route path="/Admin/Invoicedetails" element={<InvoiceDetail />} />
          <Route path="/Admin/Notifications" element={<Notification />} />
          <Route path="/Admin/EmailNotifications" element={<EmailNotifications />} />
          <Route path="/Admin/Requests" element={<RequestsList />} />
          <Route path="/Admin/Orders" element={<OrdersList />} />
          <Route path="/Admin/Createcoupon" element={<CreateCoupons />} />
          <Route path="/Admin/NewInvoice" element={<CreateInvoice />} />
          <Route path="/Admin/error" element={<Error />} />
          <Route path="/Admin/verify" element={<Verification />} />
          <Route path="/Admin/TrashBin" element={<TrashBin />} />
          <Route path="/Admin/UserProfile" element={<UserProfile />} />
          <Route path="/Admin/NotificationSender" element={<NotificationSender />} />
          <Route path="/Admin/editService/:locations/:modelId/:fuelType" element={<EditService/>}/>
          </>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
