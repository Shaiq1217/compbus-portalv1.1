import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, CssBaseline, Theme, useTheme, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { useScrollTrigger } from '@mui/material';
import clsx from 'clsx';
import SideMenu from '../SideMenu/SideMenu';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const height = 'auto'

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  height: height, // Decrease the height of the AppBar
  '&.default': {
    backgroundColor: '#ffffff', // Transparent background
    boxShadow: 'none',

  },
  '&.elevated': {
    backgroundColor: '#22333b', // Black background when scrolled
    boxShadow: theme.shadows[4],

  },
}));

interface TopBarProps {
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;

}
const TopBar = ({ setSearch }: TopBarProps) => {
  const navigate = useNavigate();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });
  const baseColor = trigger ? 'white' : 'black'; // Change color based on elevation
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenuOpen = () => {
    setIsOpen(true);
  }
  const handleSearchDisplay = () => {
    setSearch(true);
  }
  const handleNavigateToBasePage = () => {
    navigate('/');
  }

  return (
    <>
      <CssBaseline />
      <StyledAppBar
        position="fixed"
        className={clsx({
          elevated: trigger,
          default: !trigger,
        })}
      >
        <div className="flex items-center mx-10 my-1">
          <Typography variant="body1" component="div" sx={{ flexGrow: 1, color: baseColor }}>
            <Box>
              <Link onClick={handleNavigateToBasePage} sx={{
                textDecoration: 'none',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}>Compbus</Link>
            </Box>
          </Typography>
          <div className="flex items-center">
            <div className="relative">
              <IconButton sx={{ color: baseColor }} aria-label="search" size='small' onClick={() => handleSearchDisplay()}>
                <SearchIcon fontSize='small' />
              </IconButton>
            </div>
            <IconButton sx={{ color: baseColor }} aria-label="menu" size='small' onClick={handleMenuOpen}>
              <MenuIcon fontSize='small' />
            </IconButton>
          </div>
          <SideMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </StyledAppBar>
    </>
  );
};



export default TopBar;
