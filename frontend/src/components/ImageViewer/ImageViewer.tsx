import React from 'react';
import { Box, IconButton, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ImageViewerProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageViewer = ({ imageUrl, onClose }: ImageViewerProps) => {
    return (
        <Backdrop open={true} onClick={onClose} sx={{ zIndex: 1000 }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="10vh"
                height="100vh"

                onClick={(e) => e.stopPropagation()}
                sx={{ position: 'relative' }}
            >
                <img src={imageUrl} alt="Product" style={{ maxHeight: '80vh', maxWidth: '90vw' }} />
            </Box>
        </Backdrop>
    );
};

export default ImageViewer;
