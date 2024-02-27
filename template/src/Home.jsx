import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          rre Home
        </Typography>
        <Typography sx={{ mt: 6, mb: 3, color: 'text.secondary' }}>
          {'This is built from an extended React template.'}
          <br/>
          {'You can find the documentation '}<Link href="https://github.com/mcqj/create-create-app-extended" target="_blank">here</Link>
        </Typography>
      </Box>
    </Container>
  );
}
