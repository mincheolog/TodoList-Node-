import React from 'react';
import Footer from '@material-ui/core/AppBar';
const footer_style = {
    top : 'auto',
    bottom : 0
};
const footer = () => {
    return (
        <Footer style={footer_style}>
            Presents By Ardo
        </Footer>
    )
};

export default footer;