import React from 'react';
import { GeminiSearchBar, GeminiSearchBarProps } from './GeminiSearchBar';

export const VoiceInputBar: React.FC<GeminiSearchBarProps> = (props) => {
  return <GeminiSearchBar {...props} />;
};
