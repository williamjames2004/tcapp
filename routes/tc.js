const express = require('express');
const router = express.Router();

const TC = require('../models/TC');


// ========================================
// POST - INSERT NEW TC
// POST /TC/newtc
// ========================================

router.post('/newtc', async (req, res) => {
    try {
        const { tc_no } = req.body;

        // Check duplicate TC number
        const existingTC = await TC.findOne({ tc_no });

        if (existingTC) {
            return res.status(409).json({
                success: false,
                message: 'TC number already exists.'
            });
        }

        const newTC = new TC(req.body);

        await newTC.save();

        res.status(201).json({
            success: true,
            message: 'TC saved successfully.',
            data: newTC
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'TC number already exists.'
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ========================================
// GET - FETCH TC BY TC NUMBER
// GET /TC/newtc?tcno=123
// ========================================

router.get('/newtc', async (req, res) => {
    try {
        const tcno = req.query.tcno;

        if (!tcno) {
            return res.status(400).json({
                success: false,
                message: 'Please provide TC number.'
            });
        }

        const tc = await TC.findOne({ tc_no: tcno });

        if (!tc) {
            return res.status(404).json({
                success: false,
                message: 'TC record not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'TC fetched successfully.',
            data: tc
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ========================================
// PUT - UPDATE EXISTING TC
// PUT /TC/newtc?tcno=123
// ========================================

router.put('/newtc', async (req, res) => {
    try {
        const tcno = req.query.tcno;

        if (!tcno) {
            return res.status(400).json({
                success: false,
                message: 'Please provide TC number.'
            });
        }

        // Do not allow changing the unique TC number
        const updateData = { ...req.body };
        delete updateData.tc_no;

        const updatedTC = await TC.findOneAndUpdate(
            { tc_no: tcno },
            { $set: updateData },
            {
                new: true,
                runValidators: false
            }
        );

        if (!updatedTC) {
            return res.status(404).json({
                success: false,
                message: 'TC record not found.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'TC updated successfully.',
            data: updatedTC
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;