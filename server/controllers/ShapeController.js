const { created, badRequest, validationError } = require("../Response/index");
const ShapeService = require("../services/ShapeService");
class ShapeController {
  static async calculateShape(req, res) {
    let total;
    let data;

    try {
      if (!req.body.shape)
        return badRequest(res, `Please provide the shape`, null);

      if (!req.body.dimensions)
        return badRequest(res, `Please provide the dimensions`, null);

      const shape = req.body.shape.trim().toUpperCase();

      switch (shape) {
        // Calculates area of square
        case "SQUARE":
          const { sideA, sideB } = req.body.dimensions;

          if (!sideA || !sideB)
            return badRequest(
              res,
              `Please provide the value for sideA and sideB`,
              null
            );

          if (!Number.isFinite(sideA) || !Number.isFinite(sideB))
            return validationError(
              res,
              `sideA and sideB requires a number`,
              null
            );

          total = sideA * sideB;

          data = {
            shape: shape,
            dimension: { sideA: sideA, sideB: sideB },
            result: total.toFixed(2),
          };

          await ShapeService.saveCalculation(data);
          return created(res, `Square calculation saved successfully!`, data);

        // Calculate area of rectangle
        case "RECTANGLE":
          const { length, breadth } = req.body.dimensions;

          if (!length || !breadth)
            return badRequest(
              res,
              `Please provide the value for length and breadth`,
              null
            );

          if (!Number.isFinite(length) || !Number.isFinite(breadth))
            return validationError(
              res,
              `"length and breadth requires a number`,
              null
            );

          total = length * breadth;
          data = {
            shape: shape,
            dimension: { length: length, breadth: breadth },
            result: total.toFixed(2),
          };

          await ShapeService.saveCalculation(data);

          return created(
            res,
            `rectangle calculation saved successfully!`,
            data
          );

        // Calculate area of triangle
        case "TRIANGLE":
          const { length_a, length_b, length_c } = req.body.dimensions;

          if (!length_a || !length_a || !length_c)
            return badRequest(
              res,
              `Please provide the value for length_a,length_b and length_c`,
              null
            );

          if (
            !Number.isFinite(length_a) ||
            !Number.isFinite(length_b) ||
            !Number.isFinite(length_c)
          )
            return validationError(
              res,
              `length_a,length_b and length_c requires a number`,
              null
            );

          // calculate the semi-perimeter
          const s = (length_a + length_b + length_c) / 2;

          //calculate the area
          total = Math.sqrt(
            s * (s - length_a) * (s - length_b) * (s - length_c)
          );

          data = {
            shape: shape,
            dimension: {
              length_a: length_a,
              length_b: length_b,
              length_c: length_c,
            },
            result: total.toFixed(2),
          };

          await ShapeService.saveCalculation(data);
          return created(res, `triangle calculation saved successfully!`, data);

        // Calculate area of circle
        case "CIRCLE":
          const { radius } = req.body.dimensions;
          if (!radius)
            return badRequest(res, `Please provide the value for radius`, null);

          if (!Number.isFinite(radius))
            return validationError(res, `lradius requires a number`, null);

          total = Math.PI * (radius * radius);
          data = {
            shape: shape.toUpperCase(),
            dimension: {
              radius: radius,
            },
            result: total.toFixed(2),
          };

          await ShapeService.saveCalculation(data);
          return created(res, `circle calculation saved successfully!"`, data);

        default:
          return badRequest(res, `Bad Request`, null);
      }
    } catch (error) {
      return badRequest(res, `${error.message}`, null);
    }
  }
}

module.exports = ShapeController;
