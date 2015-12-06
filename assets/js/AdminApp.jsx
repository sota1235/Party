/**
 * AdminApp.jsx
 *
 * Description:
 *   jsx file for admin page
 *
 * Author:
 *   @sot1235
 */

import { Router, Route, Link } from 'react-router';
import { render }              from 'react-dom';
import React                   from 'react';

import AdminComponent from './components/Admin/AdminComponent.jsx';

/* React rendering */
render(
  <AdminComponent />,
  document.getElementById('question-admin')
);
