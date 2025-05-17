import { Router } from "express";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/AddressController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         idAddress:
 *           type: integer
 *         street:
 *           type: string
 *         number:
 *           type: string
 *         complement:
 *           type: string
 *         neighborhood:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         postalCode:
 *           type: string
 *         country:
 *           type: string
 *         createAt:
 *           type: string
 *           format: date-time
 *         updateAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - street
 *         - number
 *         - neighborhood
 *         - city
 *         - state
 *         - postalCode
 *         - country
 *     AddressRequest:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           example: Rua das Flores
 *         number:
 *           type: string
 *           example: "123"
 *         complement:
 *           type: string
 *           nullable: true
 *           example: Apto 45
 *         neighborhood:
 *           type: string
 *           example: Centro
 *         city:
 *           type: string
 *           example: São Paulo
 *         state:
 *           type: string
 *           example: SP
 *         postalCode:
 *           type: string
 *           example: 12345-678
 *         country:
 *           type: string
 *           example: Brasil
 *       required:
 *         - street
 *         - number
 *         - neighborhood
 *         - city
 *         - state
 *         - postalCode
 *         - country
  *     GetAddressResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         street:
 *           type: string
 *           example: Rua das Flores
 *         number:
 *           type: string
 *           example: "123"
 *         complement:
 *           type: string
 *           nullable: true
 *           example: Apto 45
 *         neighborhood:
 *           type: string
 *           example: Centro
 *         city:
 *           type: string
 *           example: São Paulo
 *         state:
 *           type: string
 *           example: SP
 *         postalCode:
 *           type: string
 *           example: 12345-678
 *         country:
 *           type: string
 *           example: Brasil
 *       required:
 *         - id
 *         - street
 *         - number
 *         - neighborhood
 *         - city
 *         - state
 *         - postalCode
 *         - country
 */

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Returns the list of all addresses
 *     tags: [Addresses]
 *     responses:
 *       200:
 *         description: Address list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GetAddressResponse'
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/addresses/{id}:
 *   get:
 *     summary: Returns a specific address by ID
 *     tags: [Addresses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Address found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAddressResponse'
 *       404:
 *         description: Address not found
 */
router.get("/:id", getById);

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressRequest'
 *     responses:
 *       201:
 *         description: Address created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 idAddress:
 *                    type: integer
 *                    example: 42
 *       400:
 *         description: Invalid data
 */
router.post("/", create);

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *     summary: Updates data for an existing address
 *     tags: [Addresses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddressRequest'
 *     responses:
 *       204:
 *         description: Address updated successfully (no content)
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Address not found
 */
router.put("/:id", update);

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Addresses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Address successfully deleted
 *       404:
 *         description: Address not found
 */
router.delete("/:id", remove);

export default router;
