import Group from "../models/Group.js";
import User from "../models/User.js";

// @desc    Create a new group
export const createGroup = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }

    const group = await Group.create({
      name,
      description,
      createdBy: req.user._id,
      members: [req.user._id], // creator is first member
    });

    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all groups of the user
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id }).populate(
      "createdBy",
      "name email"
    );

    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a group
export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const group = await Group.findById(id);

    if (!group) return res.status(404).json({ message: "Group not found" });

    // 🔥 Ownership check BEFORE update
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this group" });
    }

    if (name) group.name = name;
    if (description) group.description = description;

    const updatedGroup = await group.save();

    res.status(200).json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a group
export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);

    if (!group) return res.status(404).json({ message: "Group not found" });

    // 🔥 Ownership check BEFORE delete
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this group" });
    }

    await group.deleteOne();

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get users not in a specific group
export const getNonMembers = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Get users NOT in the group's members array
    const users = await User.find({
      _id: { $nin: group.members },
    }).select("name email");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Add a member to a group
export const addMemberToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // 🔐 Only the group owner can add members
    if (group.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to add members" });
    }

    // 🛑 Prevent duplicate entries
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // ✅ Add user
    group.members.push(userId);
    await group.save();

    res.status(200).json({ message: "Member added successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

