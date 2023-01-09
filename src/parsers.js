import yaml from 'js-yaml';

const jsonParser = (json) => JSON.parse(json);

const ymlParser = (yml) => yaml.load(yml);

const getParser = (extension) => {
  switch (extension) {
    case 'json':
      return jsonParser;
    case 'yaml':
      return ymlParser;
    case 'yml':
      return ymlParser;
    default:
      throw new Error('File extension not supported');
  }
};

const parse = (content, extension) => {
  const fileToObjectFunction = getParser(extension);
  return fileToObjectFunction(content);
};

export default parse;
