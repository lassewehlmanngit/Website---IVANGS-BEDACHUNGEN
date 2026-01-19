export interface PageMeta {
  title: string;
  description?: string;
}

export type PageBlock =
  | {
      _template: 'hero';
      title: string;
      description?: string;
      actions?: { label: string; href: string; variant: string }[];
      image?: string;
    }
  | {
      _template: 'features';
      title?: string;
      description?: string;
      items?: { title: string; description: string; icon?: string }[];
    }
  | {
      _template: 'testimonial';
      quote: string;
      author: string;
      role?: string;
    }
  | {
      _template: 'contact';
      title?: string;
      description?: string;
    }
  | {
      _template: 'content';
      body: any; // Tina rich-text
    };

export interface ContentPage {
  slug: string;
  lang: string;
  meta: PageMeta;
  blocks?: PageBlock[]; // Optional because migration might leave some empty
}
