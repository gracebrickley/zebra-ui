import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PieChart from '../Charts/PieChart';

const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Systems in high priority
        </Typography>
        <Typography variant="h5" component="div">
            45
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Resources
        </Typography>
        <PieChart />
      </CardContent>
      <CardActions>
        <Button size="small">More Details</Button>
      </CardActions>
    </React.Fragment>
  );
  
  export default function Status() {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    );
  }