import React from 'react';
import { createRoot } from 'react-dom/client';
import { Demo } from './src/index';
import 'antd/dist/antd.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(<Demo />);
