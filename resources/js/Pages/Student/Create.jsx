import React from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth }) {
    const { data, setData, post, errors, reset } = useForm({
        image: "",
        name: "",
        status: "",
        age: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("student.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Add New Student
                </h2>
            }
        >
            <Head title="Students" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm: rounded-lg"
                        >
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
                                <Link
                                    href={route("student.index")}
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 h-10 text-sm"
                                >
                                    Cancel
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 h-10 text-sm">
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
