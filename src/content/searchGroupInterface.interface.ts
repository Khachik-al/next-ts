import { SearchItem } from '../content/searchItems.interface'

export interface SearchGroupInterface {
  width: number | string;
  height: number | string;
  placeholder?: string;
  containerWidth: number;
  font: string;
  searchHandle?: (e: string) => void;
  value?: string;
  searchClick?: () => void;
  openModal?: (open: () => void) => void;
  searchItems?: SearchItem[];
  isSelected?: boolean;
  msearchHandle?: () => void;
  findedItems?: Array<{ key: string }>;
  setSearchQuery?: (letter: string) => void;
  disclosure: {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
  }
  searchStatus: 'init' | 'pending' | 'done'
}
