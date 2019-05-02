import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import red from "@material-ui/core/colors/red";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
    avatar: {
        backgroundColor: red[500],
    },
});

class Notice_Card extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            [this.props.title] : "fas fa-heart"
        }
    }

    handleClickLike = (e) => {
        let title = e.target.getAttribute("data-title");
        if(title == null) {
            title = e.target.parentNode.getAttribute('data-title');
        }
        this.setState({ [title] : "fas fa-heart like"})
    };

    render(){
        const { classes } = this.props;
        return (
            <Card className={classes.card} index={this.props.index}>
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
                    title={this.props.title}
                    subheader={this.props.date}
                />
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography component="p">
                        {this.props.body}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites" data-title={this.props.title} onClick={this.handleClickLike}>
                        <i className={this.state[this.props.title]} data-title={this.props.title}></i>
                    </IconButton>
                    <IconButton aria-label="Share">
                        <i className="fas fa-share-alt"></i>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
};

Notice_Card.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default  withStyles(styles)(Notice_Card)