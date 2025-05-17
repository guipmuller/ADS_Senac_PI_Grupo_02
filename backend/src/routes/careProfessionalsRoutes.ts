import { Router } from "express";
import {
  getAllCareProfessionals, 
  getCareProfessionalById, 
  createCareProfessional,
  updateCareProfessional,
  deleteCareProfessional
} from "../controllers/CareProfessionalController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CareProfessional:
 *       type: object
 *       properties:
 *         idCareProfessional:
 *           type: integer
 *         professionalRegistryCode:
 *           type: string
 *         professionalBiography:
 *           type: string
 *         rating:
 *           type: number
 *           format: float
 *         idUser:
 *           type: integer
 *       required:
 *         - professionalRegistryCode
 *         - professionalBiography
 *         - rating
 */

/**
 * @swagger
 * /api/care-professionals:
 *   get:
 *     summary: Returns all care professionals
 *     tags: [Care Professionals]
 *     responses:
 *       200:
 *         description: List of care professionals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CareProfessional'
 */
router.get("/", getAllCareProfessionals);

/**
 * @swagger
 * /api/care-professionals/{id}:
 *   get:
 *     summary: Returns a care professional by ID
 *     tags: [Care Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Care Professional Details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareProfessional'
 *       404:
 *         description: Care professional not found
 */
router.get("/:id", getCareProfessionalById);

/**
 * @swagger
 * /api/care-professionals:
 *   post:
 *     summary: Creates a new care professional
 *     tags: [Care Professionals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professionalRegistryCode:
 *                 type: string
 *               professionalBiography:
 *                 type: string
 *               idUser:
 *                 type: integer  # Corrigido para 'integer'
 *             required:
 *               - professionalRegistryCode
 *               - professionalBiography
 *               - rating
 *               - idUser
 *     responses:
 *       201:
 *         description: Care professional successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareProfessional'
 */
router.post("/", createCareProfessional);

/**
 * @swagger
 * /api/care-professionals/{id}:
 *   put:
 *     summary: Update a Care Professional by ID
 *     tags: [Care Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professionalRegistryCode:
 *                 type: string
 *               professionalBiography:
 *                 type: string
 *               idUser:
 *                 type: integer
 *             required:
 *               - professionalRegistryCode
 *               - professionalBiography
 *               - rating
 *               - idUser
 *     responses:
 *       200:
 *         description: Care professional successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareProfessional'
 *       404:
 *         description: Care professional not found
 */
router.put("/:id", updateCareProfessional);

/**
 * @swagger
 * /api/care-professionals/{id}:
 *   delete:
 *     summary: Delete a care professional by ID
 *     tags: [Care Professionals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Care professional successfully deleted
 *       404:
 *         description: Care professional not found
 */
router.delete("/:id", deleteCareProfessional);

export default router;
