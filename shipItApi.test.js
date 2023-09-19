"use strict";

const { shipProduct, SHIPIT_SHIP_URL } = require("./shipItApi");
const fetchMock = require('fetch-mock');

test("shipProduct", async function () {
  fetchMock.post(SHIPIT_SHIP_URL, {
    receipt: {
      itemId: 1000,
      name: 'Test Tester',
      addr: '100 Test St',
      zip: '12345-6789',
      shipId: 1225
    },
    status: 200
  });

  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(1225);
});
