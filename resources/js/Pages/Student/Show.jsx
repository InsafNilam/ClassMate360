import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { STUDENT_STATUS_CLASS_MAP, STUDENT_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";

export default function Show({ auth, student }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {`Student: ${student.name}`}
                </h2>
            }
        >
            <Head title={`Student ${student.name}`} />
            {/*  */}
            <div className="py-12 px-4">
                <div className="max-w-7xl mx-auto w-full bg-white shadow-md rounded-md">
                    <div className="bg-[#eee] bg-hero bg-no-repeat bg-center bg-cover h-52 md:h-60">
                        <ChevronLeftIcon
                            onClick={() => router.visit(route("student.index"))}
                            className="w-8 h-8 relative cursor-pointer left-2 top-2 text-base text-indigo-400"
                        />
                    </div>
                    <main className="p-5 pb-0">
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                {/*  */}
                                <img
                                    class="w-52 h-52 -mt-32 rounded-full border-4 border-white object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png";
                                    }}
                                    alt="Student"
                                    src={student.image}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 w-full my-4">
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-3 text-gray-900 dark:text-gray-100">
                                        <h3 className="text-emerald-500 text-2xl font-semibold">
                                            ID
                                        </h3>
                                        <p className="text-lg">{student.id}</p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-3 text-gray-900 dark:text-gray-100">
                                        <h3 className="text-emerald-500 text-2xl font-semibold">
                                            Name
                                        </h3>
                                        <p className="text-lg">
                                            {student.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-3 text-gray-900 dark:text-gray-100">
                                        <h3 className="text-emerald-500 text-2xl font-semibold">
                                            Status
                                        </h3>
                                        <p className="text-lg mt-1">
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
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-3 text-gray-900 dark:text-gray-100">
                                        <h3 className="text-emerald-500 text-2xl font-semibold">
                                            Created At
                                        </h3>
                                        <p className="text-lg">
                                            {student.created_at}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-3 text-gray-900 dark:text-gray-100">
                                        <h3 className="text-emerald-500 text-2xl font-semibold">
                                            Created By
                                        </h3>
                                        <p className="text-lg">
                                            {student.created_by.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-3 text-gray-900 dark:text-gray-100">
                                        <h3 className="text-emerald-500 text-2xl font-semibold">
                                            Updated By
                                        </h3>
                                        <p className="text-lg">
                                            {student.updated_by.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
