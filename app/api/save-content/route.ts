import {NextRequest, NextResponse} from 'next/server';
import fs from 'fs';
import path from 'path';

// Handle the POST request
export async function POST(req: NextRequest) {
    try {
        const { content } = await req.json(); // Parse the JSON request body

        // Define the file path where the content will be saved
        const filePath = path.join(process.cwd(), 'public', 'editor-content.html');

        // Write the content to the file
        fs.writeFileSync(filePath, content, 'utf8');

        return NextResponse.json({ message: 'Content saved successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error saving content:', error);
        return NextResponse.json({ message: 'Failed to save content' }, { status: 500 });
    }
}
