import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class TodoAppbar extends  React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            form_open : false,
            login_open : false,
            server_status: "none"
        };
    }
    handleClickOpen = () => {
        this.setState({ form_open: true });
    };

    handleClose = () => {
        this.setState({ form_open: false });
    };

    handleLoginOpen = () => {
        this.setState({ login_open: true});
    };

    handleLoginClose = () => {
        this.setState({ login_open: false});
    };

    render(){
        return (
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar
                        color='primary'
                    >
                        <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
                            <i className="fas fa-bars"></i>
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                            TodoList Web Application
                        </Typography>
                        <Typography variant="h6" color="inherit" style={styles.grow} align='center'>
                            Server Status : {this.state.server_status}
                        </Typography>
                        <Button color="inherit" onClick={this.handleLoginOpen}>Login</Button>
                        <Button color="inherit" onClick={this.handleClickOpen}>Sign Up</Button>
                    </Toolbar>
                </AppBar>
                <Dialog
                    open={this.state.form_open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.login_open}
                    onClose={this.handleLoginClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLoginClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLoginClose} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TodoAppbar;
