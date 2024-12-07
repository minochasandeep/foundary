import React, { useState } from 'react';
import MeetingCard from './MeetingCard';
import { Grid, Button, Box } from '@mui/material';

const MeetingList = () => {
  // Sample meeting data
  const initialMeetings = [
    { id: '1', startTime: '9:00 AM', endTime: '10:00 AM', peopleCount: 5 },
    { id: '2', startTime: '11:00 AM', endTime: '12:00 PM', peopleCount: 8 },
    { id: '3', startTime: '1:00 PM', endTime: '2:00 PM', peopleCount: 3 },
  ];

  const [meetings, setMeetings] = useState(initialMeetings);

  // Handle delete of a meeting
  const handleDelete = (id: string) => {
    setMeetings(meetings.filter(meeting => meeting.id !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {meetings.map((meeting) => (
          <Grid item xs={12} key={meeting.id}>
            <MeetingCard meeting={meeting} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MeetingList;
