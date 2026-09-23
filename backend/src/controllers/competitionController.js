const Competition = require('../models/Competition');
const Registration = require('../models/Registration');

// Get Competition details + user registration status
exports.getCompetitionDetails = async (req, res) => {
  try {
    const slug = req.params.slug || 'feedants-dance-101';
    const userId = req.headers['x-user-id'] || 'demo-user-123';

    let competition = await Competition.findOne({ slug });
    if (!competition) {
      return res.status(404).json({ success: false, message: 'Competition not found' });
    }

    const registration = await Registration.findOne({ competitionId: competition._id, userId });

    return res.json({
      success: true,
      data: competition,
      userStatus: {
        isRegistered: !!registration,
        isSubmitted: registration?.status === 'submitted',
        submission: registration?.submission || null,
        registrationId: registration?._id || null
      }
    });
  } catch (err) {
    console.error('Error fetching competition details:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Register for competition with atomic spot locking
exports.registerUser = async (req, res) => {
  try {
    const { competitionId } = req.body;
    const userId = req.headers['x-user-id'] || 'demo-user-123';
    const userName = req.body.userName || 'Prashant';
    const userEmail = req.body.userEmail || 'prashant@example.com';

    // 1. Check if user already registered
    const existingRegistration = await Registration.findOne({ competitionId, userId });
    if (existingRegistration) {
      return res.status(400).json({ success: false, message: 'User already registered for this competition.' });
    }

    // 2. Atomic update to check maxSpots and increment bookedSpots in a single operation
    // This handles high concurrency safely!
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        $expr: { $lt: ['$bookedSpots', '$maxSpots'] }
      },
      { $inc: { bookedSpots: 1 } },
      { new: true }
    );

    if (!updatedCompetition) {
      return res.status(400).json({
        success: false,
        message: 'Registration full! No available spots left.'
      });
    }

    // 3. Create Registration record
    const paymentId = `pay_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const newReg = new Registration({
      userId,
      competitionId,
      userName,
      userEmail,
      paymentId,
      status: 'registered'
    });

    await newReg.save();

    return res.json({
      success: true,
      message: 'Registration successful! Spot reserved.',
      data: {
        registration: newReg,
        bookedSpots: updatedCompetition.bookedSpots,
        maxSpots: updatedCompetition.maxSpots
      }
    });
  } catch (err) {
    console.error('Error in registerUser:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Submit entry for competition
exports.submitEntry = async (req, res) => {
  try {
    const { competitionId, submissionTitle, videoUrl, notes } = req.body;
    const userId = req.headers['x-user-id'] || 'demo-user-123';

    const registration = await Registration.findOne({ competitionId, userId });
    if (!registration) {
      return res.status(400).json({ success: false, message: 'You must register before uploading a submission.' });
    }

    registration.status = 'submitted';
    registration.submission = {
      title: submissionTitle || 'Classical Dance Performance',
      videoUrl: videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      notes: notes || 'Submitted performance for Feedants Competition',
      submittedAt: new Date()
    };

    await registration.save();

    return res.json({
      success: true,
      message: 'Submission uploaded successfully!',
      data: registration
    });
  } catch (err) {
    console.error('Error submitting entry:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Reset demo state (for testing)
exports.resetCompetitionState = async (req, res) => {
  try {
    const slug = req.params.slug || 'feedants-dance-101';
    const comp = await Competition.findOne({ slug });
    if (comp) {
      comp.bookedSpots = 1; // reset back to 1 spot booked (19 left)
      await comp.save();
      await Registration.deleteMany({ competitionId: comp._id });
    }
    return res.json({ success: true, message: 'Competition state reset to 1/20 booked, 19 spots available.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
