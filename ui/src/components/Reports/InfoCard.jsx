// InfoCard.js
import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import FlexBetween from '../FlexBetween';

const useStyles = makeStyles((theme) => ({
  card: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: theme.palette.common.white,
    borderRadius: theme.spacing(2), // Add border radius
    boxShadow: 'none', // Remove box shadow for a flat design
    width: '100%', // Ensure cards take full width of container
    margin: theme.spacing(1), // Add spacing between cards
    display: 'flex', // Use flexbox
    flexDirection: 'column', // Stack items vertically
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  stageTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    textAlign: 'center', // Align text in the middle horizontally
  },
  stageValue: {
    fontSize: '1rem',
    color: theme.palette.grey[300],
    textAlign: 'center', // Align text in the middle horizontally
  },
}));

const InfoCard = ({ title, data }) => {
  const classes = useStyles();

  return (
    <FlexBetween>
      {/* Map over data object to render a separate card for each stage */}
      {Object.entries(data).map(([stage, value]) => (
        <Card key={stage} className={classes.card}>
          <CardContent>
            <Typography variant="subtitle1" className={classes.stageTitle}>
              {stage}
            </Typography>
            <Typography variant="body1" className={classes.stageValue}>
              {value}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </FlexBetween>
  );
};

export default InfoCard;
