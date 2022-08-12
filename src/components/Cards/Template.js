import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ResourceDatagrid from '../Datagrid/ResourceDatagrid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResourceAreaChart from '../Charts/AreaChart';


const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your System Inventory is Healthy
        </Typography>
        <Typography variant="h5" component="div">
            23
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Active Setups
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">More Details</Button>
      </CardActions>
    </React.Fragment>
  );

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  export default function Chart() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          {card}
            <CardActions disableSpacing>
              <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              >
              <ExpandMoreIcon />
              </ExpandMore>
          </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <ResourceDatagrid />  
          </CardContent>
        </Collapse>
        </Card>
      </Box>
    );
  }