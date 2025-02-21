import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.$id;

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                const userPosts = posts.documents.filter(post => post.userID === userId);
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
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
