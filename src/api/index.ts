import { loadContentInfo } from '@interfaces/ContentInfo';
import axios from 'axios';
import { isEmpty } from 'lodash'

export const getYouTubeData = async ({ key, part, q, type, maxResults }: { key: string, part: string, q: string, type: string, maxResults: number }): Promise<any> => {
	const params = {
		key: key,
    part: part,
    q: q,
    type: type,
    maxResults: maxResults
	}
	const response = await axios.get(`${process.env.NEXT_PUBLIC_YOUTUBE_URL}/youtube/v3/search`, {
		params: params,
		timeout: 5000,
	});

	if (response.status === 200 && !isEmpty(response.data)) {
		return loadContentInfo(response.data);
	} else {
		return undefined;
	}
};

