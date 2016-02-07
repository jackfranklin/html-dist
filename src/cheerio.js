import cheerio from 'cheerio';

export default function(str='') {
  return cheerio.load(str);
}
