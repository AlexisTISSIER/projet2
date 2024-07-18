import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../components/App';

describe('<App />', () => {
    it('should render the title', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('h1').text()).to.equal('Chat with AI');
    });

    it('should update chat history when a message is sent', () => {
        const wrapper = mount(<App />);

        // Simulate user input
        wrapper.find('input[type="text"]').simulate('change', { target: { value: 'Hello, AI!' } });

        // Simulate form submission
        wrapper.find('form').simulate('submit');

        // Check if the user message is added to the chat history
        expect(wrapper.state('chatHistory')).to.have.lengthOf(1);
        expect(wrapper.state('chatHistory')[0].message).to.equal('Hello, AI!');
        expect(wrapper.state('chatHistory')[0].sender).to.equal('user');
    });
});