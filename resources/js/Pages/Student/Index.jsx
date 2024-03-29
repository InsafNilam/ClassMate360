import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { STUDENT_STATUS_CLASS_MAP, STUDENT_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, router } from "@inertiajs/react";

import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, students, queryParams = null, success }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("student.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }

        router.get(route("student.index"), queryParams);
    };

    const deleteStudent = (student) => {
        if (
            !window.confirm(
                `Are you sure you want to delete the Student: ${student.name}?`
            )
        ) {
            return;
        }
        router.delete(route("student.destroy", student.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Students
                    </h2>
                    <Link
                        href={route("student.create")}
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Students" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid grid-cols-3 gap-2 mb-2">
                                <TextInput
                                    defaultValue={queryParams.name}
                                    className="w-full"
                                    placeholder="Student Name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                                <SelectInput
                                    defaultValue={queryParams.status}
                                    className="w-full"
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">In Active</option>
                                </SelectInput>
                            </div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sort_field={queryParams.sort_field}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <TableHeading
                                            name="image"
                                            sortable={false}
                                        >
                                            Image
                                        </TableHeading>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Name
                                        </TableHeading>
                                        <TableHeading
                                            name="age"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Age
                                        </TableHeading>
                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Status
                                        </TableHeading>
                                        <TableHeading
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={
                                                queryParams.sort_direction
                                            }
                                            sortChanged={sortChanged}
                                        >
                                            Created Date
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            Created By
                                        </TableHeading>
                                        <TableHeading sortable={false}>
                                            Actions
                                        </TableHeading>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.data.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <td className="px-3 py-3">
                                                {student.id}
                                            </td>
                                            <td className="px-3 py-3">
                                                <img
                                                    src={student.image}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src =
                                                            "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
                                                    }}
                                                    alt="Student"
                                                    width="40"
                                                    height="40"
                                                    className="object-cover rounded-full fill-white"
                                                />
                                            </td>
                                            <td className="px-3 py-3 text-gray-100 text-nowrap hover:underline">
                                                <Link
                                                    href={route(
                                                        "student.show",
                                                        student.id
                                                    )}
                                                >
                                                    {student.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.age}
                                            </td>
                                            <td className="px-3 py-3">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-white w-full text-center " +
                                                        STUDENT_STATUS_CLASS_MAP[
                                                            student.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        STUDENT_STATUS_TEXT_MAP[
                                                            student.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-3 text-nowrap">
                                                {student.created_at}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.created_by.name}
                                            </td>
                                            <td className="px-3 py-3">
                                                <Link
                                                    href={route(
                                                        "student.edit",
                                                        student.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteStudent(student)
                                                    }
                                                    href={route(
                                                        "student.destroy",
                                                        student.id
                                                    )}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={students.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
