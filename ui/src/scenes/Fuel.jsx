import React from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import EvStationIcon from '@mui/icons-material/EvStation';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Requested from '../components/Fuel/Requested';
import Fueled from '../components/Fuel/Fueled';




const navItems = [
  { text: 'Requested', icon: <EvStationIcon />, route: '/requested' },
  { text: 'Fueled', icon: <LocalGasStationIcon />, route: '/fueled' },
];

const tabContent = {
    Requested: () => <Requested />,
  Fueled: () => <Fueled />,
};

export default function Fuel() {
  const [active, setActive] = React.useState(0); 
  const { user, isLoading } = useSelector((state) => state.auth);
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
  if (isLoading) {
    return <Spinner />;
  }

  const TabContent = tabContent[navItems[active].text];

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Header title="FUEL" subtitle="Fuel Request List" />
      <p>You are on the Fueling page {user && user.name}</p>

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
