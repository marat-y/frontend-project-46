import yaml from 'js-yaml';

const parse = (content, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
      return yaml.load(content);
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error('File extension not supported');
  }
};

export default parse;
