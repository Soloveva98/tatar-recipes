'use client';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import DOMPurify from 'isomorphic-dompurify';

const PageContent = () => {
	const pathname = usePathname();
	const content =
		siteConfig.pagesContent[
			pathname as keyof typeof siteConfig.pagesContent
		].content ?? '';
	const sanitizedContent = DOMPurify.sanitize(content);

	return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
};

export default PageContent;
