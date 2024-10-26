import React from 'react';
import { createRoot } from 'react-dom/client';

import ContactForm from './ContactForm';

const App = function App() {
    const fieldsElements = [
        { name: 'name', type: 'text', defaultValue: '', validation: { isReq: true } },
        {
            name: 'email',
            type: 'email',
            defaultValue: '',
            validation: { isReq: true, regex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        },
        { name: 'phone', type: 'text', defaultValue: '', validation: { isReq: false, regex: /^[0-9]+$/ } },
        { name: 'topic', type: 'text', defaultValue: '', validation: { isReq: true } },
        { name: 'content', type: 'textarea', defaultValue: '', validation: { isReq: true } },
    ];
    return <ContactForm fieldsElements={fieldsElements} />;
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
