import React, { useCallback } from "react"; 
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log("Form Data Before Upload:", data); // Debugging

        // Upload image file if exists
        let file = null;
        if (data.image && data.image.length > 0) {
            file = await appwriteService.uploadFile(data.image[0]);
            console.log("Uploaded File:", file); // Debugging
        }

        if (file && file.$id) {
            data.featuredimage = file.$id;
        } else if (!post) {
            console.warn("No file uploaded or file upload failed.");
            return;
        }
        console.log("Final Data to be Sent to Appwrite:", data); // Debugging

        let dbPost;
        if (post) {
            dbPost = await appwriteService.updatePost(post.$id, { ...data });
        } else {
            dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });
        }

        console.log("Database Response:", dbPost); // Debugging

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row gap-6 p-6 bg-white shadow-lg rounded-lg">
            {/* Left Side */}
            <div className="flex-1 space-y-4">
                <Input
                    label="Title :"
                    placeholder="Enter Post Title"
                    className="w-full"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Post Slug"
                    className="w-full"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>

            {/* Right Side */}
            <div className="flex-1 space-y-4">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="w-full"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full">
                        <img
                            src={appwriteService.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg shadow-md w-full h-40 object-cover"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="w-full"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : "bg-blue-500"} className="w-full text-white py-3 rounded-lg">
                    {post ? "Update Post" : "Submit Post"}
                </Button>
            </div>
        </form>
    );
}
