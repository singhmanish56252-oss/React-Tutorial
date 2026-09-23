import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const { register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
                .slice(0, 36);
        }
        return "";
    }, []);

    const submit = async (data) => {
        setFormError("");
        setLoading(true);

        try {
            if (post) {
                // Updating existing post
                let file = null;
                if (data.image && data.image[0]) {
                    file = await appwriteService.uploadFile(data.image[0]);
                    if (file && post.featuredImage) {
                        await appwriteService.deleteFile(post.featuredImage);
                    }
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    title: data.title,
                    content: data.content,
                    status: data.status,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Creating new post
                if (!userData?.$id) {
                    throw new Error("You must be signed in to create a post.");
                }

                let fileId = "";
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) {
                        fileId = file.$id;
                    }
                }

                const dbPost = await appwriteService.createPost({
                    title: data.title,
                    content: data.content,
                    slug: data.slug,
                    status: data.status,
                    featuredImage: fileId,
                    userId: userData.$id,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.error("PostForm submit error:", error);
            if (error?.message?.includes("project_paused") || error?.code === 403) {
                setFormError("Appwrite Cloud project is currently paused due to inactivity. Please reactivate your project in the Appwrite Console to publish posts.");
            } else {
                setFormError(error?.message || "Failed to save post. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const titleRegister = register("title", { required: true });

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-6">
            {formError && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <p className="font-semibold">Notice</p>
                        <p>{formError}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Fields */}
                <div className="lg:col-span-2 space-y-5">
                    <Input
                        label="Article Title"
                        placeholder="Enter an engaging title"
                        {...titleRegister}
                        onChange={(e) => {
                            titleRegister.onChange(e);
                            if (!post) {
                                setValue("slug", slugTransform(e.target.value), { shouldValidate: true });
                            }
                        }}
                    />
                    <Input
                        label="URL Slug (Max 36 characters)"
                        placeholder="auto-generated-slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RTE 
                        label="Article Content" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")} 
                    />
                </div>

                {/* Sidebar Controls */}
                <div className="space-y-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs h-fit">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                        Publishing Details
                    </h3>

                    <Input
                        label="Cover Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
                        {...register("image", { required: !post })}
                    />

                    {post && post.featuredImage && (
                        <div className="w-full">
                            <span className="block text-xs font-medium text-slate-500 mb-1.5">Current Cover</span>
                            <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-200">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    <Select
                        options={["active", "inactive"]}
                        label="Publishing Status"
                        {...register("status", { required: true })}
                    />

                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"} 
                        className="w-full py-2.5 font-semibold text-white shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : post ? (
                            "Update Article"
                        ) : (
                            "Publish Article"
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
