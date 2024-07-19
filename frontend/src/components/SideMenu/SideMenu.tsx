import React from 'react';
import { styled, Theme, useTheme } from '@mui/material/styles';
import { IconButton, Button, Container, Typography, Divider, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DescriptionIcon from '@mui/icons-material/Description';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate } from 'react-router-dom';

interface SideMenuWrapperProps {
    isOpen: boolean;
}

const SideMenuWrapper = styled('div')<SideMenuWrapperProps>(({ theme, isOpen }) => ({
    width: '250px',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
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
    const navigate = useNavigate();
    const buttonStyles = {
        justifyContent: 'flex-start',
        padding: '1rem',
        color: 'white',
        textTransform: 'none', // Normal case text
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    };
    const handleMenuClose = () => {
        setIsOpen(false);
    };

    const handleLogout = () => {
        // Implement logout functionality here
    };

    const handleNavigation = (endpoint: string) => {
        navigate(endpoint);
    }
    return (
        <SideMenuWrapper theme={theme} isOpen={isOpen}>
            <Container className="flex-auto m-0 p-0 h-full">
                <div className="p-4 flex justify-between items-center">
                    <Typography variant="h6">Compbus</Typography>
                    <IconButton aria-label="close" sx={{ color: 'white' }} onClick={handleMenuClose} size="medium">
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div className="flex flex-col space-y-2 flex-grow h-[85%] justify-between">
                    <div className=' space-y-4'>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<AccountCircleIcon />}
                            sx={buttonStyles}
                        >
                            My Account
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<SettingsIcon />}
                            sx={buttonStyles}
                        >
                            Settings
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<DescriptionIcon />}
                            sx={buttonStyles}
                        >
                            Documents
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<CloudUploadIcon />}
                            sx={buttonStyles}
                        >
                            Upload
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<AddShoppingCartIcon />}
                            sx={buttonStyles}
                            onClick={() => handleNavigation('/cart')}
                        >
                            Cart
                        </Button>
                    </div>

                    <Box>
                        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<ExitToAppIcon />}
                            sx={{ ...buttonStyles, marginTop: '1rem' }}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Box>
                </div>
            </Container>
        </SideMenuWrapper >
    );
};

export default SideMenu;
