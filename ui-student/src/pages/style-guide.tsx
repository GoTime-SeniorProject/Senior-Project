import { useState } from 'react';
import {
  Alert,
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Slider,
  Snackbar,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add,
  Check,
  Delete,
  Edit,
  Email,
  Home,
  Search,
  Settings,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

export default function StyleGuideRoute() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [toggle, setToggle] = useState<string | null>('left');
  const [showPassword, setShowPassword] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [switchChecked, setSwitchChecked] = useState(true);

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Typography variant='h2' component='h1'>
          Style Guide
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          One-page reference for Material UI components and theme overrides.
        </Typography>

        {/* Typography */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Typography
          </Typography>
          <Stack spacing={1}>
            <Typography variant='h1'>H1 Heading</Typography>
            <Typography variant='h2'>H2 Heading</Typography>
            <Typography variant='h3'>H3 Heading</Typography>
            <Typography variant='h4'>H4 Heading</Typography>
            <Typography variant='h5'>H5 Heading</Typography>
            <Typography variant='h6'>H6 Heading</Typography>
            <Typography variant='subtitle1'>Subtitle 1</Typography>
            <Typography variant='subtitle2'>Subtitle 2</Typography>
            <Typography variant='body1'>Body 1 — primary body text</Typography>
            <Typography variant='body2'>Body 2 — secondary body text</Typography>
            <Typography variant='caption'>Caption</Typography>
            <Typography variant='overline'>Overline</Typography>
          </Stack>
        </Paper>

        {/* Palette */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Palette
          </Typography>
          <Stack direction='row' spacing={2} flexWrap='wrap'>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              Primary
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'secondary.main',
                color: 'secondary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              Secondary
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'error.main',
                color: 'error.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              Error
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'warning.main',
                color: 'warning.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              Warning
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'info.main',
                color: 'info.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              Info
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'success.main',
                color: 'success.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
              }}
            >
              Success
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'background.default',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
              }}
            >
              Default
            </Box>
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'background.paper',
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                border: 1,
                borderColor: 'divider',
              }}
            >
              Paper
            </Box>
          </Stack>
        </Paper>

        {/* Buttons */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Buttons
          </Typography>
          <Stack direction='row' spacing={2} flexWrap='wrap' useFlexGap>
            <Button variant='contained'>Contained</Button>
            <Button variant='outlined'>Outlined</Button>
            <Button variant='text'>Text</Button>
            <Button variant='contained' disabled>
              Disabled
            </Button>
            <Button variant='contained' startIcon={<Add />}>
              With Icon
            </Button>
            <Button variant='contained' size='small'>
              Small
            </Button>
            <Button variant='contained' size='large'>
              Large
            </Button>
            <IconButton color='primary'>
              <Edit />
            </IconButton>
            <Fab color='primary' aria-label='add'>
              <Add />
            </Fab>
            <ButtonGroup variant='outlined' aria-label='button group'>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ToggleButtonGroup
              value={toggle}
              exclusive
              onChange={(_event, value) => setToggle(value)}
              aria-label='text alignment'
            >
              <ToggleButton value='left'>Left</ToggleButton>
              <ToggleButton value='center'>Center</ToggleButton>
              <ToggleButton value='right'>Right</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Paper>

        {/* Inputs */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Inputs
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField label='Standard' fullWidth />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField label='Outlined' variant='outlined' fullWidth />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField label='Filled' variant='filled' fullWidth />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField
                label='Password'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge='end'>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField label='With helper' helperText='Helper text' fullWidth />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <TextField label='Error' error helperText='Error message' fullWidth />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Dropdown</InputLabel>
                <Select value={10} label='Dropdown'>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={['Option 1', 'Option 2', 'Option 3']}
                renderInput={(params) => <TextField {...params} label='Autocomplete' />}
                fullWidth
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Slider
                value={sliderValue}
                onChange={(_event, value) => setSliderValue(value as number)}
                aria-label='slider'
                valueLabelDisplay='auto'
              />
            </Grid2>
          </Grid2>

          <FormControl component='fieldset' sx={{ mt: 3 }}>
            <FormLabel component='legend'>Radio group</FormLabel>
            <RadioGroup row defaultValue='a'>
              <FormControlLabel value='a' control={<Radio />} label='A' />
              <FormControlLabel value='b' control={<Radio />} label='B' />
            </RadioGroup>
          </FormControl>

          <FormGroup row sx={{ mt: 2 }}>
            <FormControlLabel control={<Checkbox defaultChecked />} label='Checkbox' />
            <FormControlLabel
              control={
                <Switch
                  checked={switchChecked}
                  onChange={(event) => setSwitchChecked(event.target.checked)}
                />
              }
              label='Switch'
            />
          </FormGroup>
        </Paper>

        {/* Feedback */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Feedback
          </Typography>
          <Stack spacing={2}>
            <Alert severity='info'>Info alert</Alert>
            <Alert severity='success'>Success alert</Alert>
            <Alert severity='warning'>Warning alert</Alert>
            <Alert severity='error'>Error alert</Alert>
            <LinearProgress variant='determinate' value={sliderValue} />
            <CircularProgress size={24} />
            <Skeleton variant='rectangular' width={210} height={60} />
            <Box>
              <Button variant='outlined' onClick={() => setSnackbarOpen(true)}>
                Open snackbar
              </Button>
            </Box>
          </Stack>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            message='Snackbar message'
          />
        </Paper>

        {/* Data Display */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Data Display
          </Typography>
          <Stack spacing={2}>
            <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
              <Chip label='Default' />
              <Chip label='Primary' color='primary' />
              <Chip label='Secondary' color='secondary' />
              <Chip label='Success' color='success' />
              <Chip label='Deletable' onDelete={() => {}} />
              <Chip avatar={<Avatar>M</Avatar>} label='Avatar Chip' />
              <Badge badgeContent={4} color='primary'>
                <Email />
              </Badge>
              <Tooltip title='Tooltip'>
                <Button>Hover me</Button>
              </Tooltip>
            </Stack>

            <Breadcrumbs aria-label='breadcrumb'>
              <Link underline='hover' color='inherit' href='/'>
                <Home sx={{ mr: 0.5 }} fontSize='inherit' />
                Home
              </Link>
              <Link underline='hover' color='inherit' href='#'>
                Style Guide
              </Link>
              <Typography color='text.primary'>Components</Typography>
            </Breadcrumbs>

            <TableContainer component={Paper} variant='outlined'>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell align='right'>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { name: 'Alice', role: 'Admin', status: 'Active' },
                    { name: 'Bob', role: 'Editor', status: 'Away' },
                  ].map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell align='right'>
                        <Chip
                          label={row.status}
                          size='small'
                          color={row.status === 'Active' ? 'success' : 'default'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <ListItemText primary='List item one' />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary='List item two' secondary='Secondary text' />
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
        </Paper>

        {/* Surfaces */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Surfaces
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Card>
                <CardHeader title='Card title' subheader='Subheader' />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    Card content. Use this area for previewing card typography and spacing
                    overrides.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Action</Button>
                  <IconButton size='small' color='error'>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Paper variant='outlined' sx={{ p: 2 }}>
                <Typography variant='subtitle1'>Outlined Paper</Typography>
                <Typography variant='body2' color='text.secondary'>
                  Use for nested panels or elevated sections.
                </Typography>
              </Paper>
            </Grid2>
          </Grid2>
        </Paper>

        {/* Navigation */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Navigation
          </Typography>
          <Tabs
            value={tabValue}
            onChange={(_event, value) => setTabValue(value)}
            aria-label='style guide tabs'
          >
            <Tab label='Overview' />
            <Tab label='Components' />
            <Tab label='Overrides' />
          </Tabs>
          <Box sx={{ p: 2 }}>
            <Typography variant='body1'>Tab panel {tabValue + 1}</Typography>
          </Box>
        </Paper>

        {/* Dialog trigger */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Dialog
          </Typography>
          <Button variant='outlined' onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Dialog content. This is useful for previewing typography, spacing, and button
                alignment inside dialogs.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button variant='contained' onClick={() => setDialogOpen(false)} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>

        {/* Icons */}
        <Paper sx={{ p: 3 }}>
          <Typography variant='h5' gutterBottom>
            Icons
          </Typography>
          <Stack direction='row' spacing={2} flexWrap='wrap' useFlexGap>
            <Home />
            <Search />
            <Add />
            <Edit />
            <Delete />
            <Visibility />
            <VisibilityOff />
            <Settings />
            <Email />
            <Check />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
