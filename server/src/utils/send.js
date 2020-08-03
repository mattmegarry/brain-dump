"use strict";

export default function send(req, res) {
  const { status, data } = res.locals;

  console.log(res.locals);

  res.status(status).json(data || null);
}
