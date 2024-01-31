import { Request } from 'express';
import { DocuSignService } from '../service/docu-sign.service';

/**
 * Obtener datos de un envelope
 * @param req The request
 */
export async function getEnvelope(req: Request) {
  try {
    const envelopeId = req.params.id;
    const envelope = await DocuSignService.getDocuSignService().docuSignCreateEnvelopeApi();
    const envelopeData = await envelope.getEnvelope(process.env.ACCOUNT_ID, envelopeId);
    return envelopeData
  } catch (e) {
    console.log(e);
  }
}
