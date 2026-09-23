import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-1.5 pl-1 text-sm font-medium text-slate-700'>
                    {label}
                </label>
            )}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs focus-within:ring-2 focus-within:ring-indigo-500">
                        <Editor
                            apiKey={conf.tinymceApiKey || undefined}
                            value={value || defaultValue || ""}
                            init={{
                                height: 420,
                                menubar: true,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount"
                                ],
                                toolbar:
                                    "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat | help",
                                content_style: "body { font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; font-size:15px; line-height:1.6; color:#334155; }",
                                branding: false,
                            }}
                            onEditorChange={onChange}
                        />
                    </div>
                )}
            />
        </div>
    );
}
