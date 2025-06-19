import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:2000/api/get/company", {
        withCredentials: true,
      });
      setCompanies(res.data.data || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch company data.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:2000/api/approve/company",
        {
          companyId: id,
        },
        { withCredentials: true }
      );
      alert(res.data.message);

      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("Failed to approve");
    }
  };

  const handleNotApprove = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:2000/api/reject/company",
        {
          companyId: id,
        },
        { withCredentials: true }
      );
      alert(res.data.message);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("Failed to reject");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:2000/api/delete/company",
        {
          companyId: id,
        },
        { withCredentials: true }
      );
      alert(res.data.message);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    button: {
      marginRight: "8px",
      padding: "6px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    approveBtn: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    notApproveBtn: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
    deleteBtn: {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
    error: {
      color: "red",
      textAlign: "center",
    },
    link: {
      color: "#007BFF",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Verified Companies</h2>

      {loading && <p>Loading data...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && companies.length === 0 && !error && (
        <p>No company records found.</p>
      )}

      {!loading && companies.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Business Name</th>
              <th style={styles.th}>Owner Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Website</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={company._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{company.BusinessName}</td>
                <td style={styles.td}>{company.OwnerFullName}</td>
                <td style={styles.td}>{company.BusinessEmail}</td>
                <td style={styles.td}>{company.BusinessPhone}</td>
                <td style={styles.td}>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}>
                    {company.website || "N/A"}
                  </a>
                </td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.approveBtn }}
                    onClick={() => handleApprove(company._id)}>
                    Approve
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.notApproveBtn }}
                    onClick={() => handleNotApprove(company._id)}>
                    Not Approve
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteBtn }}
                    onClick={() => handleDelete(company._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
