const Competition = require('../models/Competition');

const seedInitialData = async () => {
  try {
    const existing = await Competition.findOne({ slug: 'feedants-dance-101' });
    if (existing) {
      console.log('[Seed] Competition feedants-dance-101 already exists.');
      return existing;
    }

    const futureDate = new Date(Date.now() + (1 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000 + 28 * 60 * 1000 + 32 * 1000));

    const competition = new Competition({
      slug: 'feedants-dance-101',
      title: {
        en: 'Feedants Classical Dance',
        hi: 'फीडांट्स क्लासिकल डांस'
      },
      tags: ['Dance', 'Multi-Win'],
      certificateBadge: {
        en: 'Winners get certificate',
        hi: 'विजेताओं को प्रमाणपत्र'
      },
      prizePool: 1500,
      entryFee: 99,
      maxSpots: 20,
      bookedSpots: 1, // 1/20 booked, 19 remaining as shown in image
      judge: {
        name: 'Manju Dubey',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
        title: 'Professional Kathak Dancer',
        experience: '12+ Years of Experience',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      registrationEndsAt: futureDate,
      importantDates: {
        registerBefore: { en: '10 Aug 26 | 11:50 PM', hi: '10 अगस्त 26 | 11:50 PM' },
        submissionStarts: { en: '6 Aug 26 | 04:00 AM', hi: '6 अगस्त 26 | 04:00 AM' },
        submissionEnds: { en: '30 Aug 26 | 11:55 PM', hi: '30 अगस्त 26 | 11:55 PM' },
        resultDate: { en: '1 Sept 26 | 11:50 PM', hi: '1 सितम्बर 26 | 11:50 PM' }
      },
      previousWinners: [
        {
          id: 'w1',
          name: 'Riya Shah',
          title: '1st Winner',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        },
        {
          id: 'w2',
          name: 'Aarav Mehta',
          title: '1st Winner',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        },
        {
          id: 'w3',
          name: 'Neha Verma',
          title: '2nd Winner',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
        },
        {
          id: 'w4',
          name: 'Ishita Cha...',
          title: '3rd Winner',
          avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
        }
      ],
      contentTabs: {
        about: {
          en: 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.',
          hi: 'यह सभी आयु वर्ग के लिए खुली एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है। कहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें। अपने जुनून को पारंपरिक नृत्य के माध्यम से व्यक्त करें।'
        },
        judging: {
          en: 'Judging will be based on standard parameters: Expression & Mudras (30%), Rhythm & Footwork (30%), Costume & Presentation (20%), Overall Choreography (20%).',
          hi: 'मूल्यांकन मानक मापदंडों पर आधारित होगा: अभिव्यक्ति और मुद्राएं (30%), ताल और पदचाप (30%), वेशभूषा और प्रस्तुति (20%), समग्र कोरियोग्राफी (20%)।'
        },
        rules: {
          en: '1. Video duration must be between 1 to 3 minutes.\n2. Performance must be uninterrupted with clear lighting.\n3. Submission must be original and recorded specifically for Feedants.\n4. Only paid participants are eligible for prize consideration.',
          hi: '1. वीडियो की अवधि 1 से 3 मिनट के बीच होनी चाहिए।\n2. प्रस्तुति बिना किसी रुकावट और स्पष्ट रोशनी में होनी चाहिए।\n3. सबमिशन मूल और फीडांट्स के लिए विशेष रूप से रिकॉर्ड किया गया होना चाहिए।\n4. केवल भुगतान किए गए प्रतिभागी ही पुरस्कार के लिए पात्र हैं।'
        }
      },
      rewards: [
        { rank: { en: '1st Winner', hi: 'पहला विजेता' }, amount: 550 },
        { rank: { en: '2nd Winner', hi: 'दूसरा विजेता' }, amount: 300 },
        { rank: { en: '3rd Winner', hi: 'तीसरा विजेता' }, amount: 240 },
        { rank: { en: '4th Winner', hi: 'चौथा विजेता' }, amount: 200 },
        { rank: { en: '5th Winner', hi: 'पांचवां विजेता' }, amount: 130 },
        { rank: { en: '6th Winner', hi: 'छठा विजेता' }, amount: 80 }
      ],
      referralCode: 'referral123',
      referralEarnAmount: 10
    });

    await competition.save();
    console.log('[Seed] Successfully seeded initial competition data!');
    return competition;
  } catch (err) {
    console.error('[Seed] Error seeding data:', err);
  }
};

module.exports = seedInitialData;
