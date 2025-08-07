// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import {Dayjs} from "dayjs";
// import {useState} from "react";
//
// type pipeLineType = {
//     note: number,
//     fund: number,
//     insurance: number
// }
//
// type dealsType = {
//     note: number,
//     fund: number,
//     insurance: number
// }
//
// type CallModalPropsType = {
//     date?: Dayjs;
//     type?: string;
//     pipeline?: pipeLineType
//     deals?: dealsType
//     rejectNote?: boolean;
//     fundOffered?: boolean;
//     withPM?: boolean;
//     callModalOpen: boolean;
//     onClose: () => void;
// }
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };
//
// export const CallModal = (
//     {callModalOpen, onClose}: CallModalPropsType
//
// ) => {
//
//
//
//
//     return (
//         <div>
//
//             <Modal
//                 open={callModalOpen}
//                 onClose={onClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         Text in a modal
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//                     </Typography>
//                     <Button onClick={onClose}>Close</Button>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }
//
//
