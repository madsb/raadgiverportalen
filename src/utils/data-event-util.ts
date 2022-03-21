interface Emitter {
  $emit: (event: string, ...args: any[]) => any;
}

/**
 * Emits Piwik PageView-event
 * @param emitter this for access to $emit
 */
export function emitPageViewEvent(emitter: Emitter): void {
  emitter.$emit('piwikPageView');
}

/**
 * Emits AppNaeste-event
 * @param emitter this for access to $emit
 * @param destUrl the destination url for the event
 * @param data optional extra data
 */
export function emitNaesteEvent(emitter: Emitter, destUrl?: string, data?: string): void {
  emitter.$emit('piwikNaesteEvent', destUrl, data);
}

/**
 * Emits AppForrige-event
 * @param emitter this for access to $emit
 * @param destUrl the destination url for the event
 * @param data optional extra data
 */
export function emitForrigeEvent(emitter: Emitter, destUrl?: string, data?: string): void {
  emitter.$emit('piwikForrigeEvent', destUrl, data);
}

/**
 * Emits AppDownload-event
 * @param emitter this for access to $emit
 * @param fileIdentifier an identifier to identify the downloaded file
 * @param data optional extra data
 */
export function emitDownloadEvent(emitter: Emitter, fileIdentifier: string, data?: string): void {
  emitter.$emit('piwikDownloadEvent', fileIdentifier, data);
}

/**
 * Emits AppCTAClick-event
 * @param emitter this for access to $emit
 * @param eventType the type of CTA-event
 * @param data optional data
 */
export function emitCTAClickEvent(emitter: Emitter, eventType: string, data?: string): void {
  emitter.$emit('piwikCTAClickEvent', eventType, data);
}

/**
 * Emits AppFritekst-event
 * @param emitter this for access to $emit
 * @param eventType the type of CTA-event
 * @param data optional data - can be json
 */
export function emitFritekstEvent(emitter: Emitter, eventType: string, data?: string): void {
  emitter.$emit('piwikFritekstEvent', eventType, data);
}
