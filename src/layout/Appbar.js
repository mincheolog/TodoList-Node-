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
import Store from '../store/StateStore';

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
            Email_Error: false,
            Password_Error: false,
            Email : "",
            Password : "",
            Nickname : ""
        }
    };

    handleChange = {
        Email : (e) => {
            this.setState({
                Email : e.target.value
            });
        },
        password : (e) => {
            this.setState({
                Password : e.target.value
            });
        },
        Nickname : (e) => {
            this.setState({
                Nickname : e.target.value
            });
        }
    };

    handleClickOpen = () => {
        this.setState({ form_open: true });
    };

    handleClose = () => {
        this.setState({
            Email : "",
            Password : "",
            Nickname : "",
            form_open: false
        });
    };

    handleLoginOpen = () => {
        this.setState({ login_open: true });
    };

    handleLoginClose = () => {
        this.setState({
            Email : "",
            Password : "",
            login_open: false
        });
    };

    handleLogin = () => {
        if(this.state.Email == "" && this.state.Password == "") {
            this.setState({
                Email_Error : true,
                Password_Error : true
            });
        } else if(this.state.Email == "") {
            this.setState({
                Email_Error : true
            });
        } else if(this.state.Password == "") {
            this.setState({
                Password_Error : true
            });
        } else {
            axios.get('/Login', {
                params: {
                    username : this.state.Email,
                    password : this.state.Password
                }
            }).then(res => {
                if (res.data.head.status === 200) {
                    let Email = res.data.body.user;
                    let list_data = res.data.body.list_data;

                    Store.user_info.LoginUser = Email;
                    Store.user_info.LoginStatus = 1;
                    if(list_data.length > 0) {
                        this.props.SyncTodo(list_data[0].Todolist);
                        this.props.hrefAction("Re_render");
                        this.props.hrefAction("TodoList");
                    } else {
                        this.props.SyncTodo([]);
                        this.props.hrefAction("Re_render");
                        this.props.hrefAction("TodoList");
                    }
                    this.setState({
                        Email : "",
                        Password : "",
                        login_open : false
                    });
                } else if(res.data.head.status === 403) {
                    this.setState({
                        Email_Error : true,
                        Password_Error : true
                    })
                    alert("Server Not Response");
                }
            }).catch(res => { console.log(res.data) })
        }
    };

    handleLogoutOpen = () => {
        this.setState({ logout_open : true });
    };

    handleLogoutClose = () => {
        this.setState({ logout_open: false });
    };

    handleLogout = () => {
        axios.post('/todosave', {
            "Email" : Store.user_info.LoginUser,
            "Todolist" : Store.state.Todos,
            "Selected_date" : Store.state.selected_date
        }).then(res => {
            res = res.data;
            if(res.head.status = 200){
                Store.user_info.LoginUser = "";
                Store.user_info.LoginStatus = 0;
                Store.state.Todos = [];
                this.setState({ logout_open : false });
            } else {
                console.log(res.head.status);
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

    handleSynchref = (e) => {
        let href_target = e.target.getAttribute('data-value');
        if(href_target == null) {
            href_target = e.target.parentNode.getAttribute('data-value');
        }
        this.props.hrefAction(href_target);
    };

    render(){
        const sideList = (
            <div style={styles.list}>
                <List>
                    {['TodoList', 'Notice', 'Information', 'Help'].map((text, index) => (
                        <ListItem button key={text} data-value={text} onClick={this.handleSynchref}>
                            <ListItemIcon data-value={text}>{index % 2 === 0 ? <i className="fas fa-inbox"></i> : <i className="far fa-envelope"></i>}</ListItemIcon>
                            <ListItemText primary={text} data-value={text}/>
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
                            {Store.user_info.LoginUser === "" ? "" : Store.user_info.LoginUser}
                        </Typography>
                        {Store.user_info.LoginStatus === 0
                            ? <Button color="inherit" onClick={this.handleLoginOpen}>Login</Button>
                            : <Button color="inherit" onClick={this.handleLogoutOpen}>Logout</Button> }
                        {Store.user_info.LoginStatus === 0
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
                            value={this.state.Password}
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
                            label={this.state.Email_Error ? "Invaild_Email" : "Email Address"}
                            error={this.state.Email_Error}
                            type="email"
                            value={this.state.Email}
                            onChange={this.handleChange.Email}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label={this.state.Password_Error ? "Invaild_Password" : "Password"}
                            error={this.state.Password_Error}
                            type="password"
                            value={this.state.Password}
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
