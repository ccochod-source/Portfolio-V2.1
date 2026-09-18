import assert from 'node:assert/strict';
import { request } from 'node:http';

const base = process.env.CHECK_URL || 'http://localhost:3004';
const canonicalOrigin = 'https://www.cochodelevate.com';
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(match => match[0]);
const meta = (html, key) => tags(html, 'meta').filter(tag => attr(tag, 'name') === key || attr(tag, 'property') === key).map(tag => attr(tag, 'content'));
const checkedAssets = new Set();
const titles = new Set();
const descriptions = new Set();
const internalPages = new Set();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(urls.length, 21, '14 original pages + 3 services + 4 guides');
assert.equal(new Set(urls).size, urls.length, 'no sitemap duplicates');
const report = [];
for (const url of urls) {
  assert.equal(new URL(url).origin, canonicalOrigin, 'sitemap domain');
  const path = new URL(url).pathname;
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  const canonical = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'canonical').map(tag => attr(tag, 'href'));
  const expected = canonicalOrigin + (path === '/' ? '' : path);
  assert.deepEqual(canonical, [expected], `${path} canonical`);
  assert.deepEqual(meta(html, 'og:url'), [expected], `${path} OG URL`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = meta(html, 'description');
  assert.ok(title && !titles.has(title), `${path} unique title`);
  assert.equal(description.length, 1, `${path} one description`);
  assert.ok(description[0] && !descriptions.has(description[0]), `${path} unique description`);
  titles.add(title); descriptions.add(description[0]);
  assert.equal(tags(html, 'h1').length, 1, `${path} one server-rendered H1`);
  assert.ok(!meta(html, 'robots').join().includes('noindex'), `${path} indexable`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match => JSON.parse(match[1]));
  assert.ok(schemas.some(schema => schema['@type'] === 'Organization'), `${path} organization`);
  if (path.startsWith('/services/')) assert.ok(schemas.some(schema => schema['@type'] === 'Service'), path);
  if (path.startsWith('/guides/')) assert.ok(schemas.some(schema => schema['@type'] === 'Article'), path);
  if (/^\/(services|guides|projects)\//.test(path)) assert.ok(schemas.some(schema => schema['@type'] === 'BreadcrumbList'), path);
  const images = meta(html, 'og:image');
  assert.ok(images.length, `${path} sharing image`);
  for (const image of images) {
    assert.equal(new URL(image).origin, canonicalOrigin);
    if (checkedAssets.has(image)) continue;
    const asset = await fetch(base + new URL(image).pathname);
    assert.equal(asset.status, 200, image);
    assert.ok(asset.headers.get('content-type')?.startsWith('image/'), image);
    checkedAssets.add(image);
  }
  for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href');
    if (href?.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]{2,5}(?:\?|$)/i.test(href)) internalPages.add(href.split('#')[0] || '/');
  }
  assert.ok(html.includes('mailto:cochod.elevate@icloud.com') && html.includes('tel:+33743700596'), `${path} contacts`);
  report.push({ path, title, description: description[0], status: response.status });
}
for (const path of internalPages) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, `internal link ${path}`);
}
const robots = await (await fetch(`${base}/robots.txt`)).text();
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`), 'absolute sitemap');
for (const path of ['/services/inexistant', '/guides/inexistant', '/projects/inexistant', '/share/inexistant']) {
  assert.equal((await fetch(base + path)).status, 404, `unknown route ${path}`);
}
if (base.startsWith('http://localhost')) {
  // Node fetch may normalize Host; use the HTTP client to test host-based routing.
  const hostRequest = host => new Promise((resolve, reject) => {
    const req = request(`${base}/projects/auralife?test=seo`, { headers: { host } }, response => {
      response.resume(); resolve({ status: response.statusCode, location: response.headers.location });
    });
    req.on('error', reject); req.end();
  });
  const redirect = await hostRequest('portfolio-v2-1-xi.vercel.app');
  assert.equal(redirect.status, 308);
  assert.equal(redirect.location, `${canonicalOrigin}/projects/auralife?test=seo`);
  const preview = await hostRequest('portfolio-preview-example.vercel.app');
  assert.equal(preview.status, 200, 'preview is not redirected');
}
console.log(JSON.stringify({ base, pages: report.length, sharingImages: checkedAssets.size, internalLinks: internalPages.size, checks: report, result: 'PASS' }, null, 2));
