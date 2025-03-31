import React from 'react';
import { Grid, Skeleton, Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';

export const ProductCardSkeleton = () => {
  return (
    <Grid item xs={6} sm={4} md={3} lg={3} xl={2.4}>
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Box
          sx={{
            p: 2,
            m: 1,
            height: '100%',
            borderRadius: 1,
            backgroundColor: 'rgba(250, 250, 250, 0.8)',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          {/* Product image skeleton */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ borderRadius: 1, mb: 1.5 }}
          />

          {/* Product info skeletons */}
          <Stack spacing={1}>
            {/* Title */}
            <Skeleton variant="text" width="70%" height={24} />

            {/* Brand */}
            <Skeleton variant="text" width="40%" height={20} />

            {/* Price */}
            <Skeleton variant="text" width="30%" height={28} />

            {/* Category */}
            <Skeleton variant="text" width="50%" height={20} />
          </Stack>
        </Box>
      </motion.div>
    </Grid>
  );
};