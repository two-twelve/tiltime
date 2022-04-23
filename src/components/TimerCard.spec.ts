import { mount } from '@vue/test-utils'
import TimerCard from './TimerCard.vue'

jest.mock('@fortawesome/vue-fontawesome', () => ({
  FontAwesomeIcon: ''
}))

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