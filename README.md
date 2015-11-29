Party
====

Simple quiz system.

### Description

This application has three types of screen.

- Questions
- Answering form
- Management quiz (Admin page)

The answers is reflected in real-time on 'Questions' screen.

### Demo

### Requirement

- node.js v4.1.2
- mongoDB

### Usage

This application has three pages.

- Index page

You can acess this page on '/'.

User can vote for question and it is displayed on quiz page in real time.

Also, send comments just like niconico video.

- Quiz page

You can see Question set just now.

The comments and vote number displayed in real time.

Quiz page has some customize options. (Sounds and styles. It is coming soon...)

- Admin page

Owner of event uses this page.

Add, delete, set questions in this page.

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

### Contribution

### Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[@sota1235](https://github.com/sota1235)
