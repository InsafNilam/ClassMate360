import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { STUDENT_STATUS_CLASS_MAP, STUDENT_STATUS_TEXT_MAP } from "@/constants";
import { Head } from "@inertiajs/react";

export default function Dashboard({
    auth,
    totalActiveStudents,
    totalInActiveStudents,
    totalInActiveUsers,
    totalUsers,
    students,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-500 text-2xl font-semibold">
                                InActive Students
                            </h3>
                            <p className="text-lg mt-4">
                                <span className="mr-2">
                                    {totalInActiveStudents}
                                </span>
                                /
                                <span className="ml-2">
                                    {totalActiveStudents +
                                        totalInActiveStudents}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-emerald-500 text-2xl font-semibold">
                                Active Students
                            </h3>
                            <p className="text-lg mt-4">
                                <span className="mr-2">
                                    {totalActiveStudents}
                                </span>
                                /
                                <span className="ml-2">
                                    {totalActiveStudents +
                                        totalInActiveStudents}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-500 text-2xl font-semibold">
                                Total Active Users
                            </h3>
                            <p className="text-lg mt-4">
                                <span className="mr-2">
                                    {totalUsers - totalInActiveUsers}
                                </span>
                                /<span className="ml-2">{totalUsers}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 text-xl font-semibold mb-2">
                                My Students
                            </h3>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="">
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">
                                            Created By
                                        </th>
                                    </tr>
                                </thead>
                                <thead>
                                    {students.data.map((student) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-3">
                                                {student.id}
                                            </td>
                                            <td className="px-3 py-3">
                                                {student.name}
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
                                            <td className="px-3 py-3">
                                                {student.created_by.name}
                                            </td>
                                        </tr>
                                    ))}
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
