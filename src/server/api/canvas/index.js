const { Router } = require("express");
const { sseHub } = require("@toverux/expresse");
const controller = require("./canvas.controller");
const { hub } = require("../../../models/canvas");
const wrapper = require("../../../helpers/wrapper");

const router = Router();

/**
 * @api {get} /api/canvas
 * @apiGroup canvas
 *
 * @apiDescription Returns the canvas data
 *
 * @apiParamExample {json} (query) Request-Example:
 * {}
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   [{ x: 0, y: 0, color: 0 }, ...]
 * }
 */
router.get("/", wrapper(controller.get));

/**
 * @api {post} /api/canvas
 * @apiGroup canvas
 *
 * @apiDescription Send a pixel update
 *
 * @apiParam {number}   x
 * @apiParam {number}   y
 * @apiParam {number}   color
 *
 * @apiParamExample {json} (query) Request-Example:
 * {
 *   x: 0,
 *   y: 3,
 *   color: 8
 * }
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   updated: true
 * }
 */
router.post("/", wrapper(controller.post));

/**
 * @api {get} /api/canvas/sub
 * @apiGroup canvas
 *
 * @apiDescription Subscribe to Server Sent Events for updates about tile changes
 */
router.get("/sub", sseHub({ hub }), () => {
  // nothing to do here, everything is done within the sseHub middleware
  console.log("new suscriber");
});

/**
 * @api {get} /api/canvas/snapshot
 * @apiGroup canvas
 *
 * @apiDescription Returns a snapshot of the canvas
 *
 * @apiParamExample {json} (query) Request-Example:
 * {}
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 * }
 */
router.get("/snapshot", wrapper(controller.getSnapshot));

module.exports = router;
