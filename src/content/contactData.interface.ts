export interface ContactData {
  title: string;
  desc: string;
  btnTitle?: string;
  type: 'chat' | 'call';
  mainLine?: string;
}
export interface SendEmail {
  [key: string]: string;
}
