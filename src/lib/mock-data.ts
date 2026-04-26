import { ElectionStep, ElectionTimelineItem, FAQ } from "@/types/election";

export const electionTimeline: ElectionTimelineItem[] = [
  {
    id: "registration-open",
    title: "Voter Registration Opens",
    date: "May 1, 2026",
    description:
      "Citizens can register online, by mail, or at local election offices."
  },
  {
    id: "registration-deadline",
    title: "Registration Deadline",
    date: "October 5, 2026",
    description: "Final day to register or update your voter information."
  },
  {
    id: "early-voting",
    title: "Early Voting Period",
    date: "October 12 - October 30, 2026",
    description:
      "In-person early voting centers are open with expanded weekday and weekend hours."
  },
  {
    id: "mail-ballot-deadline",
    title: "Mail Ballot Request Deadline",
    date: "October 27, 2026",
    description: "Last day to request a mail-in ballot in most jurisdictions."
  },
  {
    id: "election-day",
    title: "Election Day",
    date: "November 3, 2026",
    description: "Polling places open 7:00 AM to 8:00 PM local time."
  }
];

export const electionSteps: ElectionStep[] = [
  {
    id: "verify-eligibility",
    title: "Verify eligibility",
    description:
      "Confirm age, residency, and citizenship requirements for your state.",
    actionLink: "https://www.usa.gov/voter-registration"
  },
  {
    id: "register",
    title: "Register to vote",
    description:
      "Complete registration online or submit a paper registration form before the deadline.",
    actionLink: "https://vote.gov"
  },
  {
    id: "review-options",
    title: "Choose voting method",
    description:
      "Decide between in-person, early voting, or mail ballot based on your schedule.",
    actionLink: "https://www.eac.gov/voters"
  },
  {
    id: "prepare-documents",
    title: "Prepare required ID",
    description:
      "Check your state's accepted ID list and bring approved documents on voting day.",
    actionLink: "https://www.ncsl.org/elections-and-campaigns/voter-id"
  }
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Can I vote if I recently moved?",
    answer:
      "Yes, but you should update your voter registration as soon as possible to ensure you can vote at the correct polling location."
  },
  {
    id: "faq-2",
    question: "How do I track my mail ballot?",
    answer:
      "Most states provide ballot tracking portals through state election websites once your ballot is issued."
  },
  {
    id: "faq-3",
    question: "What if my name is missing at the poll?",
    answer:
      "Ask for a provisional ballot and contact your local election office to verify your registration status."
  }
];
