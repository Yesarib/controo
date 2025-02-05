"use client"
import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import ContentGeneration from "./tools/content-generation";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function OurTools() {
    const [value, setValue] = React.useState(0);

    const tools = [
        {
            title: "Automated Content Generation",
            desc: "Create original texts with the keywords and titles you have determined.",
            element: <ContentGeneration />
        },
        {
            title: "Content from Images",
            desc: "Analyse your uploaded photo and create appropriate content suggestions.",
            element: <> 2. tool</>
        },
        {
            title: "Content Categorisation",
            desc: "Better organise your content and get automatic category suggestions based on keywords and titles.",
            element: <> 3.tool </>
        }
    ]

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tools.map((tool, i) => (
                        <Tab label={tool.title} {...a11yProps(i)} key={i} sx={{ fontFamily: 'Raleway, sans-serif', fontWeight:'600', textTransform: 'capitalize' }}/>
                    ))}
                </Tabs>
            </Box>
            {tools.map((tool, i) => (
                <div key={i}>
                    <CustomTabPanel value={value} index={i}>
                        {tool.element}
                    </CustomTabPanel>
                </div>
            ))}
        </Box>
    );
}

export default function Tools() {
    return (
        <div className="mt-32 w-full flex flex-col justify-center items-center">
            <Typography variant="h4" sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}> Our Tools </Typography>
            <div className="w-full mt-8">
                <OurTools />
            </div>
        </div>
    )
}