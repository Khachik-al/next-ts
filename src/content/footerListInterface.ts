export interface FooterListInterface {
  title?: string;
  subItems: {
    linkUrl: string;
    linkText: string;
    onClick?: () => void;
    withoutBlank?: boolean;
  }[];
}
