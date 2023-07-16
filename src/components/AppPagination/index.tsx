import { Box, Pagination } from '@mui/material';

const AppPagination = () => {
  return (
    <Box justifyContent={'center'} alignItems={'center'} display={'flex'} sx={{ margin: 2 }}>
      <Pagination count={1} />
    </Box>
  );
};

export default AppPagination;
