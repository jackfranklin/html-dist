import { Node } from './html';
import { omit } from 'lodash';

export default function(properties = {}) {
  return new Node('link', properties, []);
};
