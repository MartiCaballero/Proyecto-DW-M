import { useEffect, useState } from "react";
import Card from "../Components/card";

export default function HomePage(){
    let [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch('http://localhost:3000/api/posts/feed', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token') 
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setPosts([...data]);
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
        console.log(posts);
        
    }, []);

    return(
        <>
            <h2>Home Page</h2>
            {posts.map((post) => {
                return <div><Card image={post.imageUrl} caption={post.caption}></Card></div>
            })}
        </>
    );
}