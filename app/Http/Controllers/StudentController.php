<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Storage;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Student::query();
        $sortField = request('sort_field', 'created-at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')){
            $query->where('name',"like", "%". request('name') ."%");
        }
        if(request('status')){
            $query->where('status', request('status'));
        }
        $students = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Student/Index', [
            "students" => StudentResource::collection($students),
            'queryParams' => request()->query()?:null,
            'success'=> session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('Student/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        //
        $data = $request -> validated();
        
        $image =$data['image'] ?? null;
        // Print the Data
        // dd($data);
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if($image){
            $data['image'] = $image->store('student/'.Str::random(), 'public');
        }

        Student::create($data);
        return to_route('student.index')->with('success', "Student has been Created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        //
        return inertia('Student/Show', [
            "student" => new StudentResource($student),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
        return inertia('Student/Edit', [
            "student" => new StudentResource($student),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        //
        $data = $request->validated();
        $image =$data['image'] ?? null;
        // dd($data);
        $data['updated_by'] = Auth::id();
        if($image){
            if($student->image){
                Storage::disk('public')->deleteDirectory(dirname($student->image));
            }
            $data['image'] = $image->store('student/'.Str::random(), 'public');
        }
        $student->update($data);
        return to_route('student.index')->with('success', "Student \"$student->name\" was Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
        $name = $student->name;
        $student->delete();
        if($student->image){
            Storage::disk('public')->deleteDirectory(dirname($student->image));
        }
        return to_route('student.index')->with('success', "Student \"$name\" was deleted");
    }
}
