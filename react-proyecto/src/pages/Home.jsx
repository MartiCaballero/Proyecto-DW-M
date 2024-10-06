import { useEffect, useState } from "react";
import Card from "../Components/card";
import "./Home.css"

export default function HomePage(){
    let [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const TOKEN = localStorage.getItem('token');

            try {
                const response = await fetch('http://localhost:3000/api/posts/feed', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' +  TOKEN
                    },
                });

                let data = await response.json();

                if (response.ok) {
                    const updatedPosts = await Promise.all(data.map(async (element) => {
                        let path = element.imageUrl.split("/");
                        
                        try {
                            const imgResponse = await fetch('http://localhost:3000/api/posts/images/' + path[path.length - 1], {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + TOKEN 
                                },
                            });

                            const imageBlob = await imgResponse.blob();
                            const imageUrl = URL.createObjectURL(imageBlob);

                            // Return the updated element with the imagePath
                            return {...element, imageUrl: imageUrl};

                        } catch (error) {
                            console.error("Error fetching image:", error);
                            return element; // In case of an error, return the original element
                        }
                    }));

                    setPosts(updatedPosts);
                } else {
                    setError(data.message || 'Error al obtener publicaciones');
                }
            } catch (err) {
                setError('Error en el servidor. Intenta más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts(); // Call the async function
        
    }, []);

    return(
        <>
            <h2>Home Page</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="card-grid">
                {posts.map((post) => (
                    <Card key={post._id} image={post.imagePath || post.imageUrl} caption={post.caption} />
                ))}
            </div>
        </>
    );
}