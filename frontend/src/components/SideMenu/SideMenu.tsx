import React from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { IconButton, Button, Container, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SideMenuWrapperProps {
    isOpen: boolean;
}

const SideMenuWrapper = styled('div')<SideMenuWrapperProps>(({ theme, isOpen }) => ({
    width: '250px',
    height: '100vh',
    backgroundColor: 'white',
    color: 'black',
    position: 'fixed',
    top: 0,
    right: isOpen ? 0 : '-250px',
    transition: 'right 0.3s ease-in-out',
    zIndex: theme.zIndex.drawer + 1,
}));

interface SideMenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ isOpen, setIsOpen }: SideMenuProps) => {
    const theme = useTheme();

    const handleMenuClose = () => {
        setIsOpen(false);
    };

    return (
        <SideMenuWrapper theme={theme} isOpen={isOpen}>
            <Container className="flex-auto m-0 p-0">
                <div className="p-4 flex justify-between items-center">
                    <Typography variant="h6">Compbus</Typography>
                    <IconButton aria-label="close" sx={{ color: 'black' }} onClick={handleMenuClose} size="medium">
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div className="flex flex-col space-y-2">
                    <Button variant="contained" color="primary" fullWidth>
                        Option 1
                    </Button>
                    <Button variant="contained" color="primary" fullWidth>
                        Option 2
                    </Button>
                    <Button variant="contained" color="primary" fullWidth>
                        Option 3
                    </Button>
                </div>
            </Container>
        </SideMenuWrapper>
    );
};

export default SideMenu;
