import type { NextApiRequest, NextApiResponse } from 'next';
import { memberService } from '../../../services';
import { handleAPIErrors, validateHttpMethod, validateJobsAPIToken } from '../../../helpers/server';

interface Payload {
  token: string;
}

export default async function Remind(req: NextApiRequest, res: NextApiResponse) {
  try {
    validateHttpMethod('GET', req.method!);

    const { token } = req.query as unknown as Payload;

    validateJobsAPIToken(token);

    await memberService.remindMembersOfLateCheckIn();

    res.status(200).json({});
  } catch (error) {
    handleAPIErrors(error, res);
  }
}
