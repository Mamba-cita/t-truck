import { Box, Card, CardContent, Typography } from '@mui/material';
import TrucksIcon from '@mui/icons-material/LocalShipping';
import TrailersIcon from '@mui/icons-material/LocalShipping';
import DriverIcon from '@mui/icons-material/DriveEta';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import Events from './Events';
import Data from './Data';
import Documents from './Documents';
import { useSelector } from 'react-redux';

const navItems = [
    { id: 'events', text: 'Events', icon: <TrucksIcon /> },
    { id: 'data', text: 'Data', icon: <TrailersIcon /> },
    { id: 'documents', text: 'Documents', icon: <DriverIcon /> },
];

export default function MovesInfoBottom() {
    const [active, setActive] = React.useState(0);
    const { moves } = useSelector((state) => state.moves);

    const handleChange = (event, newValue) => {
        setActive(newValue);
    };

    const tabContent = {
        events: <Events moves={moves} />,
        data: <Data moves={moves}/>,
        documents: <Documents />,
    };

    return (
        <div>
            {moves.map(move => (
                <Card key={move.id} variant="outlined" style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Tabs
                            value={active}
                            onChange={handleChange}
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            {navItems.map(({ id, text, icon }) => (
                                <Tab
                                    key={id}
                                    label={
                                        <>
                                            {icon && (
                                                <Box component="span" sx={{ mr: 1 }}>
                                                    {icon}
                                                </Box>
                                            )}
                                            <Typography variant="body1">{text}</Typography>
                                        </>
                                    }
                                />
                            ))}
                        </Tabs>
                        {tabContent[navItems[active].id]}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
