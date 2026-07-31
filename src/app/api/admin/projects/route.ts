import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Project from '@/models/project';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    
    // Create the new project in MongoDB
    const newProject = await Project.create({
      projectName: body.projectName,
      category: body.category,
      projectImage: body.projectImage,
      alternate: body.alternate,
      href: body.href,
      projectDesc: body.projectDesc,
      technologies: body.technologies, // Expects an array
      detailDesc: body.detailDesc,
      challenge: body.challenge,
      solution: body.solution,
      features: body.features, // Expects an array
      result: body.result,
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all projects from MongoDB, sorted by newest first
    const projects = await Project.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}