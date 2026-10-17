import React from 'react';
import * as PhosphorIcons from '@phosphor-icons/react';

export default function DynamicIcon({ name, size = 18, weight = 'regular', className = '' }) {
  const nomeEfetivo = (!name || name === 'Circle') ? 'ClipboardText' : name;
  const IconComponent = PhosphorIcons[nomeEfetivo] || PhosphorIcons.ClipboardText || PhosphorIcons.Circle;
  return <IconComponent size={size} weight={weight} className={className} />;
}