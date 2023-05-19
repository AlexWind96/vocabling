import { showNotification } from '@mantine/notifications'
import { NotificationProps } from '@mantine/notifications/lib/types'


class NotificationsService {
  showError = (payload: Omit<NotificationProps, 'color' | 'title'>): void => {
    showNotification({ color: 'red', title: 'Error', ...payload })
  }
}

export const Notifications = new NotificationsService()
