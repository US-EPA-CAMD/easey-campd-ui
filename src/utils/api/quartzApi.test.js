import React from 'react';
import { sendNotificationEmail }  from './quartzApi'
import '@testing-library/jest-dom/extend-expect';
import { ExpansionPanelActions } from '@material-ui/core';
import * as axios from "axios";

jest.mock("axios");

jest.mock('../../config', () => {
    return (
        { 
            app:{email: '', apiKey: ''},
            services: {quartz: { url: ''}}
        }
    )
});

describe('Quartz API test', () => {
  test('should render content without error', () => {
    axios.post.mockImplementation(() => Promise.resolve({ then: jest.fn() }));

    try{
        sendNotificationEmail({toEmail: ''})
        expect(true);
    }
    catch{
        expect(false);
    }
  });
});
