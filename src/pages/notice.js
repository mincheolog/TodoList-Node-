import React, { Component } from 'react';
import '../css/notice.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Store from '../store/StateStore';

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
});

function create_HTML(object) {

    let reduce_object = object.split("/*");
    reduce_object = reduce_object[1].split("*/");

    let HTML_str = reduce_object[0];

    return HTML_str;
}

class Notice extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        expanded: false,
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    render(){

        const { classes } = this.props;

        return(
            <div className="page-notice">
                <section className="page-notice-section">
                    {
                        (() => {
                            for(let i = 0; i < Store.card_index; i++){
                                <Card className={classes.card}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                                R
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton>
                                                <i className="fas fa-ellipsis-v"></i>
                                            </IconButton>
                                        }
                                        title="Shrimp and Chorizo Paella"
                                        subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image="/static/images/cards/paella.jpg"
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography component="p">
                                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                        </Typography>
                                    </CardContent>
                                    <CardActions className={classes.actions} disableActionSpacing>
                                        <IconButton aria-label="Add to favorites">
                                            <i className="fas fa-heart"></i>
                                        </IconButton>
                                        <IconButton aria-label="Share">
                                            <i className="fas fa-share-alt"></i>
                                        </IconButton>
                                        <IconButton
                                            className={classnames(classes.expand, {
                                                [classes.expandOpen]: this.state.expanded,
                                            })}
                                            onClick={this.handleExpandClick}
                                            aria-expanded={this.state.expanded}
                                            aria-label="Show more"
                                        >
                                            <i className="fas fa-angle-down"></i>
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Method:</Typography>
                                            <Typography paragraph>
                                                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                                minutes.
                                            </Typography>
                                            <Typography paragraph>
                                                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                            </Typography>
                                            <Typography paragraph>
                                                Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                                without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                                to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                                cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                                minutes more. (Discard any mussels that don’t open.)
                                            </Typography>
                                            <Typography>
                                                Set aside off of the heat to let rest for 10 minutes, and then serve.
                                            </Typography>
                                        </CardContent>
                                    </Collapse>
                                </Card>
                            }
                        })
                    }
                </section>
            </div>
            );
    }
}

Notice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notice)