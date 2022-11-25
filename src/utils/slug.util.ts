import Slugify from 'slugify';

Slugify.extend({ Æ: 'AE' });
Slugify.extend({ æ: 'ae' });
Slugify.extend({ Ø: 'OE' });
Slugify.extend({ ø: 'oe' });
Slugify.extend({ Å: 'AA' });
Slugify.extend({ å: 'aa' });
Slugify.extend({ '%': 'procent' });

export function slugify(text: string): string {
  return text
    ? Slugify(text.replaceAll('–', '-').replaceAll('+', ' og ').replaceAll('&', ' og '), {
        remove: /[*+~.,()!'"?$#!:>@/\\§<]/g,
        lower: true
      })
    : '';
}
