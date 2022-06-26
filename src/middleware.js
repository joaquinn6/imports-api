
const express = require('express');

const middlewares = function middlewares(app) {
  // const origins = [/\.imports\.net/];
  // if (process.env.NODE_ENV !== 'pro') {
  //   origins.push(/\*/);
  // }
  // const corsOptions = {
  //   origin: origins,
  // };
  // app.use(cors());

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use((req, res, next) => {
    req.remoteIp = req.get('X-Real-IP') || req.get('X-Forwarded-For') || req.connection.remoteAddress;
    next();
  });
};

module.exports = middlewares;