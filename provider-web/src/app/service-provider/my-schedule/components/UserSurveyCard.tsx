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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';



interface User {
  CENTRE_ID: string;
  CLIENT_ID: string;
  DOB: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  PHN: string;
}

interface Survey {
    name: string;
    status: string;
    date: string;
  }
  

interface Subject {
  location: string;
}

const UserSurveyCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<string>('');
  const [centers, setCenters] = useState<string[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('error');

  const fetchSubjects = async (center?: string) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/toolbox/survey-forms`;
      const response = await axios.get(url, {timeout: 10000} );
      console.log('Subjects fetched:', response);
      setSubjects(response.data.data.forms);
      setError(null);
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError('Failed to load subjects');
    }
  };

  const fetchUsers = async (selectedCenter: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/toolbox/subjects`,
        { centreID: selectedCenter },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000
        },
      );
      console.log('Fetched users:', response);
      setUsers(response.data.data.subjects.results);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCenters = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/toolbox/centers`,{ timeout: 10000 });
     console.log("Response center::");
     
      if (response.data.status === "success") {
        setCenters(response.data.data.locations);
      }
    } catch (error) {
      console.error('Error fetching centers:', error);
      setCenters(['center1', 'center2']);
    }
  };

  useEffect(() => {
    fetchCenters();
    fetchSubjects();
  }, []);

  const handleCenterChange = (event: SelectChangeEvent<string>) => {
    const center = event.target.value;
    setSelectedCenter(center);
    fetchUsers(center);
    fetchSubjects(center); // Fetch subjects when center changes
  };

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value);
    setSelectedSurvey('');
  };

  const handleSurveyChange = (event: SelectChangeEvent<string>) => {
    setSelectedSurvey(event.target.value);
    setDialogOpen(true); // Open confirmation dialog
  };
 
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const fetchInitiatedSurveys = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/toolbox/initiated`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // Set timeout for the request
        }
      );
      console.log("Initiated surveys fetched:", response);
  // Transform API data to match Survey interface
  const mappedSurveys: Survey[] = response.data.data.map((item: any) => ({
    name: item.acronym || 'Unknown Survey', // Use a default value if acronym is missing
    status: item.status || 'Unknown Status', // Use a default value if status is missing
    date: new Date(item.createdAt).toLocaleDateString(), // Format createdAt to a readable date
  }));

  setSurveys(mappedSurveys); // Update state with transformed data

      return response.data; // Return data for further use
    } catch (error) {
      console.error("Error fetching initiated surveys:", error);
      throw new Error('Failed to fetch initiated surveys.');
    }
  };

const handleSend = async () => {
    if (!selectedCenter || !selectedUser) {
      setSnackbarMessage('Please select both center and user.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setDialogOpen(false);
      return;
    }
  
    const data = {
      acronym: "YOUTH_SD.1",
      visitID: 1,
      visitOcc: 1,
      formOcc: 1,
      subjectID: selectedUser,
      centreID: selectedCenter,
      formCode: selectedSurvey,
    };
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/toolbox/initiate`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // Set timeout for the request
        }
      );
  
      console.log("Response center::>>>", response);
  
      if (response.data.status === "success") {
          // Call the function to fetch initiated surveys
      const initiatedSurveys = await fetchInitiatedSurveys();
        setSnackbarMessage('Survey sent successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setDialogOpen(false);
      } else {
        setSnackbarMessage(response.data.data.message || 'Failed to send survey.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error sending survey:", error);
  
      setSnackbarMessage('An error occurred while sending the survey. Please try again later.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setDialogOpen(false);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ width: 400, padding: 2, borderRadius: 4, boxShadow: 3, margin: 2 , paddingBottom:2, }}>
      <Box sx={{ marginBottom: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Select Center</InputLabel>
          <Select value={selectedCenter} onChange={handleCenterChange}>
            {centers.map((center, index) => (
              <MenuItem key={index} value={center}>
                {center}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2 }}>U</Avatar>
        <FormControl fullWidth disabled={!selectedCenter}>
          <InputLabel>Select User</InputLabel>
          <Select value={selectedUser} onChange={handleUserChange}>
            {users.map((user: User) => (
              <MenuItem key={user.CLIENT_ID} value={user.CLIENT_ID}>
                {user.FIRST_NAME}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ marginBottom: 0 }}>
        <FormControl fullWidth>
          <InputLabel>Select Survey</InputLabel>
          <Select value={selectedSurvey} onChange={handleSurveyChange}>
            {subjects.map((subject: any, index) => (
              <MenuItem key={index} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

     {/* Surveys Section */}
<Box sx={{ marginTop: 2 ,      }}>
  <Typography variant="h6" gutterBottom>
    Surveys
  </Typography>
  <Divider sx={{ marginBottom: 0 }} />
  {/* Scrollable Container with Hidden Scrollbar */}
  <Box
    sx={{
 
      maxHeight: 300, // Set a fixed height for the scrollable area
      overflowY: 'auto', // Enable vertical scrolling
    //   marginTop: 1, // Optional: add some spacing above

      paddingRight: 1, // Add padding to avoid content being clipped by scrollbar
      '&::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar for webkit browsers
      },
    }}
  >
    <List>
      {surveys.map((survey, index) => (
        <Card key={index} sx={{ marginBottom: 1 }}>
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 1,
            }}
          >
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
        </Card>
      ))}
    </List>
  </Box>
</Box>


      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to send this survey?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSend} variant="contained" color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default UserSurveyCard;
