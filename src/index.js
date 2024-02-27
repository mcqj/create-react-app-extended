import { fileURLToPath } from 'node:url';
import path from 'node:path';
import pluralize from 'pluralize';
import * as utils from '@mcqj/npm-generator-core';

const projectName = 'react-app';

const __dirname = fileURLToPath(import.meta.url);
const templateRoot = path.resolve(__dirname, '../..', 'template');

// No need to add a help option as the npm-generator-lib will do that for us
const optionsDescriptor = {
  name: {
    type: 'string',
    short: 'n',
    placeholder: 'app name',
    message: 'The name of the app to create.',
  },
  description: {
    type: 'string',
    short: 'd',
    placeholder: 'description',
    message: 'A description of the app being created.',
  },
};

// Add template vars that are not prompted for
function augmentTemplateVars(templateVars) {
}

// Remove template vars that we don't want to save (typically the ones we added in augmentTemplateVars)
function cleanTemplateVars(templateVars) {
}

async function main() {
  try {
    const templateVars = await utils.getTemplateVars(optionsDescriptor);
    augmentTemplateVars(templateVars);
    const projectRoot = await utils.createProject(`${templateVars.name}`);
    await utils.copyTemplateFiles(templateRoot, projectRoot, templateVars);
    cleanTemplateVars(templateVars);
    await utils.saveDefaultVars(templateVars);
  } catch (err) {
    console.error('Unexpected error', err);
    process.exit(1);
  }
}

main();
