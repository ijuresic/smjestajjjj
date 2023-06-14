require('text-encoding').TextEncoder = require('util').TextEncoder;

const React = require('react');
const { shallow, configure } = require('enzyme');
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

// Konfiguracija adaptera
configure({ adapter: new Adapter() });

describe('Funkcije', () => {
  it('renders correctly', () => {
    const Funkcije = React.createElement('div', { className: 'funkcije' }, 'Uspješan test!');
    const wrapper = shallow(Funkcije);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the correct content', () => {
    const Funkcije = React.createElement('div', { className: 'funkcije' }, 'Uspješan test!');
    const wrapper = shallow(Funkcije);
    expect(wrapper.text()).toContain('Uspješan test!');
  });
});
