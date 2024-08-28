---
author: saiayyappa
pubDatetime: 2024-08-28T16:31:28.000+05:30
modDatetime: 2024-08-28T16:31:28.000+05:30
title: About Promises
featured: false
draft: false
tags:
  - js
description: How promises work in general and it's motivation behind it
---

To understand promises we need to delve a bit on single-threadedness of js. To keep it short, I will give a simple explanation of what promises are and how it is necessary for unblocking events aka asynchronous invocations.

## Table of contents

## Motivation

Consider the following piece of code.
```js
function readJSONSync(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}
```
By nature, it executes synchronously. It reads a file and parses it as `json`. When running this code, it will block the call stack till the end of operation.

To make our application non-blocking, we need to make all the operations that involve IO be asynchronous. The simplest way to do this would be to use a callback. However, a naive implementation will probably go wrong:
```js
function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) return callback(err);
    callback(null, JSON.parse(res));
  });
}
```
### Problems in above snippet
- The extra callback parameter confuses our idea of what is input and what is the return value.
- It doesn't work at all with control flow primitives.
- It doesn't handle errors thrown by JSON.parse

We need to handle errors thrown by JSON.parse but we also need to be careful not to handle errors thrown by the callback function. By the time we've done all of this our code is a mess of error handling:

```js
function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function (err, res){
    if (err) return callback(err);
    try {
      res = JSON.parse(res);
    } catch (ex) {
      return callback(ex);
    }
    callback(null, res);
  });
}
```

### Necessity of promises
We still have the problem of the extra callback hanging around. **Promises** help you **handle errors impicitly**, and write **cleaner code** by not having callback parameters.

The main design decision to use **promise** is clean code and unblatant use of callback parameters. Also you don't need to modify your logic or the underlying architecture (i.e. you can implement them in pure JavaScript and use them to wrap existing asynchronous operations).

## Promises
The core idea behind promises is that a promise represents the result of an **asynchronous operation**. Result can be success or failure - it doesn't matter. Let's say we are using promise for file operation doing copy. When starting the promise, the result of operation itself is returned but not the out put of copy operation. We need to get the result of operation by resolving it.

It's like asking to hold agreement of giving 10 apples to someone. You can

1. give those 10 apples to them - thereby **upholding/fulfilling** the promise/agreement
2. not give those 10 apples to them - thereby **rejecting** the promise/agreement
3. wait till 10 apples to grow - thereby the **agreement is still in effect** but is pending

What makes promises powerful is this pending state. This state lets the program to wait for particular execution without causing the blockage. We can comeback later to execute on the result of operation with a callback or then keyword.

So we need to fix multiple states for a promise:

- `pending` - The initial state of a promise.
- `fulfilled` - The state of a promise representing a successful operation.
- `rejected` - The state of a promise representing a failed operation.

Once a promise is fulfilled or rejected, it is immutable (i.e. it can never change again).

## Simple Implementation
