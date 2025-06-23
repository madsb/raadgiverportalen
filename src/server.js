import { createServer, Response } from 'miragejs';
import { DEFAULT_ENDPOINT } from '@erst-vg/bucket-json-client';
import { TEKSTNOEGLE_BUNDT_ID } from './utils/tekstnoegle-util.ts';

/**
 * Dette er et mock storage JSON API som bruges når leverandør-applikationen kører udenfor VG. Den er derfor ikke relevant i forhold til udvikling af leverandør-applikationer
 */
export default function () {
  let version = 42;

  const stubbedResponse = {
    id: TEKSTNOEGLE_BUNDT_ID,
    version,
    jsonindhold: {
      tekster: {
        faelles: {
          eksempel: 'Dette er en tekstnøgle, som kan redigeres'
        }
      }
    }
  };

  createServer({
    routes() {
      // https://miragejs.com/docs/getting-started/overview/#passthrough
      // Tillad kald til eksterne domæner. Tilføj for hvert eksternt domæne
      this.passthrough('https://jsonplaceholder.typicode.com/*');

      // Tillad SVG site specifikke ikoner
      this.pretender.get('data:image/*', this.pretender.passthrough);
      // Tillad SVG custom ikoner
      this.pretender.get('/img/*', this.pretender.passthrough);

      // Mock Erhvervsstyrelsens API
      this.post(DEFAULT_ENDPOINT, (schema, request) => {
        const { requestBody } = request;
        if (requestBody.includes('bucketTekstnoegleGetJsonindhold')) {
          return {
            data: {
              bucketTekstnoegleGetJsonindhold: {
                ...stubbedResponse,
                version
              }
            }
          };
        } else if (requestBody.includes('bucketTekstnoeglePutJsonindhold')) {
          const response = stubbedResponse;
          const { jsonindhold } = response;
          version++;
          const payload = extractTekstnoegle(requestBody);
          if (payload) {
            jsonindhold.tekster.faelles.eksempel = payload;
          }
          return {
            data: {
              bucketTekstnoeglePutJsonindhold: {
                ...response,
                version
              }
            }
          };
        }
      });
    }
  });

  function extractTekstnoegle(requestBody) {
    let payload = null;
    const startFragment = 'tekster: {faelles: {eksempel: ';
    const endFragment = '}}}';
    const startPos = requestBody.indexOf(startFragment);
    const endPos = requestBody.indexOf(endFragment, startPos);
    if (startPos && endPos) {
      payload = requestBody.substring(startPos + startFragment.length + 2, endPos - 2);
    }
    return payload;
  }
}
