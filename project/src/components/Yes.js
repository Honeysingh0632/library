import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom"; // Import the Link component

const UserProfile = () => {
  const { data, isLoading } = useAuth(); // Move useAuth to the top level

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.profileInfo}>
          <img
            src={"https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&psig=AOvVaw1Z0xN0DTQf5d7-MbeQd-E4&ust=1735662780795000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKiDg_D1z4oDFQAAAAAdAAAAABAE"} // Use user's profile image if available
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
        <button style={styles.closeButton}>✕</button>
      </div>
      {data ? (
        <div className="mt-4">
          <h3>
            {data.firstName} {data.lastName}
          </h3>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
        </div>
      ) : (
        <p className="mt-4 text-danger">
          <Link to="/signup" className="text fs-3">
            Register or Log in
          </Link>
        </p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "400px",
    margin: "20px auto",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileInfo: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  closeButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default UserProfile;
