import ColourTheme from '@/types/ColourTheme'
import TimerGroup from '@/types/TimerGroup'
import User from '@/types/User'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
    },
  }),
}))

describe('TimerCard Complete', () => {
  const testTitle = "This Timer's Finished!"
  const testFrom = new Date('10 Sep 1999 12:37:23')
  const testTo = new Date('11 May 2000 20:10:37')

  const wrapper = shallowMount(TimerCard, {
    props: {
      uuid: '',
      title: testTitle,
      from: testFrom,
      to: testTo,
    },
    global: {
      components: {
        'font-awesome-icon': FontAwesomeIcon,
      },
    },
  })

  it('should display timer title', () => {
    expect(wrapper.find('input').element.value).toEqual(testTitle)
  })
  it('should display the correct start date', () => {
    expect(wrapper.find('.start-container').element.textContent).toContain('10/09/99')
  })
  it('should display the correct end date', () => {
    expect(wrapper.find('.end-container').element.textContent).toContain('11/05/00')
  })
  it('should display the correct start time', () => {
    expect(wrapper.find('.start-container').element.textContent).toContain('12:37')
  })
  it('should display the correct end time', () => {
    expect(wrapper.find('.end-container').element.textContent).toContain('20:10')
  })
  it('should display 0 hours, 0 minutes and 0 seconds remaining', () => {
    expect(wrapper.find('.countdown').element.textContent).toEqual('0 hours,\n0 minutes\nand 0 seconds!')
  })
  it('should display the correct percentage time elapsed', () => {
    expect(wrapper.find('.progress-indicator').element.textContent?.trim()).toEqual('100% elapsed')
  })
})

describe('TimerCard Not Yet Started', () => {
  const testTitle = "This Timer's Not Started!"
  const testFrom = new Date('10 Sep 2999 21:13:56')
  const testTo = new Date('11 May 3000 02:01:12')

  const wrapper = shallowMount(TimerCard, {
    props: {
      uuid: '',
      title: testTitle,
      from: testFrom,
      to: testTo,
    },
    global: {
      components: {
        'font-awesome-icon': FontAwesomeIcon,
      },
    },
  })

  it('should display timer title', () => {
    expect(wrapper.find('input').element.value).toEqual(testTitle)
  })
  it('should display the correct start date', () => {
    expect(wrapper.find('.start-container').element.textContent).toContain('10/09/99')
  })
  it('should display the correct end date', () => {
    expect(wrapper.find('.end-container').element.textContent).toContain('11/05/00')
  })
  it('should display the correct start time', () => {
    expect(wrapper.find('.start-container').element.textContent).toContain('21:13')
  })
  it('should display the correct end time', () => {
    expect(wrapper.find('.end-container').element.textContent).toContain('02:01')
  })
  it('should display 242 days, 4 hours, 47 minutes and 16 seconds remaining', () => {
    expect(wrapper.find('.countdown').element.textContent).toEqual('242 days,\n4 hours, 47 minutes\nand 16 seconds.')
  })
  it('should display the correct percentage time elapsed', () => {
    expect(wrapper.find('.progress-indicator').element.textContent?.trim()).toEqual('0% elapsed')
  })
})

describe('TimerCard In Progress', () => {
  const testTitle = "This Timer's In Progress!"
  var testFrom = new Date()
  var testTo = new Date()
  testFrom.setDate(testFrom.getDate() - 1)
  testTo.setDate(testTo.getDate() + 1)

  const wrapper = shallowMount(TimerCard, {
    props: {
      uuid: '',
      title: testTitle,
      from: testFrom,
      to: testTo,
    },
    global: {
      components: {
        'font-awesome-icon': FontAwesomeIcon,
      },
    },
  })

  it('should display timer title', () => {
    expect(wrapper.find('input').element.value).toEqual(testTitle)
  })
  it('should display the correct start date', () => {
    expect(wrapper.find('.start-container').element.textContent).toContain(
      testFrom.getDate().toString().padStart(2, '0') +
        '/' +
        (testFrom.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        testFrom.getFullYear().toString().slice(2, 4)
    )
  })
  it('should display the correct end date', () => {
    expect(wrapper.find('.end-container').element.textContent).toContain(
      testTo.getDate().toString().padStart(2, '0') +
        '/' +
        (testTo.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        testTo.getFullYear().toString().slice(2, 4)
    )
  })
  it('should display the correct start time', () => {
    expect(wrapper.find('.start-container').element.textContent).toContain(
      testFrom.getHours().toString().padStart(2, '0') + ':' + testFrom.getMinutes().toString().padStart(2, '0')
    )
  })
  it('should display the correct end time', () => {
    expect(wrapper.find('.end-container').element.textContent).toContain(
      testTo.getHours().toString().padStart(2, '0') + ':' + testTo.getMinutes().toString().padStart(2, '0')
    )
  })
  it('should display 1 day, 0 hours, 0 minutes and 0 seconds remaining', () => {
    expect(wrapper.find('.countdown').element.textContent).toEqual('1 day,\n0 hours, 0 minutes\nand 0 seconds.')
  })
  it('should display the correct percentage time elapsed', () => {
    expect(wrapper.find('.progress-indicator').element.textContent?.trim()).toEqual('50% elapsed')
  })
})
