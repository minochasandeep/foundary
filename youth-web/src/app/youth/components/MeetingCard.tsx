import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// MeetingCard component accepts meeting details as props
interface Meeting {
  id: string;
  startTime: string;
  endTime: string;
  peopleCount: number;
}

interface MeetingCardProps {
  meeting: Meeting;
  onDelete: (id: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onDelete }) => {
  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Meeting: {meeting.startTime} - {meeting.endTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          People: {meeting.peopleCount}
        </Typography>
      </CardContent>
      <IconButton
        onClick={() => onDelete(meeting.id)}  // Pass the meeting ID to delete the meeting
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default MeetingCard;
