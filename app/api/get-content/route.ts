import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Define the path to the file where the content is saved
        const filePath = path.join(process.cwd(), 'public', 'editor-content.html');

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Read the file content
            const content = fs.readFileSync(filePath, 'utf8');
            return NextResponse.json({ content }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'File not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error reading file:', error);
        return NextResponse.json({ message: 'Error retrieving content' }, { status: 500 });
    }
}
