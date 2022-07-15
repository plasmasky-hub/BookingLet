import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const loginImageStyle = {
	display: 'flex',
	flexDirection: 'row',
	position: 'absolute',
	top: '50%',
	left: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	transform: 'translate(-50%, -50%)',
	// width: '0.6rem',
	// height: '0.5vh',
	bgcolor: 'background.paper',
	borderRadius: '25px',
	// border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const loginFormStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	transform: 'translate(-50%, -50%)',
	// width: '0.6rem',
	// height: '0.5vh',
	bgcolor: 'background.paper',
	borderRadius: '25px',
	// border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export const Login = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={loginImageStyle}>
					<Typography>
						This is image.
					</Typography>
				</Box>
				<Box sx={loginFormStyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Login
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
