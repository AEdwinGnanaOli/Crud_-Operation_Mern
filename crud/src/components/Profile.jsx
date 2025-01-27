import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack
} from "@mui/material";
// import "./styles.css";

const Profile = () => {
  return (
    <Container>
      <Grid container justifyContent="center" mt={3} spacing={3}>
        <Grid item md={4}>
          <Card variant="outlined">
            <CardContent sx={{ p: "30px" }}>
              <Typography variant="h6" textAlign="center" mb={3}>
                Mutual Friend Revealed
              </Typography>
              <Box textAlign="center">
                {/* <Badge badgeContent={1} color="error" overlap="circular">
                  <Avatar
                    src={
                      "https://demos.adminmart.com/premium/bootstrap/modernize-bootstrap/package/dist/images/profile/user-1.jpg"
                    }
                    alt="userBg"
                    sx={{ width: 140, height: 140 }}
                  />
                </Badge> */}

                <Typography variant="h6" mt={3}>
                  Tommoie Henderson
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  mt={1}
                  mb={2}
                >
                  Accept the request and <br /> type a message
                </Typography>

                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button color="primary" variant="contained" size="large">
                    Update
                  </Button>
                  <Button color="error" variant="outlined" size="large">
                    Delete
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
