import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 140,
  },
});

export default function Feed() {

  const classes = useStyles();

  return (
    <div align='center'>
      <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://images.squarespace-cdn.com/content/v1/568dcb0e5a5668ae353cb7cb/1554727711396-PUVETY2EM19FQ9GF8QLI/ke17ZwdGBToddI8pDm48kA4m8qmNZoG4lWcDJYML1ugUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc4Kx_jTOHIpWAlgNxSwfz8vbLh4bvYLN9M00ZcvsSh_7SpFucY9QTPtSsCbazONCa/rural-program-logo.png?format=750w"
              title="Rural Program"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Rural Program
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Apply for TLG Rural Program now!
              </Typography>
            </CardContent>
          </CardActionArea>
          
          <CardActions>
            <Button size="small" color="primary" href='/apply'>
              Apply
            </Button>
          </CardActions>
        </Card>
        <br></br>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://images.squarespace-cdn.com/content/v1/568dcb0e5a5668ae353cb7cb/1554659661619-GDUP2KGSUGI4P7DL8SIY/ke17ZwdGBToddI8pDm48kA4m8qmNZoG4lWcDJYML1ugUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKc4Kx_jTOHIpWAlgNxSwfz8vbLh4bvYLN9M00ZcvsSh_7SpFucY9QTPtSsCbazONCa/eMentor.png?format=750w"
              title="E-mentor"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                E-mentor
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Apply for TLG E-mentor Program now!
              </Typography>
            </CardContent>
          </CardActionArea>
          
          <CardActions>
            <Button size="small" color="primary" href='/apply'>
              Apply
            </Button>
          </CardActions>
        </Card>
    </div>
  );
}
