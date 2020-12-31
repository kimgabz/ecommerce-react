import React from "react";
import AdminNav from "../../components/navigation/admin.nav";


const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">admin dashboard page</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
