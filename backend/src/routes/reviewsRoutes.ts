import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/ReviewController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         idReview:
 *           type: integer
 *         rating:
 *           type: integer
 *         comment:
 *           type: string
 *         createAt:
 *           type: string
 *           format: date-time
 *         updateAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - rating
 * 
 *     ReviewRequest:
 *       type: object
 *       properties:
 *         rating:
 *           type: integer
 *           example: 5
 *         comment:
 *           type: string
 *           nullable: true
 *           example: Ótimo profissional!
 *         idCareProfessional:
 *           type: integer
 *         idPatient:
 *           type: integer
 *       required:
 *         - rating
 *         - idCareProfessional
 *         - idPatient
 * 
 *     GetReviewResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         rating:
 *           type: integer
 *         comment:
 *           type: string
 *           example: Ótimo profissional!
 *         idCareProfessional:
 *           type: integer
 *         idPatient:
 *           type: integer
 *       required:
 *         - id
 *         - rating
 *         - comment
 *         - idCareProfessional
 *         - idPatient
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Returns the list of all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Review list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetReviewResponse'
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: Returns a specific review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetReviewResponse'
 *       404:
 *         description: Review not found
 */
router.get("/:id", getById);

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewRequest'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idReview:
 *                    type: integer
 *                    example: 42
 *       400:
 *         description: Invalid data
 */
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;