import {Group, Paper, Text, Image} from "@mantine/core";

function AppLink({logo_url, link_dest, description}: {logo_url: string, link_dest: string, description: string}) {
    return (
        <Paper style={{"cursor": "pointer"}} shadow="md" p="sm" radius="md" withBorder={true} onClick={() => {window.location.href = link_dest}}>
            <Group justify="left" grow>
                <Image src={logo_url} h={50} />
                <Text>
                    {description}
                </Text>
            </Group>
        </Paper>
    );
}

export default function AppLinks() {
    return (
        <Group justify="center" grow>
            <AppLink logo_url={"/images/taiga-2.svg"} link_dest={"https://projects.benwilliamson.org"} description={"Project Management"}/>
            <AppLink logo_url={"/images/github-mark.svg"} link_dest={"https://github.com/ben-williamson/"} description={"Github Homepage"}/>
            <AppLink logo_url={"/images/logo512.png"} link_dest={"https://benwilliamson.org"} description={"Personal Website"}/>
            <AppLink logo_url={"/images/manifesto.png"} link_dest={"https://manifestoNLP.benwilliamson.org"} description={"ManifestoNLP"}/>
        </Group>
    )
}