/* eslint-disable max-len */

export type AiAutoGeneratedField =
  'title' |
  'caption' |
  'tags' |
  'semantic'

export const ALL_AI_AUTO_GENERATED_FIELDS: AiAutoGeneratedField[] = [
  'title',
  'caption',
  'tags',
  'semantic',
];

export const parseAiAutoGeneratedFieldsText = (
  text = 'all',
): AiAutoGeneratedField[] => {
  const textFormatted = text.trim().toLocaleLowerCase();
  if (textFormatted === 'none') {
    return [];
  } else if (textFormatted === 'all') {
    return ALL_AI_AUTO_GENERATED_FIELDS;
  } else {
    const fields = textFormatted
      .toLocaleLowerCase()
      .split(',')
      .map(field => field.trim())
      .filter(field => ALL_AI_AUTO_GENERATED_FIELDS
        .includes(field as AiAutoGeneratedField));
    return fields as AiAutoGeneratedField[];
  }
};

export type AiImageQuery =
  'title' |
  'caption' |
  'title-and-caption' |
  'tags' |
  'description-small' |
  'description' |
  'description-large' |
  'description-semantic';

export const AI_IMAGE_QUERIES: Record<AiImageQuery, string> = {
  'title': 'Write a compelling title for this image in 3 words or less',
  'caption': 'Write a pithy caption for this image in 6 words or less and no punctuation',
  'title-and-caption': 'Write a compelling title and pithy caption of 8 words or less for this image, using the format Title: "title" Caption: "caption"',
  'tags': 'Describe this image three or less comma-separated keywords with no adjective or adverbs',
  'description-small': 'Describe this image succinctly without the initial text "This image shows" or "This is a picture of"',
  'description': 'Describe this image',
  'description-large': 'Describe this image in detail',
  'description-semantic': 'List up to 5 things in this image without description as a comma-separated list',
};

export const parseTitleAndCaption = (text: string) => {
  const matches = text.includes('Title')
    ? text.match(/^[`'"]*Title: ["']*(.*?)["']*[ ]*Caption: ["']*(.*?)\.*["']*[`'"]*$/)
    : text.match(/^(.*?): (.*?)$/);

  return {
    title: matches?.[1] ?? '',
    caption: matches?.[2] ?? '',
  };
};

export const cleanUpAiTextResponse = (text: string) =>
  text
    .replaceAll('\n', ' ')
    .replaceAll('"', '')
    .replace(/\.$/, '');
