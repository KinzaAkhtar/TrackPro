import React from 'react';
import { Box, Typography, Grid, Chip, Paper, Stack, IconButton } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const TaskDetails = () => {
  return (
    <Box className="container mx-auto p-6">
      {/* Page Title */}
      <div className="mb-6 text-center">
        <Typography variant="h4" className="font-semibold text-gray-800">Task Detail</Typography>
      </div>

      {/* Details Grid */}
      <Grid container spacing={4}>
        {/* Task Title */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Task Title
            </Typography>
            <Typography variant="body2" className="text-gray-500">Fix Bug in Homepage</Typography>
          </Paper>
        </Grid>
        
        {/* Task Description */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Task Description
            </Typography>
            <Typography variant="body2" className="text-gray-500">Fix the responsive issue on the homepage</Typography>
          </Paper>
        </Grid>

        {/* Department */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Department
            </Typography>
            <Typography variant="body2" className="text-gray-500">Video</Typography>
          </Paper>
        </Grid>

        {/* Task Type */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Task Type
            </Typography>
            <Typography variant="body2" className="text-gray-500">Book Trailer</Typography>
          </Paper>
        </Grid>

        {/* Priority Chip */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Priority
            </Typography>
            <Chip label="High" color="error" size="small" className="text-gray-700" />
          </Paper>
        </Grid>

        {/* Deadline Date */}
        <Grid item xs={12} md={6}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Deadline Date
            </Typography>
            <Typography variant="body2" className="text-gray-500">09/14/2024</Typography>
          </Paper>
        </Grid>

        {/* Attachments Section */}
        <Grid item xs={12}>
          <Paper className="p-4 shadow-lg rounded-md">
            <Typography 
              variant="body1" 
              className="text-gray-700" 
              sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}
            >
              Attachments
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" className="mt-2">
              <img src="/assets/icons/files/ic_pdf.svg" alt="Document Preview" className="w-16 h-16 object-cover" />
              <IconButton size="small" href="/path-to-file/Architectural-Structural-Holabird-Bid-Set-Drawings-41-50.pdf" download>
                <DownloadIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskDetails;
