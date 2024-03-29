<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\User;
use App\Http\Resources\StudentResource;

class DashboardController extends Controller
{
    //
    public function index(){
        $user = auth()->user();
        $totalActiveStudents = Student::query()->where('status', 'active')->count();
        $totalInActiveStudents = Student::query()->where('status', 'inactive')->count();
        $totalInActiveUsers = User::query()->where('email_verified_at', null)->count();
        $totalUsers = User::all()->count();

        // $activeStudents = Student::query()->where('created_by', $user->id)->whereIn('status', ['active'])->limit(10)->get();
        $students = Student::query()->where('status', 'active')->where('created_by', $user->id)->limit(10)->get();
        $students = StudentResource::collection($students);

        return inertia('Dashboard', compact('totalActiveStudents', 'totalInActiveStudents', 'totalInActiveUsers', 'totalUsers', 'students'));
    }
}
