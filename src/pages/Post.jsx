import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageSrc, setImageSrc] = useState(null); // ✅ Separate image state

    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    // console.log("Fetched Post Data:", post);
                    // console.log("Featured Image ID:", post.featuredimage);

                    const imageUrl = post.featuredimage
                        ? appwriteService.getFilePreview(post.featuredimage)
                        : "/default-placeholder.png"; // ✅ Correct static placeholder

                    // console.log("Generated Image URL:", imageUrl);
                    setPost(post);
                    setImageSrc(imageUrl);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                if (post.featuredimage) {
                    appwriteService.deleteFile(post.featuredimage);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 gap-5 relative border rounded-xl p-2">
                    {imageSrc ? (
                        <img 
                            src={imageSrc} 
                            alt="Post Image"
                            className="rounded-lg w-full max-h-96 object-cover"
                            onError={() => setImageSrc("/default-placeholder.png")} // ✅ Safe fallback
                        />
                    ) : (
                        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-xl">
                            No Image Available
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
