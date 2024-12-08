import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  Box,
  MenuItem,
  Select,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';

interface User {
  id: string;
  name: string;
}

interface Survey {
  name: string;
  status: 'Pending' | 'Completed';
  date: string;
}

const UserSurveyCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Users fetched from the API
  const [selectedUser, setSelectedUser] = useState<string>(''); // Selected user
  const [surveys, setSurveys] = useState<Survey[]>([
    { name: 'PSQ Survey', status: 'Completed', date: 'January 12, 2021' },
    { name: 'PHQ-9 Survey', status: 'Pending', date: 'January 12, 2021' },
    { name: 'K10 Survey', status: 'Pending', date: 'January 12, 2021' },
    { name: 'GAD 7 Survey', status: 'Completed', date: 'January 12, 2021' },
    { name: 'Health Survey', status: 'Completed', date: 'January 12, 2021' },
  ]);

  const surveyOptions = ['PSQ', 'PHQ-9', 'K10', 'GAD 7', 'Health Survey', 'GAIN-SS'];
  const [selectedSurvey, setSelectedSurvey] = useState<string>(''); // Selected survey

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api.example.com/users'); // Replace with your API URL
        const fetchedUsers = response.data.map((user: any) => ({
          id: user.id,
          name: user.name,
        }));
        if (fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
        } else {
          setDefaultUsers();
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setDefaultUsers();
      }
    };

    const setDefaultUsers = () => {
      setUsers([
        { id: '1', name: 'user1' },
        { id: '2', name: 'user2' },
        { id: '3', name: 'user3' },
      ]);
    };

    fetchUsers();
  }, []);

  // Handle user selection
  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value);
    setSelectedSurvey(''); // Reset the survey dropdown
  };

  // Handle survey selection
  const handleSurveyChange = (event: SelectChangeEvent<string>) => {
    const newSurvey = event.target.value;
    setSelectedSurvey(newSurvey);

    // Add the new survey to the list
    setSurveys((prevSurveys) => [
      ...prevSurveys,
      {
        name: `${newSurvey} Survey`,
        status: 'Pending',
        date: 'December 7, 2024', // Current date for demo
      },
    ]);
  };

  return (
    <Card sx={{ width: 400, padding: 2, borderRadius: 4, boxShadow: 3 , margin:2 }}>
      {/* User Dropdown */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>U</Avatar>
        <FormControl fullWidth>
          <InputLabel>Select User</InputLabel>
          <Select value={selectedUser} onChange={handleUserChange}>
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Survey Dropdown */}
      <Box sx={{ marginBottom: 1 }}>
        <FormControl fullWidth disabled={!selectedUser}>
          <InputLabel>Select Survey</InputLabel>
          <Select value={selectedSurvey} onChange={handleSurveyChange}>
            {surveyOptions.map((survey) => (
              <MenuItem key={survey} value={survey}>
                {survey}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Surveys Section */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Surveys
        </Typography>
        <Divider sx={{ marginBottom: 1 }} />
        <List>
          {surveys.map((survey, index) => (
            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={survey.name}
                secondary={`Assigned on ${survey.date}`}
                sx={{ maxWidth: '70%' }}
              />
              <Chip
                label={survey.status}
                color={survey.status === 'Completed' ? 'success' : 'warning'}
                size="small"
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Card>
  );
};

export default UserSurveyCard;
