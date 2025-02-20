import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        }).catch((error) => console.error("Error fetching posts:", error));
    }, []);  

    return ( 
        <div className="py-8">
            <Container>
                <div className="flex flex-wrap justify-around
">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-3 m-3 w-1/3 border border-red-500">
                        <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
</div>

    );
}

export default AllPosts;
