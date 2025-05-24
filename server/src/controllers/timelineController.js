import Meeting from "../models/Meeting.js";
import Task from "../models/Task.js";

export const getTimeline = async (req, res) => {
  const { groupId } = req.params;

  try {
    // Fetch meetings with scheduledAt date
    const meetings = await Meeting.find({ group: groupId, scheduledAt: { $exists: true } })
      .select("title scheduledAt")
      .lean();

    // Fetch tasks with dueDate
    const tasks = await Task.find({ group: groupId, dueDate: { $exists: true } })
      .select("title dueDate")
      .lean();

    // Normalize meetings
    const meetingItems = meetings.map((m) => ({
      type: "meeting",
      id: m._id,
      title: m.title,
      date: m.scheduledAt,
    }));

    // Normalize tasks
    const taskItems = tasks.map((t) => ({
      type: "task",
      id: t._id,
      title: t.title,
      date: t.dueDate,
    }));

    // Combine and sort by date ascending
    const timeline = [...meetingItems, ...taskItems].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    res.json(timeline);
  } catch (error) {
    console.error("Timeline fetch error:", error);
    res.status(500).json({ message: "Failed to fetch timeline" });
  }
};
