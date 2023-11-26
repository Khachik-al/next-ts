import { SelectedTutorials } from './knowledgeBaseInterface.interface'
import { SelectedFaqItem } from './layout.interface'

export interface FaqsSelected {
  faqs: SelectedFaqItem[];
  navbarData: {
    faqs: SelectedFaqItem[];
    tutorials: SelectedTutorials[];
  };
  name: string;
}
