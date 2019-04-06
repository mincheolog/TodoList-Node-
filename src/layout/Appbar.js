import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

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
    list: {
        width: 250,
    },
};

class TodoAppbar extends  React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            form_open: false,
            login_open: false,
            logout_open: false,
            left: false,
            Email: "",
            Password: "",
            Nickname: "",
            LoginUser: "",
            LoginStatus: 0,
            Email_Error: false,
            Password_Error: false
        }
    };

    handleChange = {
        Email : (e) => {
        this.setState({
                Email : e.target.value
            })
        },
        password : (e) => {
            this.setState({
                Password : e.target.value
            })
        },
        Nickname : (e) => {
            this.setState({
                Nickname : e.target.value
            })
        }
    };

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

    handleLogin = () => {
        axios.get('/Login', {
            params: {
                username : this.state.Email,
                password : this.state.Password
            }
        }).then(res => {
            console.log(res);
            if (res.data.status === 200) {
                this.setState({
                    LoginUser : res.data.user.Email,
                    LoginStatus : 1,
                    login_open : false,
                    Email : "",
                    Password : ""
                });
<<<<<<< HEAD
                this.props.setTodoitem(res.data.list_data[0].Todolist,res.data.user.Email);
=======
                this.props.setTodoitem(res.data.list_data[0].Todolist)
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
            } else if(res.data.status === 403) {
                this.setState({
                    Email_Error : true,
                    Password_Error : true
                })
            } else {
                if (res.data.success === 0) {
                    this.setState({
                        Email_Error : true
                    })
                } else if (res.data.success === 2) {
                    this.setState({
                        Password_Error : true
                    })
                } else {
                    this.setState({
                        Email_Error : true,
                        Password_Error : true
                    })
                }
            }
        }).catch(response => { console.log(response.data) })
    };

    handleLogoutOpen = () => {
        this.setState({ logout_open : true });
    };

    handleLogoutClose = () => {
        this.setState({ logout_open: false });
    };

    handleLogout = () => {
        axios.post('/todosave', {
            "Email" : this.state.LoginUser,
            "Todolist" : this.props.todos
        }).then(res => {
            if(res.status = 200){
                this.setState({
                    LoginUser : "",
                    LoginStatus : 0,
                    logout_open : false
                });
<<<<<<< HEAD
                this.props.setTodoitem([], '');
=======
                this.props.setTodoitem([]);
>>>>>>> 9f476ac398aecce93e849a4b94fdc029ccef76cb
            } else {
                console.log(res.status);
            }
        }).catch(res => { console.log(res) });
    };

    handleSubscrible = () => {
        axios.post('/Submit', {
            "Email" : this.state.Email,
            "Password" : this.state.Password
        }).then(res => {
            console.log(res)
            this.setState({
                Email : "",
                Password : "",
                form_open : false
            })
        }).catch(res => { console.log(res) })
    };

    handleOpenSideMenu = (side, open) => () => {
        this.setState({
            [side] : open
        });
    };

    render(){
        const sideList = (
            <div style={styles.list}>
                <List>
                    {['Notice', 'Information', 'Help'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <i className="fas fa-inbox"></i> : <i className="far fa-envelope"></i>}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Profile', 'Edit User'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <i className="fas fa-inbox"></i> : <i className="far fa-envelope"></i>}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
        return (
            <div style={styles.root}>
                <Drawer open={this.state.left} onClose={this.handleOpenSideMenu('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.handleOpenSideMenu('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
                <AppBar position="static">
                    <Toolbar
                        color='primary'
                    >
                        <IconButton style={styles.menuButton} color="inherit" aria-label="Menu" onClick={this.handleOpenSideMenu('left', true)}>
                            <i className="fas fa-bars"></i>
                        </IconButton>
                        <Typography variant="h6" color="inherit" style={styles.grow}>
                            TodoList Web Application
                        </Typography>
                        <Typography variant="h6" color="inherit" align="center" style={styles.grow}>
                            {this.state.LoginUser === "" ? "" : this.state.LoginUser}
                        </Typography>
                        {this.state.LoginStatus === 0
                            ? <Button color="inherit" onClick={this.handleLoginOpen}>Login</Button>
                            : <Button color="inherit" onClick={this.handleLogoutOpen}>Logout</Button> }
                        {this.state.LoginStatus === 0
                            ? <Button color="inherit" onClick={this.handleClickOpen}>Sign Up</Button>
                            : "" }
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
                            value={this.state.Email}
                            onChange={this.handleChange.Email}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="nickname"
                            label="NickName"
                            type="NickName"
                            value={this.state.Nickname}
                            onChange={this.handleChange.Nickname}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange.password}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubscrible} color="primary">
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
                            id="Email"
                            label="Email Address"
                            error={this.state.Email_Error}
                            type="email"
                            value={this.state.Email}
                            onChange={this.handleChange.Email}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
                            error={this.state.Password_Error}
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange.password}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLoginClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLogin} color="primary">
                            Login
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.logout_open}
                    onClose={this.handleLogoutClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Logout</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you Really want to logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLogoutClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleLogout} color="primary">
                            Logout
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TodoAppbar;
