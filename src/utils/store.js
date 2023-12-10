import { defineStore } from 'pinia'

import { getCurrentUserId } from '@utils/utils';

export const useUserStore = defineStore('user', {
  state: () => ({ userId: getCurrentUserId() || null }),
})