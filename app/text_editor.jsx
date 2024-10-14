'use client';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

import { useEffect } from "react";

export function TextEditor() {

    const content = "";

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content,
    });

    const fetchEditorContent = async () => {
        try {
            const response = await fetch('/api/get-content'); // Fetch from API route
            if (response.ok) {
                const data = await response.json();
                editor?.commands.setContent(data.content);
            } else {
                console.error('Failed to fetch content');
            }
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    };

    // Use useEffect to fetch content on component mount
    useEffect(() => {
        fetchEditorContent();
    }, [editor]);

    const saveContentToServer = async (content) => {
        try {
            const response = await fetch('/api/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }), // Send content to API route
            });

            if (response.ok) {
                console.log('Content saved successfully!');
            } else {
                console.error('Failed to save content');
            }
        } catch (error) {
            console.error('Error saving content:', error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                event.preventDefault();
                console.log('Saving editor content...');
                const editorContent = editor.getHTML();
                console.log(editorContent);
                saveContentToServer(editorContent);
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [editor]);

    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
        </RichTextEditor>
    );
}