import type { ReactElement } from 'react';
import { FileTextIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';

export function socialIconFor(id: string): ReactElement {
  switch (id) {
    case 'github':
      return <GitHubIcon />;
    case 'linkedin':
      return <LinkedInIcon />;
    case 'email':
      return <MailIcon />;
    case 'cv':
      return <FileTextIcon />;
    default:
      return <span className="size-4" />;
  }
}
