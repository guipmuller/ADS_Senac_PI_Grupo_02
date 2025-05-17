import { Router } from "express";
import { 
  getAllPatients, 
  getPatientById, 
  createPatient, 
  updatePatient, 
  deletePatient 
} from "../controllers/PatientController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         idPatient:
 *           type: integer
 *         patientName:
 *           type: string
 *         patientCPF:
 *           type: string
 *         patientBirthDate:
 *           type: string
 *           format: date
 *         idUser:
 *           type: integer
 *       required:
 *         - patientName
 *         - patientCPF
 *         - patientBirthDate
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Return all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Patient list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get("/", getAllPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Returns a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 */
router.get("/:id", getPatientById);

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName: 
 *                 type: string
 *               patientCPF:
 *                 type: string
 *               patientBirthDate:
 *                 type: string
 *                 format: date
 *               idUser:
 *                 type: integer
 *             required:
 *               - patientName
 *               - patientCPF
 *               - patientBirthDate
 *               - idUser
 *     responses:
 *       201:
 *         description: Patient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       400:
 *         description: Invalid data provided
 */
router.post("/", createPatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   put:
 *     summary: Update a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientName: 
 *                 type: string
 *               patientCPF:
 *                 type: string
 *               patientBirthDate:
 *                 type: string
 *                 format: date
 *               idUser:
 *                 type: integer
 *             required:
 *               - patientName
 *               - patientCPF
 *               - patientBirthDate
 *               - idUser
 *     responses:
 *       200:
 *         description: Patient successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 */
router.put("/:id", updatePatient);

/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Patient successfully deleted
 *       404:
 *         description: Patient not found
 */
router.delete("/:id", deletePatient);

export default router;
