'use client';

import {Title, Stack, Container, Center, Space, Input} from "@mantine/core"
import {TextEditor} from "@/app/text_editor";
import {IconSearch} from '@tabler/icons-react';
import {useState} from "react";
import AppLinks from "@/app/app_links";

export default function Home() {
    const [searchInput, setSearchInput] = useState('');

    return <Container>
        <Stack>
            <Space h={"20vh"}/>
            <Center>
                <Title size={"3rem"}>New Tab</Title>
            </Center>
            <Space h="sm"/>
            <Input placeholder="Search" size="md" radius="md"
                   leftSection={<IconSearch size={16}/>} autoFocus
                   value={searchInput}
                   onChange={(e) => setSearchInput(e.target.value)}
                   onKeyDown={
                        (event) => {
                            if (event.key === "Enter") {
                                window.location.href = "http://www.google.com/search?q=" + encodeURIComponent(searchInput);
                            }
                        }
            }/>
            {/*<Space h="xl"/>*/}
            <AppLinks/>
            <Space h={"xl"}/>
            <TextEditor/>
        </Stack></Container>;
}
