import ColourTheme from '@/types/ColourTheme';
import TimerGroup from '@/types/TimerGroup';
import User from '@/types/User';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { shallowMount } from '@vue/test-utils'
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

describe('TimerCardComplete', () => {
  const testTitle = 'Test Title'
  const testFrom = new Date('10 Sep 1999 12:37:23')
  const testTo = new Date('11 May 2000 20:10:37')
  
  const wrapper = shallowMount(
    TimerCard,
    {
      props: {
        uuid: '',
        title: testTitle,
        from: testFrom,
        to: testTo
      },
      global: {
        components: {
          'font-awesome-icon': FontAwesomeIcon
        }
      }
    },
  )

  it('should display timer title', () => {
    expect(wrapper.find('input').element.value).toEqual(testTitle)
  })
  it('should display the correct start date', () => {
    expect(wrapper.find(".start-container").element.textContent).toContain('10/09/99')
  })
  it('should display the correct end date', () => {
    expect(wrapper.find(".end-container").element.textContent).toContain('11/05/00')
  })
  it('should display the correct start time', () => {
    expect(wrapper.find(".start-container").element.textContent).toContain('12:37')
  })
  it('should display the correct end time', () => {
    expect(wrapper.find(".end-container").element.textContent).toContain('20:10')
  })
  it('should display the correct percentage time elapsed', () => {
    expect(wrapper.find(".progress-indicator").element.textContent).toEqual("100% elapsed ")
  })
})