import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    // Example: User data fetch karne ka logic
    // Yahan apni database ya service call dalen
    return NextResponse.json({ 
        status: "success", 
        message: "User data retrieved" 
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}