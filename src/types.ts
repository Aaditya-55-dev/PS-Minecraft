export interface ProblemStatement {
  id: string;
  trackNumber: string;
  title: string;
  category: string;
  difficulty: 'Novice' | 'Intermediate' | 'Master';
  excerpt: string;
  material: 'oak' | 'stone' | 'deepslate';
  themeColor: string;
  accentColor: string;
  lore: string;
  overview: string;
  keyObjectives: string[];
  techStack: string[];
  deliverables: string[];
  rubric: { criterion: string; weight: number }[];
  bountyReward: string;
}
