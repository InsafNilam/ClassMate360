import React from "react";
import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export default function Edit({ auth, student }) {
    const { data, setData, post, errors, reset } = useForm({
        image: student.image || "",
        name: student.name || "",
        status: student.status || "",
        age: student.age || "",
        _method: "PUT",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("student.update", student.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Student: {student.name}
                </h2>
            }
        >
            <Head title="Students" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <ChevronLeftIcon
                            onClick={() => router.visit(route("student.index"))}
                            className="w-8 h-8 relative cursor-pointer left-2 top-4 text-base text-indigo-400"
                        />
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm: rounded-lg"
                        >
                            {student.image && (
                                <div className="flex items-center justify-center mb-2">
                                    <img
                                        src={student.image}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
                                        }}
                                        alt="Student"
                                        className="w-52 h-52 rounded-full border-4 border-white object-cover"
                                    />
                                </div>
                            )}
                            <div>
                                <InputLabel
                                    htmlFor="student_image"
                                    value="Student Image"
                                />
                                <TextInput
                                    id="student_image"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("image", e.target.files[0])
                                    }
                                />
                                <InputError message={errors.image} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="student_name"
                                    value="Student Name"
                                />
                                <TextInput
                                    id="student_name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="student_age"
                                    value="Student Age"
                                />
                                <TextInput
                                    id="student_age"
                                    name="age"
                                    type="text"
                                    value={data.age}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("age", e.target.value)
                                    }
                                />
                                <InputError message={errors.age} />
                            </div>
                            <div>
                                <InputLabel
                                    htmlFor="student_status"
                                    value="Student Status"
                                />
                                <SelectInput
                                    id="student_status"
                                    name="status"
                                    value={data.status}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">In Active</option>
                                </SelectInput>
                                <InputError message={errors.status} />
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    type="button"
                                    onClick={() =>
                                        router.visit(route("student.index"))
                                    }
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 h-8 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 h- text-sm"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
