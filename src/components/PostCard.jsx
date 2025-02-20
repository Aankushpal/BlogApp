import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, title, featuredimage }) {
    // ✅ Check if `featuredimage` exists before generating the preview URL
    const previewUrl = featuredimage ? appwriteService.getFilePreview(featuredimage) : "/default-placeholder.png";

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full flex items-center justify-center mb-4'>
                    {featuredimage ? (
                        <img 
                            src={previewUrl} 
                            alt={title} 
                            className='rounded-xl w-full h-40 object-cover' // ✅ Ensure proper image scaling
                        />
                    ) : (
                        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-xl">
                            No Image Available
                        </div>
                    )}
                </div>
                <h2 className='text-xl font-bold text-center'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
