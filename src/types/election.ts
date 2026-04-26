export type ElectionTimelineItem = {
  id: string;
  title: string;
  date: string;
  description: string;
};

export type ElectionStep = {
  id: string;
  title: string;
  description: string;
  actionLink: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};
