import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Card from "../Components/card";
import "./Home.css";
import Navbar from "../Components/navBar";
import Header from "../Components/Header";
import ProfilesList from "../Components/ProfileList";

export default function HomePage() {
  let [posts, setPosts] = useState([]);
  let [profiles, setProfiles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const TOKEN = localStorage.getItem("token");

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/posts/feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + TOKEN,
          },
        });

        let data = await response.json();

        if (response.ok) {
          const updatedPosts = await Promise.all(
            data.map(async (element) => {
              let path = element.imageUrl.split("/");

              try {
                const imgResponse = await fetch(
                  "http://localhost:3000/api/posts/images/" +
                    path[path.length - 1],
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + TOKEN,
                    },
                  }
                );

                const imageBlob = await imgResponse.blob();
                const imageUrl = URL.createObjectURL(imageBlob);

                // Return the updated element with the imagePath
                return { ...element, imageUrl: imageUrl };
              } catch (error) {
                console.error("Error fetching image:", error);
                return element; // In case of an error, return the original element
              }
            })
          );

          setPosts(updatedPosts);
        } else {
          setError(data.message || "Error al obtener publicaciones");
        }
      } catch (err) {
        setError("Error en el servidor. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserFriends = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/profile/" + jwtDecode(TOKEN).id,
          {
            headers: { Authorization: "Bearer " + TOKEN },
          }
        );

        // Assuming the friends list is part of the user data under `friends`
        setFriends(response.data.user.friends.map((friend) => friend._id));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchUsers = async () => {
      axios
        .get("http://localhost:3000/api/user/all/", {
          headers: { Authorization: "Bearer " + TOKEN },
        })
        .then((response) => {
          setProfiles(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUsers();
    fetchUserFriends();
    fetchPosts();
  }, []);

  console.log(friends);

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <Navbar />
        </aside>
        <div className="mainContent">
          <Header />
          <div className="ProfilePage">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ProfilesList profiles={profiles} friends={friends} />
            <div className="card-grid">
              {posts.map((post) => (
                <Card
                  key={post._id}
                  image={post.imagePath || post.imageUrl}
                  caption={post.caption}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
