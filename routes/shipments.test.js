"use strict";

const shipItApi = require("../shipItApi");

shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {
    shipItApi.shipProduct.mockReturnValue(5555);

    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });


    expect(resp.body).toEqual({ shipped: 5555 });

    // expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  //TODO: make a test for NO body => for later

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({});

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
        "instance requires property \"productId\"",
        "instance requires property \"name\"",
        "instance requires property \"addr\"",
        "instance requires property \"zip\""
    ]);
  });

  test("throws error if product id is lower than 1000", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 100,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789"
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance.productId must be greater than or equal to 1000"]
    );
  });

});
