import React from 'react';
import {
  Card,
  CardContent,
  Skeleton,
  Box,
  Stack,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export const PokemonSkeleton = () => (
  <Card
    elevation={2}
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid',
      borderColor: 'divider',
    }}
  >
    {/* --- SKELETON HEADER --- */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 1,
      }}
    >
      <Skeleton variant="text" width="40px" />
      <IconButton size="small" disabled>
        <StarIcon fontSize="small" sx={{ color: 'action.disabled' }} />
      </IconButton>
    </Box>

    {/* --- SKELETON BODY --- */}
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
      <Skeleton variant="rectangular" width={120} height={120} />
      <Skeleton variant="text" width="80%" sx={{ mt: 2 }} />
    </Box>

    {/* --- SKELETON FOOTER --- */}
    <CardContent sx={{ pt: 1, pb: '16px !important' }}>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Skeleton variant="rounded" width={60} height={24} />
        <Skeleton variant="rounded" width={60} height={24} />
      </Stack>
    </CardContent>
  </Card>
);