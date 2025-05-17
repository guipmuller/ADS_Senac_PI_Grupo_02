import { Router } from "express";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from "../controllers/appointmentController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         idAppointment:
 *           type: integer
 *         date:
 *           type: string
 *           format: date
 *         time:
 *           type: string
 *           format: time
 *         location:
 *           type: string
 *         idPatient:
 *           type: integer
 *         idCareProfessional:
 *           type: integer
 *       required:
 *         - date
 *         - time
 *         - location
 *         - idPatient
 *         - idCareProfessional
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Returns all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointment'
 */
router.get("/", getAllAppointments);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Returns an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Appointment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 */
router.get("/:id", getAppointmentById);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               location:
 *                 type: string
 *               idPatient:
 *                 type: integer
 *               idCareProfessional:
 *                 type: integer
 *             required:
 *               - date
 *               - time
 *               - location
 *               - idPatient
 *               - idCareProfessional
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 */
router.post("/", createAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment by ID
 *     tags: [Appointments]
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
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *                 format: time
 *               location:
 *                 type: string
 *               idPatient:
 *                 type: integer
 *               idCareProfessional:
 *                 type: integer
 *             required:
 *               - date
 *               - time
 *               - location
 *               - idPatient
 *               - idCareProfessional
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 */
router.put("/:id", updateAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do agendamento
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 */
router.delete("/:id", deleteAppointment);

export default router;
