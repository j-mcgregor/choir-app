const express = require('express');
const router = express.Router();

const validateMemberInput = require('../../validation/member');

const Member = require('../../models/Member');

/**
 * @route GET api/members
 * @desc Fetch members
 * @access public
 *
 */

router.get('/', async (req, res) => {
  try {
    const posts = await Member.find();
    if (!posts) throw Error();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

/**
 * @route POST api/members/create
 * @desc Create member
 * @access private
 *
 */

router.post('/create', async (req, res) => {
  const { errors, isValid } = validateMemberInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newMember = new Member({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const member = await newMember.save();
    if (!member) throw Error();

    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

/**
 * @route PUT api/members/:id/update
 * @desc Edit a member
 * @access public
 *
 */

router.put('/:id/update', async (req, res) => {
  const { id } = req.params;
  const updatedMember = {
    name: req.body.name,
    email: req.body.email
  };
  try {
    const member = await Member.findByIdAndUpdate(id, updatedMember);
    if (!member) throw Error();

    res.status(200).json(member);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

/**
 * @route DELETE api/members/:id
 * @desc Delete a member
 * @access public
 *
 */

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const member = await Member.findByIdAndDelete(id);

    res.status(200).json(member);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/deleteMany', async (req, res) => {
  const { ids } = req.body;

  try {
    const membersDeleted = await Member.deleteMany({ _id: { $in: ids } });

    res.status(200).json(membersDeleted);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
