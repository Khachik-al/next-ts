import { SelectedTutorials } from './knowledgeBaseInterface.interface'
import { SelectedFaqItem } from './layout.interface'

export interface SelectedPhoneData {
  phoneData: {
    features: { feature: string }[];
    featurevaluepairs: { feature: string; featuretype: string }[];
    image: { url: string };
    phone: { 
      name: string
      manufacturer: string
      vanity_name: string
    };
    booklet: { url: string };
    manual: { url: string };
  };
  navbarData: {
    faqs: SelectedFaqItem[];
    tutorials: SelectedTutorials[];
  };
  name: string;
}
