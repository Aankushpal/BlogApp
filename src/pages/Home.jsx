import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // ✅ Get logged-in user
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // ✅ Get current user
    const userId = userData?.$id; // ✅ Get user ID safely

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                console.log("Fetched Posts:", posts.documents);
                console.log("Current User ID:", userId);

                const userPosts = posts.documents.filter(post => post.userID === userId);
                console.log("Filtered User Posts:", userPosts);

                setPosts(userPosts);
            }
        });
    }, [userId]);


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap m-4">
                        <div className="p-12 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No posts found for this user
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap gap-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
