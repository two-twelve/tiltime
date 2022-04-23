import ColourTheme from '@/types/ColourTheme';
import TimerGroup from '@/types/TimerGroup';
import User from '@/types/User';
import { mount } from '@vue/test-utils'
import TimerCard from './TimerCard.vue'

jest.mock('@/store', () => ({
  useStore: () => ({
    commit: jest.fn(),
    state: {
      user: {
        timerGroups: [{ uuid: 'Welcome', title: 'Welcome', timers: [] }] as Array<TimerGroup>,
        colourTheme: ColourTheme.system as ColourTheme,
      } as User,
      activeTimerGroupUUID: 'Welcome',
    }
  }),
}));

describe('TimerCard', () => {
  it('should display timer title', () => {
    const testTitle = 'Test Title'
    const wrapper = mount(
      TimerCard,
      {
        props: {
          uuid: '',
          title: testTitle,
          from: new Date(),
          to: new Date()
        }
      }
    )

    expect(wrapper.find('input').text()).toEqual(testTitle)
  })
})