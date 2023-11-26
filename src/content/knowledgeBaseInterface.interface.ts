import { SelectedFaqItem } from './layout.interface'

export interface SelectedFaqs {
  name: string;
  children: { name: string; children: { name: string }[] }[];
}
export interface SelectedTutorials {
  name: string;
  children: { name: string }[];
}
export interface KnowledgeBaseInterface {
  faqs: SelectedFaqs[] ;
  tutorials: SelectedTutorials[] ;
  navbarData: {
    faqs: SelectedFaqItem[];
    tutorials: SelectedTutorials[];
  };
  name: string;
}
