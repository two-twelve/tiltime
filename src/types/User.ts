import TimerGroup from './TimerGroup'
import NotificationType from './NotificationType'
import ColourTheme from './ColourTheme'

type User = {
  timerGroups: Array<TimerGroup>,
  notifications: Array<NotificationType>
  colourTheme: ColourTheme
}

export default User