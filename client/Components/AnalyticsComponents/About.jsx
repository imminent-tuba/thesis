import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const About = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <Toolbar style={{ backgroundColor: '#ff4081' }}>
      <ToolbarGroup style={{ 'margin-left': '45%' }}>
        <ToolbarTitle text="Meet the Team" style={{ 'font-size': '2em', color: 'white' }} />
      </ToolbarGroup>
    </Toolbar>

  <div style={styles.root}>
      <Card style={{ width: '110%', padding: '10px', 'padding-left': '20px', 'padding-top': '30px' }}>
        <CardMedia>
          <img src="../../assets/mark.jpg" style={{ height: '290', 'max-width': '100%', 'border-radius': '15px 50px' }} />
        </CardMedia>
        <CardTitle title="Mark Tyneway" subtitle="Software Engineer" />
        <CardText>
          Mark enjoys adventures and his growth mindset has lead him to San Francisco, where he is working as a software engineer. He enjoys learning and trying to come up with innovative ways of doing things. When he isn't working on a side project or reading HN, you'll find him at a concert or hiking.
        </CardText>
        <CardActions>
          <FlatButton secondary={true} icon={<svg aria-hidden="true" class="octicon octicon-mark-github" height="28" version="1.1" viewBox="0 0 16 16" width="28"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27 0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15 0.46 0.55 0.38C13.71 14.53 16 11.53 16 8 16 3.58 12.42 0 8 0z"></path></svg>} label="GitHub" href="https://github.com/Tynes" linkButton={true}/>
          <FlatButton secondary={true} icon={<img height='28' src='../../assets/likedin.png' />} label="LinkedIn" href="https://www.linkedin.com/in/marktyneway" linkButton={true}/>
        </CardActions>
      </Card>


      <Card style={{ width: '110%', padding: '10px', 'padding-left': '20px', 'padding-top': '30px' }}>
        <CardMedia>
          <img src="../../assets/jovani.jpg" style={{ height: '290', 'max-width': '100%', 'border-radius': '15px 50px' }} />
        </CardMedia>
        <CardTitle title="Jovani Rico" subtitle="Software Engineer" />
        <CardText>
          Jovani is software engineer with strong programming skills, strong analytical and problem solving.
          Looking to create the best experience for the users and figure out ways to build efficient and usable systems.
          He finds mind blowing the fact that with just a bunch of lines of code someone can actually create awesome stuffs that people can interact with. It's like having super powers.
        </CardText>
        <CardActions>
          <FlatButton secondary={true} icon={<svg aria-hidden="true" class="octicon octicon-mark-github" height="28" version="1.1" viewBox="0 0 16 16" width="28"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27 0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15 0.46 0.55 0.38C13.71 14.53 16 11.53 16 8 16 3.58 12.42 0 8 0z"></path></svg>} label="GitHub" href="https://github.com/jovanimtzrico" linkButton={true}/>
          <FlatButton secondary={true} icon={<img height='28' src='../../assets/likedin.png' />} label="LinkedIn" href="https://www.linkedin.com/in/jovanirico" linkButton={true}/>
        </CardActions>
      </Card>

      <Card style={{ width: '110%', padding: '10px', 'padding-left': '20px', 'padding-top': '30px' }}>
        <CardMedia>
          <img src="../../assets/jin.jpg" style={{ height: '290', 'max-width': '50%', 'border-radius': '15px 50px' }} />
        </CardMedia>
        <CardTitle title="Jin Bok" subtitle="Software Engineer" />
        <CardText>
          Jin is an engineer who loves to solve puzzles and searching for  more effiecient solutions. Jin, strongly, believes that Software Engineers impact the societies by resolving the common problems that everyday people run into.  For the current generation's tomorrow and awaking the next generations’ curisorities are the reason why Jin is passionate about programming.
        </CardText>
        <CardActions>
          <FlatButton secondary={true} icon={<svg aria-hidden="true" class="octicon octicon-mark-github" height="28" version="1.1" viewBox="0 0 16 16" width="28"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27 0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15 0.46 0.55 0.38C13.71 14.53 16 11.53 16 8 16 3.58 12.42 0 8 0z"></path></svg>} label="GitHub" href="https://github.com/devJin86" linkButton={true}/>
          <FlatButton secondary={true} icon={<img height='28' src='../../assets/likedin.png' />} label="LinkedIn" href="https://www.linkedin.com/in/jin-bok-ab921b110" linkButton={true}/>
        </CardActions>
      </Card>

      <Card style={{ width: '110%', padding: '10px', 'padding-left': '20px', 'padding-top': '30px' }}>
        <CardMedia>
          <img src="../../assets/josh.jpg" style={{ height: '290', 'max-width': '100%', 'border-radius': '15px 50px' }} />
        </CardMedia>
        <CardTitle title="Josh Wentworth" subtitle="Software Engineer" />
        <CardText>
          Avid musician and maker. Josh brings a highly creative approach to problem solving. With close to a decade of experience in interactive technologies, he has something to offer in any situation.
        </CardText>
        <CardActions>
          <FlatButton secondary={true} icon={<svg aria-hidden="true" class="octicon octicon-mark-github" height="28" version="1.1" viewBox="0 0 16 16" width="28"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27 0.68 0 1.36 0.09 2 0.27 1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.27 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.2 0 0.21 0.15 0.46 0.55 0.38C13.71 14.53 16 11.53 16 8 16 3.58 12.42 0 8 0z"></path></svg>} label="GitHub" href="https://github.com/Jdubz" linkButton={true}/>
          <FlatButton secondary={true} icon={<img height='28' src='../../assets/likedin.png' />} label="LinkedIn" href="https://www.linkedin.com/in/joshwentworth" linkButton={true}/>
        </CardActions>
      </Card>
  </div>
  </div>
);

export default About;
