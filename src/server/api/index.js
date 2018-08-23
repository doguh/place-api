const { Router } = require("express");
const canvasRouter = require("./canvas");

const router = Router();

/**
 * @api {get} /api/ping
 * @apiGroup ping
 *
 * @apiDescription Test status server
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 * {
 *   status: true
 * }
 */
router.get("/ping", async (req, res) => {
  res.status(200).send({
    status: true
  });
});

router.use("/canvas", canvasRouter);

module.exports = router;
