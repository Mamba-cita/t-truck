import React from 'react';
import Box from '@mui/material/Box';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Completed from '../components/Invoice/Completed';
import Invoiced from '../components/Invoice/Invoiced';
import Paid from '../components/Invoice/Paid';
import Due from '../components/Invoice/Due';



const navItems = [
  { text: 'Completed', icon: <MonetizationOnOutlinedIcon />, route: '/completed' },
  { text: 'Invoiced', icon: <PaymentsOutlinedIcon />, route: '/invoiced' },
  { text: 'Due', icon: <AccountBalanceWalletOutlinedIcon />, route: '/due' },
  { text: 'Paid', icon: <PaidOutlinedIcon />, route: '/paid' },

];

const tabContent = {
  Completed: () => <Completed />,
  Invoiced: () => <Invoiced />,
  Due: () => <Due />,
  Paid: () => <Paid />,

};



export default function Transactions() {
  const [active, setActive] = React.useState(0); 
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.moves);

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

  if (isLoading) {
    return <Spinner />;
  }
  

  return (
    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Header title="Transactions" />
      <p>You are on the Invoicing page {user && user.name}</p>

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
