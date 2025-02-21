import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            })
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);  

    return ( 
        <div className="py-8">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
