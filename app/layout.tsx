// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/notifications/styles.css';

import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import {Notifications} from "@mantine/notifications";

export const metadata = {
    title: 'New Tab'
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript/>
            </head>
            <body>
                <MantineProvider>
                    <Notifications />
                    {children}
                </MantineProvider>
            </body>
        </html>
    );
}