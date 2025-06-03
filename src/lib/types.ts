export interface PageSection {
  id: string;
  title: Record<string, string>;
  content?: Record<string, string>;
  metadata?: {
    updateLabel?: Record<string, string>;
    [key: string]: any;
  };
}

export interface LanguageContent {
  fr: string;
  ar: string;
  [key: string]: string;
} 