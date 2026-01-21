import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { HeroBlock } from './HeroBlock';
import { ContentBlock } from './ContentBlock';
import { StoryBlock } from './StoryBlock';
import { FeaturesBlock } from './FeaturesBlock';
import { EquipmentBlock } from './EquipmentBlock';
import { TeamGridBlock } from './TeamGridBlock';
import { JobsListBlock } from './JobsListBlock';
import { FormBlock } from './FormBlock';
import { ContactInfoBlock } from './ContactInfoBlock';
import { CTABlock } from './CTABlock';
import { FAQBlock } from './FAQBlock';

// Block type definitions
export type BlockType = 
  | 'hero'
  | 'content'
  | 'story'
  | 'features'
  | 'equipment'
  | 'teamGrid'
  | 'jobsList'
  | 'form'
  | 'contactInfo'
  | 'cta'
  | 'faq';

export interface Block {
  __typename: string;
  [key: string]: any;
}

export interface BlockRendererProps {
  blocks: Block[];
  lang?: SupportedLang;
}

// Map Tina block types to component names
const getBlockType = (typename: string): BlockType | null => {
  const typeMap: Record<string, BlockType> = {
    'PageBlocksHero': 'hero',
    'PageBlocksContent': 'content',
    'PageBlocksStory': 'story',
    'PageBlocksFeatures': 'features',
    'PageBlocksEquipment': 'equipment',
    'PageBlocksTeamGrid': 'teamGrid',
    'PageBlocksJobsList': 'jobsList',
    'PageBlocksForm': 'form',
    'PageBlocksContactInfo': 'contactInfo',
    'PageBlocksCta': 'cta',
    'PageBlocksFaq': 'faq',
  };
  return typeMap[typename] || null;
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks, lang = 'de' }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <>
      {blocks.map((block, index) => {
        const blockType = getBlockType(block.__typename);
        const key = `${block.__typename}-${index}`;
        const parentField = `blocks.${index}`;

        switch (blockType) {
          case 'hero':
            return <HeroBlock key={key} data={block} parentField={parentField} />;
          case 'content':
            return <ContentBlock key={key} data={block} parentField={parentField} />;
          case 'story':
            return <StoryBlock key={key} data={block} parentField={parentField} />;
          case 'features':
            return <FeaturesBlock key={key} data={block} parentField={parentField} />;
          case 'equipment':
            return <EquipmentBlock key={key} data={block} parentField={parentField} />;
          case 'teamGrid':
            return <TeamGridBlock key={key} data={block} parentField={parentField} />;
          case 'jobsList':
            return <JobsListBlock key={key} data={block} parentField={parentField} lang={lang} />;
          case 'form':
            return <FormBlock key={key} data={block} parentField={parentField} />;
          case 'contactInfo':
            return <ContactInfoBlock key={key} data={block} parentField={parentField} />;
          case 'cta':
            return <CTABlock key={key} data={block} parentField={parentField} />;
          case 'faq':
            return <FAQBlock key={key} data={block} parentField={parentField} />;
          default:
            console.warn(`Unknown block type: ${block.__typename}`);
            return null;
        }
      })}
    </>
  );
};
