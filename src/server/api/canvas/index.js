const { Router } = require("express");
const controller = require("./canvas.controller");

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
 *   ...
 * }
 */
router.get("/", controller.get);

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
 *   success: true
 * }
 */
router.post("/", controller.post);

module.exports = router;
