import React, { useState } from "react";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://v2.api.noroff.dev";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const fallBackAvatar = "/placeholder.gif";
  const [avatarUrl, setAvatarUrl] = useState(
    localStorage.getItem("avatarUrl") || fallBackAvatar
  );

  const handleViewVenue = (venue) => {
    navigate(`/Bookings`);
  };

  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  const userName = localStorage.getItem("userName");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");
      const response = await fetch(
        `${BASE_URL}/holidaze/profiles/${userName}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: {
              url: avatarUrl,
              alt: "Avatar Image",
            },
          }),
        }
      );

      if (response.ok) {
        localStorage.setItem("avatarUrl", avatarUrl);
        setShowModal(false);
      } else {
        console.error("Failed to update avatar:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <Container className="mt-5 text-center">
      <div>
        <img
          src={avatarUrl}
          alt="Avatar"
          className="rounded-circle border border-black mb-3"
          style={{ width: "150px", height: "150px" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallBackAvatar;
          }}
        />
        <div className="mb-3">
          <h4>Hello!</h4>
          <h4>{userName}</h4>
        </div>
        <div>
          <div className="mb-3">
            <Button
              variant="primary"
              onClick={() => setShowModal(true)}
              style={{ backgroundColor: "#FFA100" }}
            >
              Edit Avatar
            </Button>
          </div>
          <div className="mb-3">
            <Button
              variant="primary"
              style={{ backgroundColor: "#FFA100" }}
              onClick={() => handleViewVenue()}
            >
              View Bookings
            </Button>
          </div>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="avatarUrl" className="mb-2">
                <Form.Label>Avatar URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter avatar URL"
                  value={avatarUrl}
                  onChange={handleAvatarChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Container>
  );
};

export default Profile;
