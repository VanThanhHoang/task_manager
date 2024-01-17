/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import {Box} from 'native-base';

export const successToast = (message: string) => (
  <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
    {message}
  </Box>
);

export const errorToast = (message: string) => (
  <Box bg="danger.500" px="2" py="1" rounded="sm" mb={5}>
    {message}
  </Box>
);

export const warningToast = (message: string) => (
  <Box bg="warning.500" px="2" py="1" rounded="sm" mb={5}>
    {message}
  </Box>
);
