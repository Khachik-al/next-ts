import { ReactNode } from 'react'
import { SelectedTutorials } from './knowledgeBaseInterface.interface'

export interface SelectedTutorialItem {
  name: string;
  children: {
    name: string;
    val?: string;
    pk?: number;
  }[];
}

export interface SelectedFaqItem {
  name: string;
  children: SelectedTutorialItem[];
}
export interface Layout {
  children: ReactNode;
  navbarData: {
    faqs: SelectedFaqItem[];
    tutorials: SelectedTutorials[];
  }
  name: string;
  step?: number;
}
