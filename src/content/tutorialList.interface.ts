import { SelectedTutorials } from './knowledgeBaseInterface.interface'
import { SelectedFaqItem, SelectedTutorialItem } from './layout.interface'

export interface TutorialList {
  tutorials: SelectedTutorialItem[];
  navbarData: {
    faqs: SelectedFaqItem[];
    tutorials: SelectedTutorials[];
  };
  name: string;
}
