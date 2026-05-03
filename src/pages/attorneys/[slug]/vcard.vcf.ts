import { getCollection } from 'astro:content';
import type { APIRoute, GetStaticPaths } from 'astro';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const attorneys = await getCollection('attorneys');
  return attorneys.map((a) => ({ params: { slug: a.id } }));
};

export const GET: APIRoute = async ({ params, site }) => {
  const attorneys = await getCollection('attorneys');
  const attorney = attorneys.find((a) => a.id === params.slug);

  if (!attorney) {
    return new Response('Attorney not found', { status: 404 });
  }

  const { name, title, email, phone } = attorney.data;
  const slug = attorney.id;

  // Split name into first and last for the structured N field
  const nameParts = name.split(' ').filter((p) => !p.startsWith('[PLACEHOLDER'));
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0] ?? '';
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : '';

  const baseUrl = site?.href ?? 'https://halliday2026.github.io/streamkim_website/';
  const profileUrl = new URL(`attorneys/${slug}`, baseUrl).href;

  const hasPhone = Boolean(phone) && !phone!.startsWith('[PLACEHOLDER');
  const hasEmail = Boolean(email) && !email!.startsWith('[PLACEHOLDER');

  // vCard 3.0 — CRLF line endings required by spec
  const lines: (string | false)[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${name}`,
    `TITLE:${title}`,
    'ORG:Stream Kim Hicks Wrage & Alfaro\\, P.C.',
    hasPhone && `TEL;TYPE=WORK:${phone}`,
    hasEmail && `EMAIL;TYPE=WORK:${email}`,
    `URL:${profileUrl}`,
    'END:VCARD',
  ];

  const vcardContent = lines.filter(Boolean).join('\r\n') + '\r\n';

  return new Response(vcardContent, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.vcf"`,
    },
  });
};
