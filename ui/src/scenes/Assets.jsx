import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import TrucksIcon from '@mui/icons-material/LocalShipping';
import TrailersIcon from '@mui/icons-material/LocalShipping';
import DriverIcon from '@mui/icons-material/DriveEta';
import Trucks from '../components/Assets/Trucks';
import Driver from '../components/Assets/Driver';
import Trailers from '../components/Assets/Trailers';



const navItems = [
  { text: 'Trucks', icon: <TrucksIcon />, route: '/trucks' },
  { text: 'Trailers', icon: <TrailersIcon />, route: '/trailers' },
  { text: 'Drivers', icon: <DriverIcon />, route: '/drivers' },
];

const tabContent = {
  Trucks: () => < Trucks />,
  Trailers: () => <Trailers />,
  Drivers: () => <Driver />,
};

export default function Assets() {
  const theme = useTheme();
  const [active, setActive] = React.useState(0); 
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (event, newValue) => {
    if (navItems[newValue].text === 'Logout') {
    } else {
      setActive(newValue);
    }
  };

  const TabContent = tabContent[navItems[active].text];

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Header title="ASSETS" subtitle="List of Assets" />
      <p>You are on the Assets page {user && user.name}</p>

      <Tabs
        value={active}
        onChange={handleChange}
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        {navItems.map(({ text, icon }) => (
          <Tab
            key={text}
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

      <TabContent />
    </Box>
  );
}
