import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

export class MissingTranslationService implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams) {
        console.log(`WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`);
      return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
    }
  }