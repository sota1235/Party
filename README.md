Party
====

![Party logo](img/logo.png)

[![Build Status](https://travis-ci.org/sota1235/Party.svg)](https://travis-ci.org/sota1235/Party)

Simple quiz system.

### Description

This application has three types of screen.

- Questions
- Answering form
- Management quiz (Admin page)

The answers is reflected in real-time on 'Questions' screen.

### Demo

![](https://i.gyazo.com/72c5b6b03b604350759a227247afc75f.gif)

### Requirement

- node.js v4.1.2
- mongoDB

### Usage

This application has three pages.

- Index page

You can acess this page on '/'.

User can vote for question and it is displayed on quiz page in real time.

Also, send comments just like niconico video.

![Index page](https://i.gyazo.com/1739ea278540d0d7884a6e69b6649dbe.gif)

- Quiz page

You can see Question set just now.

The comments and vote number displayed in real time.

Quiz page has some customize options. (Sounds and styles. It is coming soon...)

![Quiz page](https://i.gyazo.com/2e0c6f3ea2ee199d3e53fa42698e04a5.gif)

- Admin page

Owner of event uses this page.

Add, delete, set questions in this page.

![Admin Page](https://i.gyazo.com/d0440fdcda0d7cef9c659cae554a6a8c.gif)

### Install

Clone this repository.

```shell
$ git clone git@github.com:sota1235/Party.git
```

Build static files.

```shell
$ cd Party

$ npm i

$ gulp
```

Start application and access `http://{hostname}:3000`.

```shell
$ npm start
```
### TODO

- **Load measures for Socket.IO**
- Make admin page more useful
- Add template for application(style, config)

### Contribution

Bug reports and pull requests are welcome on GitHub at [https://github.com/sota1235/Party](https://github.com/sota1235/Party). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

### Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[@sota1235](https://github.com/sota1235)
